import { createTheme } from '@mui/material/styles';

const MuiFontTheme = createTheme({
  typography: {
    fontFamily: ['Noto Sans KR', 'Raleway', 'sans-serif'].join(','),
  },
});

export default MuiFontTheme;
