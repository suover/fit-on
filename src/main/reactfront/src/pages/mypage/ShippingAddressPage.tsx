import React, { useState } from 'react';
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
  styled,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StyledTypography from '../../styles/mypage/StyledTypography';

interface Address {
  id: string;
  name: string;
  address: string;
  contact: string;
  isDefault: boolean;
}

const initialAddresses: Address[] = [
  {
    id: '1',
    name: '청와대',
    address: '서울특별시 종로구 청와대로 1',
    contact: '010-1111-1111',
    isDefault: true,
  },
  {
    id: '2',
    name: '경복궁',
    address: '서울 종로구 사직로 161 경복궁',
    contact: '010-1234-5678',
    isDefault: false,
  },
];

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

function ShippingAddressPage() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({
    name: '',
    address: '',
    contact: '',
    isDefault: false,
  });

  const openDialog = (address: Address | null = null) => {
    if (address) {
      setIsEditMode(true);
      setCurrentAddress(address);
      setFormValues({
        name: address.name,
        address: address.address,
        contact: address.contact,
        isDefault: address.isDefault,
      });
    } else {
      setIsEditMode(false);
      setFormValues({ name: '', address: '', contact: '', isDefault: false });
    }
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

  const handleSave = () => {
    let updatedAddresses = addresses;

    if (formValues.isDefault) {
      updatedAddresses = addresses.map((address) => ({
        ...address,
        isDefault: false,
      }));
    }

    if (isEditMode && currentAddress) {
      updatedAddresses = updatedAddresses.map((address) =>
        address.id === currentAddress.id
          ? { ...address, ...formValues }
          : address,
      );
    } else {
      const newAddress: Address = {
        id: (addresses.length + 1).toString(),
        ...formValues,
      };
      updatedAddresses = [...updatedAddresses, newAddress];
    }

    setAddresses(updatedAddresses);
    closeDialog();
  };

  const handleDelete = () => {
    if (addressToDelete) {
      setAddresses(
        addresses.filter((address) => address.id !== addressToDelete),
      );
    }
    closeDeleteDialog();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleDefaultChange = () => {
    setFormValues({ ...formValues, isDefault: !formValues.isDefault });
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
          <ListItem key={address.id}>
            <ListItemText
              primary={
                <Box display="flex" alignItems="center">
                  <Typography>{address.name}</Typography>
                  {address.isDefault && <DefaultLabel>기본</DefaultLabel>}
                </Box>
              }
              secondary={`${address.address}, ${address.contact}`}
            />
            <IconButton onClick={() => openDialog(address)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => openDeleteDialog(address.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>
          {isEditMode ? '배송지 수정' : '새 배송지 추가'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isEditMode
              ? '배송지 정보를 수정하십시오.'
              : '새 배송지 정보를 입력하십시오.'}
          </DialogContentText>
          <TextField
            label="이름"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="주소"
            name="address"
            value={formValues.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="연락처"
            name="contact"
            value={formValues.contact}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
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
    </Box>
  );
}

export default ShippingAddressPage;
