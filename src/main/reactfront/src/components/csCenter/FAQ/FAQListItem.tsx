import React from 'react';

import { FaqData } from '../../../types/MainDummyData';
import ListItem from './FAQListItem.styles';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface FAQListProps {
  faq: FaqData;
  clicked: number | null;
  onClickList: (faqNum: number | null) => void;
}

const FAQListItem: React.FC<FAQListProps> = (props) => {
  const { faq, clicked, onClickList } = props;
  const isClicked = faq.faqNum === clicked;

  const handleClick = (): void => {
    if (isClicked) {
      onClickList(null);
    } else {
      onClickList(faq.faqNum);
    }
  };

  return (
    <ListItem $clicked={isClicked} onClick={handleClick}>
      <h4>
        <span>{faq.faqNum % 10 > 0 ? '0' + faq.faqNum : faq.faqNum}</span>
        {faq.question}
        <span>
          <KeyboardArrowDownIcon />
        </span>
      </h4>
      <p>A. {faq.answer}</p>
    </ListItem>
  );
};

export default FAQListItem;
