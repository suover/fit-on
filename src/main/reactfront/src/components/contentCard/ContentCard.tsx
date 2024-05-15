import React from 'react';

import { Card, TextBox } from './ContentCard.styles';

import { SvgIconProps } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

type ContentType = {
  title: string;
  author?: string;
  views?: number;
  likes: number;
  imageUrl: string;
  target?: string | string[];
};

interface ContentCardProps<T extends ContentType> {
  content: T;
  Icon?: React.ElementType<SvgIconProps>;
}

const ContentCard = <T extends ContentType>({
  content,
  Icon,
}: ContentCardProps<T>) => {
  const { title, author, views, likes, imageUrl, target } = content;

  return (
    <Card>
      <div>
        <img src={imageUrl} alt="thumnail" />
      </div>
      <TextBox>
        <h3>{title}</h3>
        <p>
          <span>{author ? author : target}</span>
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
