import React, { useEffect, useState } from 'react';

import axios from '../../../api/axiosConfig';

import { Information } from '../../../pages/information/Info';
import SwiperList from '../../swiper/SwiperList';
import styled from 'styled-components';

const MainInfoWrapper = styled.div`
  min-height: 350px;
  p.text {
    text-align: center;
    padding-top: 140px;
    font-weight: bold;
    box-sizing: border-box;
  }
`;

const MainInfo = () => {
  const [infoList, setInfoList] = useState<Information[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInfoData = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/main/info');

        const infoData = res.data.map((info: any) => ({
          ...info,
          id: info.infoId,
          views: info.viewCount,
        }));

        setInfoList(infoData);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfoData();
  }, []);

  return (
    <MainInfoWrapper>
      {!loading && infoList.length === 0 && (
        <p className="text">등록된 컨텐츠가 없습니다.</p>
      )}
      {loading ? (
        <p className="text">Loading...</p>
      ) : (
        <SwiperList swiperData={infoList} pageURL="info" />
      )}
    </MainInfoWrapper>
  );
};

export default MainInfo;
