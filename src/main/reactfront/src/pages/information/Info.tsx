import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import axios from '../../api/axiosConfig';

import {
  InfoSection,
  NoContentWrapper,
  ImgWrapper,
  TabBtns,
} from '../../styles/information/Info.styles';

import CardList from '../../components/cardList/CardList';
import SearchBox from '../../components/common/search/SearchBox';
import { Container, Stack, Pagination } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

export interface Information {
  id: number;
  userId: number;
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

const Info: React.FC = () => {
  const [infoList, setInfoList] = useState<Information[]>([]);
  const [totalPages, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();

  const fetchData = async (keyword: string, search: string, page: number) => {
    setLoading(true);

    let filterKeyword = encodeURIComponent(keyword);

    try {
      const res = await axios.get(
        `/api/info/search?filterKeyword=${filterKeyword}&searchKeyword=${search}&page=${page - 1}`,
      );
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

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(location.search);
    const keyword = params.get('filterKeyword') || '전체';
    const search = params.get('searchKeyword') || '';
    const pageParam = params.get('page');
    const page = pageParam ? parseInt(pageParam) : 1;

    setSelectedTab(keyword);
    setSearchKeyword(search);
    setCurrentPage(page);

    fetchData(keyword, search, page);
  }, [location.search]);

  const updatePath = (keyword: string, search: string, page: number) => {
    navigate(
      `/info/search?filterKeyword=${encodeURIComponent(keyword)}&searchKeyword=${search}&page=${page}`,
    );
  };

  const handleClickTab = (event: React.MouseEvent) => {
    let target = event.target as HTMLElement;
    let selected = target.innerText;

    setSelectedTab(selected);
    setSearchKeyword('');
    setCurrentPage(1);

    updatePath(selected, '', 1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ): void => {
    setCurrentPage(value);
    updatePath(selectedTab, searchKeyword, value);
  };

  const handleSearch = (query: string): void => {
    setSearchKeyword(query);
    updatePath(selectedTab, query, currentPage);
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
              className={selectedTab === tab ? 'tabBtn active' : 'tabBtn'}
              onClick={handleClickTab}
            >
              {tab}
            </button>
          ))}
          <SearchBox onSearch={handleSearch} styleProps={{ width: '250px' }} />
        </TabBtns>
        {infoList.length !== 0 && !loading ? (
          <CardList
            contents={infoList}
            pageURL="info"
            Icon={VisibilityOutlinedIcon}
            keyword={selectedTab}
            search={searchKeyword}
            page={currentPage}
          />
        ) : (
          <NoContentWrapper>
            {loading ? 'Loading...' : '등록된 컨텐츠가 없습니다. 😥'}
          </NoContentWrapper>
        )}
      </Container>
      {!loading && infoList.length > 0 && (
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
