import React, { useEffect, useState } from 'react';

import axios from 'axios';

import {
  InfoSection,
  NoContentWrapper,
  ImgWrapper,
  TabBtns,
} from '../../styles/information/Info.styles';

import CardList from '../../components/cardList/CardList';
import { Container, Stack, Pagination } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

export interface Information {
  id: number;
  nickname: string;
  categoryName: string;
  categoryId: number;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  isDeleted: boolean;
  likes: number;
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const Info: React.FC = () => {
  const [infoList, setInfoList] = useState<Information[]>([]);
  const [totalPages, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<String>('전체');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await axiosInstance.get(`/info/search`, {
          params: { keyword: selectedTab, page: currentPage - 1 },
        });
        const data: Information[] = res.data.content;
        const transformedData = data.map((info: any) => ({
          ...info,
          id: info.infoId, // infoId를 id로 변환
          views: info.viewCount,
        }));
        setInfoList(transformedData);
        setTotalPage(res.data.totalPages);
      } catch (error) {
        console.error('Error fetching information:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTab, currentPage]);

  const handleClickTab = (event: React.MouseEvent) => {
    let target = event.target as HTMLElement;
    let seleted = target.innerText;

    setSelectedTab(seleted);
    setCurrentPage(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ): void => {
    setCurrentPage(value);
  };

  return (
    <InfoSection>
      <Container>
        <ImgWrapper>
          <p>FitON과 함께 더 건강해져요!</p>
        </ImgWrapper>
        <TabBtns>
          {[
            '전체',
            '헬스',
            '요가/필라테스',
            '스트레칭/홈트',
            '재활/체형교정',
            '스포츠훈련',
            '스포츠테이핑',
          ].map((tab, idx) => (
            <button
              key={tab + idx}
              className={selectedTab === tab ? 'active' : ''}
              onClick={handleClickTab}
            >
              {tab}
            </button>
          ))}
        </TabBtns>
        {infoList.length !== 0 && !loading ? (
          <CardList
            contents={infoList}
            pageURL="info"
            Icon={VisibilityOutlinedIcon}
          />
        ) : (
          <NoContentWrapper>
            {loading ? 'Loading...' : '등록된 컨텐츠가 없습니다. 😥'}
          </NoContentWrapper>
        )}
      </Container>
      {infoList.length > 0 && (
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
      )}
    </InfoSection>
  );
};

export default Info;
