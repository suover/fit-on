import React, { useState } from 'react';

import { DetailHeading, ContentBox } from './ContentDetail.styles';

type DetailType = {
  id: number | string;
  title: string;
  writer: string;
  content: string;
  views: number;
  createDate: string;
};

interface ContentDetailProps<T> {
  detailData: T;
}

const ContentDetail = <T extends DetailType>({
  detailData,
}: ContentDetailProps<T>) => {
  const [showCommit, setShowCommit] = useState<boolean>(false);
  const { title, writer, content, views, createDate } = detailData;

  return (
    <>
      <DetailHeading>
        <h3>{title}</h3>
        <div>
          <span>{writer}</span>
          <span>조회수 {views}</span>
          <span>작성일 {createDate}</span>
        </div>
      </DetailHeading>
      <ContentBox>{content}</ContentBox>
    </>
  );
};

export default ContentDetail;
