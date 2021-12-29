import { createTheme, Theme } from '@material-ui/core';

const mockTheme: Theme = createTheme({
   palette: {
      type: 'light',
      primary: {
         main: '#121d33',
      },
   },
   typography: {
      h1: {
         fontSize: '1.6rem',
         fontWeight: 500,
      },
      subtitle1: {
         fontSize: '1.8rem',
         fontWeight: 400,
      },
   },
});

export default mockTheme;
