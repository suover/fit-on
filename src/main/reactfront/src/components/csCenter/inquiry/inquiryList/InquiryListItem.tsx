import React from 'react';

import { Inquiry } from '../../../../types/MainDummyData';
import { ListItem, ListItemDetail } from './InquiryListItem.styles';

interface InquiryListItemProps {
  inquiryData: Inquiry;
  clickedNum: number | null;
  onClickList: (inquiryNum: number | null) => void;
}

const InquiryListItem: React.FC<InquiryListItemProps> = ({
  inquiryData,
  clickedNum,
  onClickList,
}) => {
  const { id, state, category, title, question, writer, answer, createDate } =
    inquiryData;

  const isClicked = inquiryData.id === clickedNum;

  const handleClick = (): void => {
    if (isClicked) {
      onClickList(null);
    } else {
      onClickList(inquiryData.id);
    }
  };

  return (
    <>
      <ListItem onClick={handleClick} $clicked={isClicked}>
        <div>
          <span>{id}</span>
          <span>{state}</span>
          <span>{category}</span>
          <p>{title}</p>
          <span>{writer}</span>
          <span>{createDate}</span>
        </div>
        {isClicked && (
          <ListItemDetail>
            <h3>{question}</h3>
            <p>
              └<span>답변</span>
              {answer}
            </p>
          </ListItemDetail>
        )}
      </ListItem>
    </>
  );
};

export default InquiryListItem;
