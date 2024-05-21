import React, { useState } from 'react';
import { ProImg, MainImg, DetailImg, ImageModal } from './ImageDetail.styled';
import { productData } from '../../types/ProductData';

const ImgDetail = () => {
  const product = productData[2];
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <ProImg>
      <MainImg onClick={() => openModal(product.imageUrl)}>
        <img
          alt={product.name}
          src={product.imageUrl}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
          }}
        />
      </MainImg>
      <DetailImg>
        {[...Array(4)].map((_, index) => (
          <img
            key={index}
            className="productImage"
            alt={product.name}
            src={product.imageUrl}
            style={{ width: '84px', height: '80px', margin: 8 }}
            onClick={() => openModal(product.imageUrl)}
          />
        ))}
      </DetailImg>
      {modalOpen && (
        <ImageModal onClick={closeModal}>
          <img
            src={selectedImage}
            alt="Expanded View"
            style={{ width: '100%', maxHeight: '90vh' }}
          />
        </ImageModal>
      )}
    </ProImg>
  );
};

export default ImgDetail;
