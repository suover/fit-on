//// CommentLeave.tsx
import React, { useCallback, useState, ChangeEvent, FormEvent } from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

type Comment = {
  no: number;
  id: string;
  content: string;
  writtenTime: string;
  like: number;
  created_at: Date;
  updated_at: Date;
  replies: Comment[];
};

type CommentLeaveProps = {
  onInsert: (comment: Comment) => void;
  prePopulatedText?: string; // Optional text to pre-fill the comment box, e.g., "@username"
};

// , prePopulatedText = ''
const CommentLeave = ({ onInsert, prePopulatedText = '' }: CommentLeaveProps) => {
  // const [value, setValue] = useState(prePopulatedText);
  const [value, setValue] = useState(prePopulatedText);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const newComment = {
        no: Date.now(), // 예시 ID
        id: 'currentUser',
        content: value,
        writtenTime: new Date().toISOString(),
        like: 0,
        created_at: new Date(),
        updated_at: new Date(),
        replies: [],
      };
      onInsert(newComment);
      setValue('');
    },
    [onInsert, value],
  );

  return (
    <form onSubmit={onSubmit}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          my: 2,
        }}
      >
        <TextField
          required
          fullWidth
          value={value}
          onChange={onChange}
          placeholder="Add a comment"
          variant="outlined"
          sx={{
            mb: 2,
            borderRadius: '20px',
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <InsertEmoticonIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <AttachFileIcon color="action" sx={{ mr: 1 }} />
                <CameraAltIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </form>
  );
};

export default CommentLeave;
