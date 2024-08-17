import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Checkbox,
  Pagination,
  styled,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StyledTypography from '../../styles/mypage/StyledTypography';
import DaumPostcode from 'react-daum-postcode';
import Modal from '@mui/material/Modal';
import axios from '../../api/axiosConfig';
import AuthContext from '../../context/AuthContext';

interface Address {
  addressId: string;
  recipientName: string;
  addressName: string;
  address: string;
  addressDetail: string;
  postcode: string;
  contact: string;
  isDefault: boolean;
}

const initialAddresses: Address[] = [];

const DefaultLabel = styled('span')({
  marginLeft: 8,
  padding: '2px 6px',
  backgroundColor: '#1976d2',
  color: 'white',
  borderRadius: '4px',
  fontWeight: 'bold',
  fontSize: '10px',
});

const StyledButton = styled(Button)({
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  maxWidth: '150px',
});

const ReadOnlyTextField = styled(TextField)({
  '& .MuiInputBase-input.Mui-disabled': {
    color: 'black',
  },
  '& .MuiInputBase-root.Mui-disabled': {
    backgroundColor: '#f5f5f5',
  },
});

const ErrorText = styled(Typography)({
  color: 'red',
  fontSize: '12px',
  position: 'absolute',
  marginTop: '-5px',
});

const FormControl = styled('div')({
  marginBottom: '10px',
  position: 'relative',
});

interface FormValues {
  recipientName: string;
  addressName: string;
  address: string;
  addressDetail: string;
  postcode: string;
  contact: string;
  isDefault: boolean;
}

const initialFormValues: FormValues = {
  recipientName: '',
  addressName: '',
  address: '',
  addressDetail: '',
  postcode: '',
  contact: '',
  isDefault: false,
};

function ShippingAddressPage() {
  const { userId } = useContext(AuthContext);
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [errors, setErrors] = useState<FormValues>({
    recipientName: '',
    addressName: '',
    address: '',
    addressDetail: '',
    postcode: '',
    contact: '',
    isDefault: false,
  });
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get('/api/mypage/shipping-addresses', {
        params: { userId, page, size: 5 },
      });
      setAddresses(response.data.content);
      setTotalPages(response.data.totalPages);

      if (page >= response.data.totalPages) {
        setPage(Math.max(response.data.totalPages - 1, 0));
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId, page]);

  const openDialog = (address: Address | null = null) => {
    if (address) {
      setIsEditMode(true);
      setCurrentAddress(address);
      setFormValues({
        recipientName: address.recipientName,
        addressName: address.addressName,
        address: address.address,
        addressDetail: address.addressDetail,
        postcode: address.postcode,
        contact: address.contact,
        isDefault: address.isDefault,
      });
    } else {
      setIsEditMode(false);
      setFormValues(initialFormValues);
    }
    setErrors(initialFormValues);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setCurrentAddress(null);
  };

  const openDeleteDialog = (id: string) => {
    setAddressToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setAddressToDelete(null);
  };

  const validateForm = () => {
    const newErrors = {
      recipientName: formValues.recipientName
        ? ''
        : '수령인 이름을 입력해주세요.',
      addressName: formValues.addressName ? '' : '배송지 이름을 입력해주세요.',
      address: formValues.address ? '' : '주소를 입력해주세요.',
      postcode: formValues.postcode ? '' : '우편번호를 입력해주세요.',
      contact: /^\d+$/.test(formValues.contact)
        ? ''
        : '연락처를 숫자로만 입력해주세요.',
      addressDetail: '',
      isDefault: false,
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  const handleSave = async () => {
    if (!validateForm()) {
      alert('유효한 정보를 입력하세요.');
      return;
    }

    try {
      const addressData = { ...formValues, userId };

      if (isEditMode && currentAddress) {
        await axios.put(
          `/api/mypage/shipping-addresses/${currentAddress.addressId}`,
          addressData,
        );
      } else {
        await axios.post('/api/mypage/shipping-addresses', addressData);
        setPage(totalPages);
      }

      fetchAddresses();
      closeDialog();
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  const handleDelete = async () => {
    if (addressToDelete) {
      try {
        await axios.delete(`/api/mypage/shipping-addresses/${addressToDelete}`);

        fetchAddresses();
        closeDeleteDialog();
      } catch (error) {
        console.error('Error deleting address:', error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'contact') {
      const cleanedValue = value.replace(/[^0-9]/g, '');
      setFormValues((prevValues) => ({
        ...prevValues,
        contact: cleanedValue,
      }));
      validateField(name as keyof FormValues, cleanedValue);
    } else {
      setFormValues((prevValues) => {
        const newValues = { ...prevValues, [name]: value };
        validateField(name as keyof FormValues, value);
        return newValues;
      });
    }
  };

  const handleDefaultChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, isDefault: e.target.checked });
  };

  const validateField = (name: keyof FormValues, value: string) => {
    let error = '';
    switch (name) {
      case 'recipientName':
        error = value ? '' : '수령인 이름을 입력해주세요.';
        break;
      case 'addressName':
        error = value ? '' : '배송지 이름을 입력해주세요.';
        break;
      case 'address':
        error = value ? '' : '주소를 입력해주세요.';
        break;
      case 'postcode':
        error = value ? '' : '우편번호를 입력해주세요.';
        break;
      case 'contact':
        error = /^\d+$/.test(value) ? '' : '연락처를 숫자로만 입력해주세요.';
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const completeHandler = (data: any) => {
    setFormValues({
      ...formValues,
      postcode: data.zonecode,
      address: data.address,
    });
    setErrors((prevErrors) => ({ ...prevErrors, postcode: '', address: '' }));
    setIsAddressModalOpen(false);
  };

  const openAddressModal = () => {
    setIsAddressModalOpen(true);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value - 1);
  };

  return (
    <Box paddingTop={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="20px"
      >
        <StyledTypography>배송지 관리</StyledTypography>
        <StyledButton variant="contained" onClick={() => openDialog()}>
          새 배송지 추가
        </StyledButton>
      </Box>
      <List>
        {addresses.map((address) => (
          <ListItem key={address.addressId}>
            <ListItemText
              primary={
                <Box display="flex" alignItems="center">
                  <Typography>{address.addressName}</Typography>
                  {address.isDefault && <DefaultLabel>기본</DefaultLabel>}
                </Box>
              }
              secondary={
                <Box>
                  <Typography variant="body2">
                    {address.recipientName}
                  </Typography>
                  <Typography variant="body2">{address.contact}</Typography>
                  <Typography variant="body2">{`${address.postcode} ${address.address} ${address.addressDetail}`}</Typography>
                </Box>
              }
            />
            <IconButton onClick={() => openDialog(address)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => openDeleteDialog(address.addressId)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Pagination
        count={totalPages}
        page={page + 1}
        onChange={handlePageChange}
        color="primary"
        sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}
      />

      <Dialog open={isDialogOpen} onClose={closeDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {isEditMode ? '배송지 수정' : '새 배송지 추가'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isEditMode
              ? '배송지 정보를 수정하십시오.'
              : '새 배송지 정보를 입력하십시오.'}
          </DialogContentText>
          <FormControl>
            <TextField
              label="배송지 이름"
              name="addressName"
              value={formValues.addressName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            {errors.addressName && <ErrorText>{errors.addressName}</ErrorText>}
          </FormControl>
          <FormControl>
            <TextField
              label="수령인 이름"
              name="recipientName"
              value={formValues.recipientName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            {errors.recipientName && (
              <ErrorText>{errors.recipientName}</ErrorText>
            )}
          </FormControl>
          <FormControl>
            <TextField
              label="연락처"
              name="contact"
              value={formValues.contact}
              onChange={handleChange}
              fullWidth
              margin="normal"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />
            {errors.contact && <ErrorText>{errors.contact}</ErrorText>}
          </FormControl>
          <FormControl>
            <Box display="flex" alignItems="center">
              <ReadOnlyTextField
                label={
                  formValues.postcode
                    ? '우편번호'
                    : '우편번호 (주소 검색을 통해 입력됩니다.)'
                }
                name="postcode"
                value={formValues.postcode}
                onChange={handleChange}
                margin="normal"
                style={{ flexGrow: 1 }}
                disabled
              />
              <Button
                variant="contained"
                onClick={openAddressModal}
                style={{ marginLeft: 8, height: '56px', marginTop: '7px' }}
              >
                주소 검색
              </Button>
            </Box>
            {errors.postcode && <ErrorText>{errors.postcode}</ErrorText>}
          </FormControl>
          <FormControl>
            <ReadOnlyTextField
              label={
                formValues.address
                  ? '주소'
                  : '주소 (주소 검색을 통해 입력됩니다.)'
              }
              name="address"
              value={formValues.address}
              onChange={handleChange}
              fullWidth
              margin="normal"
              disabled
            />
            {errors.address && <ErrorText>{errors.address}</ErrorText>}
          </FormControl>
          <FormControl>
            <TextField
              label="상세 주소"
              name="addressDetail"
              value={formValues.addressDetail}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </FormControl>
          <Box display="flex" alignItems="center" marginTop={2}>
            <Checkbox
              checked={formValues.isDefault}
              onChange={handleDefaultChange}
            />
            <Typography>기본 배송지로 설정</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="secondary">
            취소
          </Button>
          <Button onClick={handleSave} color="primary">
            저장
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>삭제 확인</DialogTitle>
        <DialogContent>
          <DialogContentText>정말로 삭제하시겠습니까?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="secondary">
            취소
          </Button>
          <Button onClick={handleDelete} color="primary">
            삭제
          </Button>
        </DialogActions>
      </Dialog>

      <Modal
        open={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            width: '400px',
            height: '500px',
            margin: 'auto',
            marginTop: '10%',
            backgroundColor: 'white',
            padding: '20px',
            boxShadow: 24,
          }}
        >
          <DaumPostcode onComplete={completeHandler} />
        </Box>
      </Modal>
    </Box>
  );
}

export default ShippingAddressPage;
