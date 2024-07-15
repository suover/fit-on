import React, {useEffect, useState} from 'react';
import { ProImg, MainImg, DetailImg, ImageModal } from './ImageDetail.styled';
import { Product } from '../../types/DataInterface';
import axios from '../../api/axiosConfig';

interface ImageDetailProps {
  product: Product;
}
const ImgDetail: React.FC<ImageDetailProps> = ({ product }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [subImages, setSubImages] = useState<string[]>([]);

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

    useEffect(() => {
        const fetchSubImages = async () => {
            try {
                const response = await axios.get<string[]>(
                    `/api/products-image/${product.productId}/SubImgURL`
                );
                if (response.status === 200) {
                    setSubImages(response.data);
                } else {
                    console.error('Failed to fetch sub images');
                }
            } catch (error) {
                console.error('Error fetching sub images', error);
            }
        };

        fetchSubImages();
    }, [product.productId]);


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
        {subImages.length > 0 && (
            <DetailImg>
                {subImages.map((imageUrl, index) => (
                    <img
                        key={index}
                        className="productImage"
                        alt={product.name}
                        src={imageUrl}
                        style={{ width: '84px', height: '80px', margin: 8 }}
                        onClick={() => openModal(imageUrl)}
                    />
                ))}
            </DetailImg>
        )}

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
