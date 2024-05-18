import React from 'react';

import { faqs } from '../../types/MainDummyData';
import FAQLists from '../../components/csCenter/FAQ/FAQLists';
import InputField from '../../styles/csCenter/FAQ.styles';
import { Heading } from '../../styles/csCenter/ClientServie.styles';

import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const FAQ = () => {
  return (
    <>
      <Heading>FAQ</Heading>
      <InputField>
        <div>
          <input type="text" placeholder="무엇을 도와드릴까요?" />
          <Button sx={{ border: '1px solid #555' }}>
            <SearchIcon />
          </Button>
        </div>
        <span>ex&#41; 배송, 반품, 취소, 결제, 회원정보 ...</span>
      </InputField>
      <FAQLists faqs={faqs} />
    </>
  );
};

export default FAQ;
