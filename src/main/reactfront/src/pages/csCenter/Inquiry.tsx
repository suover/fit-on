import React, { useState } from 'react';

import { inquiries } from '../../types/MainDummyData';
import {
  InquiryHeading,
  InputField,
  NewInquiryBtn,
} from '../../styles/csCenter/Inquiry.styles';
import InquiryLists from '../../components/csCenter/inquiry/inquiryList/InquiryLists';
import CheckBox from '../../components/csCenter/checkBox/CheckBox';
import NewInquiryModal from '../../components/csCenter/inquiry/newInquiry/NewInquiryModal';

import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

const Inquiry: React.FC = () => {
  // const [inquiryData, setInquiryData] = useState<Inquiry[]>(inquiries); // 데이터를 백엔드에서 요청받을지, 아니면 전체 받아서 리액트에서 필터할지 여부
  const [filterCategory, setFilterCategoty] = useState<string>('');
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const filterChange = (event: SelectChangeEvent): void => {
    // 필터용 select
    setFilterCategoty(event.target.value);
  };
  const handleCheck = (): void => {
    setIsCheck((prevState) => !prevState);
  };

  const handleModal = (): void => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  // useEffect(() => {
  //   if (isCheck) {
  //     // 세선에셔 유저 아이디 념겨와야함
  //     // setInquiryData 넘겨주기
  //   }
  // }, [category, isCheck]);

  return (
    <>
      <InquiryHeading>1:1 문의</InquiryHeading>
      <InputField>
        <FormControl sx={{ m: 1, minWidth: 120, margin: 0 }} size="small">
          <Select
            value={filterCategory}
            onChange={filterChange}
            sx={{ outline: 'none', border: 'none' }}
            displayEmpty
          >
            <MenuItem value="" selected>
              전체
            </MenuItem>
            <MenuItem value={1}>배송</MenuItem>
            <MenuItem value={2}>환불</MenuItem>
            <MenuItem value={3}>교환</MenuItem>
            <MenuItem value={4}>결제</MenuItem>
            <MenuItem value={5}>계정</MenuItem>
          </Select>
        </FormControl>
        <CheckBox onCheck={handleCheck} isCheck={isCheck}>
          내 글 보기
        </CheckBox>
        <NewInquiryBtn onClick={handleModal}>문의 등록하기</NewInquiryBtn>
      </InputField>
      <InquiryLists inquiryData={inquiries} />
      {isOpen && <NewInquiryModal isOpen={isOpen} handleModal={handleModal} />}
    </>
  );
};

export default Inquiry;
