import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Question } from '../../types/question';
import {
  Modal as BaseModal,
  Button,
  Box,
  TextField,
  Typography,
} from '@mui/material';
import clsx from 'clsx';

interface Props {
  onSave: (question: Question) => void;
}

function formatDate(date: Date): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = ('0' + (d.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더합니다.
  const day = ('0' + d.getDate()).slice(-2);
  const hour = ('0' + d.getHours()).slice(-2);
  const minute = ('0' + d.getMinutes()).slice(-2);
  return `${year}/${month}/${day} ${hour}:${minute}`;
}

export default function ModalUnstyled({ onSave }: Props) {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState('');
  const [question, setQuestion] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    const newQuestion: Question = {
      id: (Math.random() * 1000).toString(), // 간단한 ID 생성
      answer: false,
      content: question,
      nickname: '비회원', // 기본 답변
      date: formatDate(new Date()),
      isExpanded: false,
    };
    onSave(newQuestion);
    handleClose();
    setQuestion(''); // 질문 리셋
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Button onClick={handleOpen}>문의 하기</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        slots={{ backdrop: StyledBackdrop }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            문의 사항
          </Typography>
          <TextField
            fullWidth
            id="modal-modal-description"
            label="상품 문의 내용을 입력하세요."
            variant="outlined"
            multiline // 여러 줄 입력을 가능하게 설정
            rows={4} // 최소 줄 수를 4줄로 설정
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Button onClick={handleSave}>등록</Button>
            <Button onClick={handleClose}>취소</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'base-Backdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;
