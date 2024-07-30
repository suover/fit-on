import React, { useEffect, useState } from 'react';

import axios from '../../../api/axiosConfig';

import { Post } from '../../community/Board';
import ListTable from '../../listTable/ListTable';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
  width: 100%;
  min-height: 300px;
  text-align: center;
  padding-top: 200px;
  box-sizing: border-box;
  font-weight: bold;
`;

const colunmData = [
  { columnId: 'id', title: '번호', width: 30, marginRight: 30 },
  { columnId: 'title', title: '제목', width: 600, align: 'left' },
  { columnId: 'nickname', title: '작성자', width: 120, marginRight: 30 },
  { columnId: 'likes', title: '좋아요', width: 80, marginRight: 30 },
  { columnId: 'views', title: '조회수', width: 80, marginRight: 30 },
  { columnId: 'createDate', title: '작성일', width: 100 },
];

const MainCommuity: React.FC = () => {
  const [communityList, setCommunityList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInfoData = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/main/community');

        const communityData = res.data.map((community: any, idx: number) => ({
          ...community,
          id: idx + 1,
          createDate: community.createdAt.split('T')[0],
          views: community.viewCount,
          contentNum: community.communityId,
        }));

        setCommunityList(communityData);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfoData();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingWrapper>Loading...</LoadingWrapper>
      ) : (
        <ListTable
          data={communityList}
          columnData={colunmData}
          pageUrl="community"
          paging={false}
        />
      )}
    </>
  );
};

export default MainCommuity;
