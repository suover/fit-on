import React from 'react';
import { Card, TextBox } from './ContentCard.styles';
import { SvgIconProps } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

type ContentType = {
  title: string;
  nickname?: string;
  views?: number;
  shares?: number;
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
  const { title, views, likes, shares, imageUrl, nickname } = content;

  return (
    <Card>
      <div>
        <img src={imageUrl} alt="thumbnail" />
      </div>
      <TextBox>
        <h3>{title}</h3>
        <p>
          <span>{nickname}</span>
          <span>
            <ThumbUpOutlinedIcon /> {likes ? likes : 0}
          </span>
          <span>
            {Icon ? <Icon /> : <ThumbUpOutlinedIcon />} {views ? views : shares}
          </span>
        </p>
      </TextBox>
    </Card>
  );
};

export default ContentCard;
