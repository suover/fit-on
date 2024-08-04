import React, { useEffect, useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import axios from '../../../api/axiosConfig';
import AuthContext from '../../../context/AuthContext';

const StyledProfileImage = styled('div')<{
  backgroundImage: string;
  size?: number;
}>`
  border-radius: 50%;
  width: ${({ size }) => size || 40}px;
  height: ${({ size }) => size || 40}px;
  background-size: cover;
  background-position: center;
  background-image: ${({ backgroundImage }) => backgroundImage};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #ccc;
  border: 1px solid #ccc;
`;

interface ProfileImageProps {
  userId?: number | string;
  size?: number;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ userId, size = 40 }) => {
  const { userId: contextUserId } = useContext(AuthContext);
  const effectiveUserId = userId ?? contextUserId;
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!effectiveUserId) return;

    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(
          `/api/mypage/userinfo/get-profile-image`,
          {
            params: { userId: effectiveUserId },
          },
        );
        setProfileImageUrl(response.data);
      } catch (error) {
        console.error('Failed to fetch profile image', error);
      }
    };

    fetchProfileImage();
  }, [effectiveUserId]);

  return profileImageUrl ? (
    <StyledProfileImage
      size={size}
      backgroundImage={`url(${profileImageUrl})`}
    />
  ) : (
    <Avatar sx={{ width: size, height: size }} />
  );
};

export default ProfileImage;
