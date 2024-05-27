import React from 'react';

import { Card, TextBox } from './ContentCard.styles';

import { SvgIconProps } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

type ContentType = {
  title: string;
  nickname?: string;
  views?: number;
  likes: number;
  imageUrl: string;
  routineParts?: string | string[];
};

interface ContentCardProps<T extends ContentType> {
  content: T;
  boardType: string;
  Icon?: React.ElementType<SvgIconProps>;
}

const ContentCard = <T extends ContentType>({
  content,
  boardType,
  Icon,
}: ContentCardProps<T>) => {
  const { title, views, likes, imageUrl, nickname, routineParts } = content;

  let additionalText = boardType === 'info' ? nickname : routineParts;

  return (
    <Card>
      <div>
        <img src={imageUrl} alt="thumnail" />
      </div>
      <TextBox>
        <h3>{title}</h3>
        <p>
          <span>{additionalText}</span>
          <span>
            <ThumbUpOutlinedIcon /> {likes}
          </span>
          <span>
            {Icon ? <Icon /> : <ThumbUpOutlinedIcon />} {views ? views : ''}
          </span>
        </p>
      </TextBox>
    </Card>
  );
};

export default ContentCard;
