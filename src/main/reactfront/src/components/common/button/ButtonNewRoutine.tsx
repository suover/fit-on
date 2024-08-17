import React from 'react';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useNavigate } from 'react-router-dom';
import Button, { ButtonPropsColorOverrides } from '@mui/material/Button';
import {
  createTheme,
  PaletteColorOptions,
  ThemeProvider,
} from '@mui/material/styles';

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

const ButtonNewRoutine = () => {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate('/routine/new-routine');
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
        루틴 작성
      </Button>
    </ThemeProvider>
  );
};

export default ButtonNewRoutine;
