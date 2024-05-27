import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { InfoPosts } from '../../types/MainDummyData';
import { InfoSection, ImgWrapper } from '../../styles/information/Info.styles';

import CardList from '../../components/cardList/CardList';
import { Container } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import styled from 'styled-components';

const NoContentWrapper = styled.div`
  padding-top: 200px;
  font-size: 1.125rem;
  font-weight: bold;
  text-align: center;
`;

export interface Information {
  id: number;
  userId: string;
  categoryId: number;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  isDeleted: boolean;
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api', // 백엔드 API의 기본 URL을 설정합니다.
  headers: {
    'Content-Type': 'application/json',
  },
});

const getAllInfo = async (): Promise<Information[]> => {
  const response = await axiosInstance.get<Information[]>('/info');
  return response.data;
};

const Info: React.FC = () => {
  const [infoList, setInfoList] = useState<Information[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllInfo();
        const transformedData = data.map((info: any) => ({
          ...info,
          id: info.infoId, // infoId를 id로 변환
        }));
        setInfoList(transformedData);
        console.log(transformedData);
      } catch (error) {
        console.error('Error fetching information:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <InfoSection>
      <Container>
        <ImgWrapper>
          <p>fitON과 함께 더 건강해져요!</p>
        </ImgWrapper>
        {loading && 'Loading...'}
        {infoList.length !== 0 ? (
          <CardList
            contents={infoList}
            pageURL="info"
            Icon={VisibilityOutlinedIcon}
          />
        ) : (
          <NoContentWrapper>등록된 컨텐츠가 없습니다. 😥</NoContentWrapper>
        )}
      </Container>
    </InfoSection>
  );
};

export default Info;
