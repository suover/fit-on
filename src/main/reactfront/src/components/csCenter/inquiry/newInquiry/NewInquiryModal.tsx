import React, { useState } from 'react';

import Editor from '../../../common/Editor';
import {
  ModalWrapper,
  StyledTextField,
  StyledFormControl,
  SubmitBtn,
} from './NewInquiryModal.styles';

import CloseIcon from '@mui/icons-material/Close';
import { Modal, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface inquiryDataType {
  title: string;
  category: string;
  content: string;
}

const NewInquiryModal: React.FC<{
  isOpen: boolean;
  handleModal: () => void;
}> = ({ isOpen, handleModal }) => {
  const [open, setOpen] = useState<boolean>(isOpen);
  const [selectCategory, setSelectCategoty] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleCloseModal = (): void => {
    setOpen(false);
    handleModal();
  };

  const handleSelectChange = (event: SelectChangeEvent): void => {
    setSelectCategoty(event.target.value);
  };

  const handleTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setTitle(event.target.value);
  };

  const handleContentChange = (value: string): void => {
    setContent(value);
  };

  const handleSubmit = async () => {
    if (title.trim().length === 0) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (content.trim().length === 0) {
      alert('내용을 입력해주세요.');
      return;
    }

    // const inquiryData: inquiryDataType = { 실제 서버에 전송할 때 테스트해야함
    //   category: selectCategory,
    //   title: title,
    //   content: content
    // }

    // try {
    //   const response = await fetch('fiton/service/newInquiry', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(inquiryData),
    //   });

    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }

    //   const responseData = await response.json();
    //   console.log('Server Response:', responseData);
    // } catch (error) {
    //   console.error('Failed to submit inquiry:', error);
    // }

    alert('등록 되었습니다.');
    handleModal(); // 데이터 전송 후 모달 닫기
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalWrapper>
        <div className="heading">
          <h3 id="modal-modal-title">문의 등록하기</h3>
          <button onClick={handleCloseModal}>
            <CloseIcon />
          </button>
        </div>
        <div className="inputField">
          <StyledFormControl
            sx={{
              m: 1,
              minWidth: 120,
              margin: 0,
              width: '10%',
              marginRight: '10px',
            }}
          >
            <Select
              sx={{ outline: 'none', border: 'none' }}
              value={selectCategory}
              onChange={handleSelectChange}
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
          </StyledFormControl>
          <StyledTextField
            value={title}
            onChange={handleTitleChange}
            label="제목"
            sx={{ width: '87%' }}
            InputLabelProps={{
              sx: {
                color: '#333',
                '&.Mui-focused': {
                  color: '#333',
                },
                '&.MuiInputLabel-shrink': {
                  color: '#333',
                },
              },
            }}
          />
        </div>
        <Editor
          value={content}
          placeholder="문의 내용을 입력해주세요."
          onChange={handleContentChange}
        />
        <SubmitBtn onClick={handleSubmit}>등록하기</SubmitBtn>
      </ModalWrapper>
    </Modal>
  );
};

export default NewInquiryModal;
