import React, { useState } from 'react';
import { TextField, MenuItem, Box, Typography, Container } from '@mui/material';
import GenericButton from '../../components/common/genericButton/GenericButton';
import 'react-quill/dist/quill.snow.css';
import noImage from '../../assets/itemRegister/noImage.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import Editor from '../../components/common/Editor';
import axios from 'axios';

interface FormValues {
  productName: string;
  productDescription: string;
  productCategory: string;
  productPrice: string;
  eventRate: string;
  detailDescription: string;
  deliveryFee: string;
  stock: string;
}

const ItemRegisterPage: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    productName: '',
    productDescription: '',
    productCategory: '',
    productPrice: '',
    eventRate: '',
    detailDescription: '',
    deliveryFee: '',
    stock: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<string[]>(
    Array(3).fill(''),
  );
  const [detailDescription, setDetailDescription] = useState<string>('');
  const navigate = useNavigate();

//   const [categories, setCategories] = useState<{ category_id: number; name: string }[]>([]);
//   useEffect(() => {
//       const fetchCategories = async () => {
//         try {
//           const response = await axios.get<{ category_id: number; name: string }[]>('http://localhost:8080/api/categories');
//           setCategories(response.data);
//         } catch (error) {
//           console.error('Failed to fetch categories:', error);
//         }
//       };
//
//       fetchCategories();
//     }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, productCategory: e.target.value });
  };

  const handleDetailiDescriptionChange = (value: string) => {
    setDetailDescription(value);
  };

  const handleImageClick =
    (index: number | null = null) =>
    () => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.style.display = 'none';
      document.body.appendChild(input);

      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (index === null) {
              setImagePreview(reader.result as string);
            } else {
              const newAdditionalImages = [...additionalImages];
              newAdditionalImages[index] = reader.result as string;
              setAdditionalImages(newAdditionalImages);
            }
          };
          reader.readAsDataURL(file);
        }
      };

      input.click();
      document.body.removeChild(input);
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const productData = {
      name: formValues.productName,
      description: formValues.productDescription,
      price: parseFloat(formValues.productPrice),
      stock: parseInt(formValues.stock),
      content: detailDescription,
      discountRate: parseFloat(formValues.eventRate),
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      categoryId: parseInt(formValues.productCategory),
    };
    console.log('Form product:', productData);
    console.log('img:', imagePreview);
    console.log('additionalImages :', additionalImages);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/products',
        productData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('Product registered successfully:', response.data);
      navigate('/administrator/item-list'); // 등록 성공 시 이동
    } catch (error) {
      console.error('There was an error registering the product!', error);
    }
  };

  return (
    <Container sx={{ paddingTop: '50px', paddingBottom: '50px' }}>
      <Typography
        sx={{ fontWeight: 'bold', fontSize: '1.875rem' }}
        variant="h3"
        gutterBottom
      >
        상품 등록
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ flex: 1, maxWidth: '400px' }}>
            <img
              src={imagePreview || noImage}
              alt="Preview"
              style={{
                borderRadius: '5px',
                width: '411px',
                height: '344px',
                border: '1px solid #ccc',
                cursor: 'pointer',
                marginBottom: '15px',
              }}
              onClick={handleImageClick()}
            />
            <Box sx={{ display: 'flex', gap: 2, marginTop: '10px' }}>
              {additionalImages.map((image, index) => (
                <Box key={index} sx={{ flex: 1, maxWidth: '200px' }}>
                  <img
                    src={image || noImage}
                    alt={`Additional Preview ${index + 1}`}
                    style={{
                      borderRadius: '5px',
                      width: '125.5px',
                      height: '127px',
                      border: '1px solid #ccc',
                      cursor: 'pointer',
                    }}
                    onClick={handleImageClick(index)}
                  />
                </Box>
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              flex: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              marginLeft: '20px',
            }}
          >
            <TextField
              name="productName"
              label="상품명"
              value={formValues.productName}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="productDescription"
              label="상품설명"
              value={formValues.productDescription}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              select
              name="productCategory"
              label="카테고리"
              value={formValues.productCategory}
              onChange={handleSelectChange}
              fullWidth
            >
              <MenuItem value="1">피트니스</MenuItem>
              <MenuItem value="2">보충제</MenuItem>
              <MenuItem value="3">영양제</MenuItem>
              <MenuItem value="4">식품</MenuItem>
              <MenuItem value="5">요가 & 필라테스</MenuItem>
              <MenuItem value="6">구기용품</MenuItem>
              <MenuItem value="7">런닝 & 자전거용품</MenuItem>
              <MenuItem value="8">복싱 & 잡화</MenuItem>
            </TextField>
            <TextField
              name="productPrice"
              label="상품 가격"
              value={formValues.productPrice}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="eventRate"
              label="할인율 (%)"
              type="number"
              value={formValues.eventRate}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="deliveryFee"
              label="배송비"
              value={formValues.deliveryFee}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="stock"
              label="재고"
              value={formValues.stock}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>
        </Box>
        <Box>
          <Editor
            value={detailDescription}
            onChange={handleDetailiDescriptionChange}
            placeholder="상품설명을 기재하시오"
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link to="/administrator/item-list">
            <GenericButton
              style={{
                width: '120px',
                height: '50px',
                fontSize: '1rem',
                marginRight: '10px',
              }}
            >
              뒤로가기
            </GenericButton>
          </Link>
          <GenericButton
            style={{
              width: '120px',
              height: '50px',
              fontSize: '1rem',
            }}
            type="submit"
          >
            등록하기
          </GenericButton>
        </Box>
      </Box>
    </Container>
  );
};

export default ItemRegisterPage;
