import Button, { ButtonPropsColorOverrides } from '@mui/material/Button';
import {
  createTheme,
  PaletteColorOptions,
  ThemeProvider,
} from '@mui/material/styles';
import React from 'react';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useNavigate } from 'react-router-dom';

declare module '@mui/material/styles' {
  interface CustomPalette {
    anger: PaletteColorOptions;
    apple: PaletteColorOptions;
    steelBlue: PaletteColorOptions;
    violet: PaletteColorOptions;
    bluegreen: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    anger: true;
    apple: true;
    steelBlue: true;
    violet: true;
    bluegreen: true;
  }
}
const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) =>
  augmentColor({ color: { main: mainColor } });

const theme = createTheme({
  palette: {
    anger: createColor('#F40B27'),
    apple: createColor('#5DBA40'),
    steelBlue: createColor('#5C76B7'),
    violet: createColor('#BC00A3'),
    bluegreen: createColor('#00b4cc'),
  },
});

const ButtonNewPost = () => {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate('/community/new-post');
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="contained"
        color="bluegreen"
        onClick={handleClick}
        sx={{ color: 'white' }}
        startIcon={<PostAddIcon />}
      >
        글 쓰기
      </Button>
    </ThemeProvider>
  );
};

export default ButtonNewPost;
