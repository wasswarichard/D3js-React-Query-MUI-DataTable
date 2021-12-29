import { useState } from 'react';
import { createTheme, Theme } from '@material-ui/core';

import themeVariables from './themeVariables';

export enum ThemeMode {
   Light = 'light',
   Dark = 'dark',
}

const useTheme = () => {
   const defaultTheme: Theme = createTheme({
      palette: {
         type: ThemeMode.Light,
         primary: {
            main: themeVariables.colors.blue,
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

   const [muiTheme, setMuiTheme] = useState<Theme>(defaultTheme);

   const setTheme = (theme: Theme) => setMuiTheme(theme);

   return {
      theme: muiTheme,
      setTheme,
   };
};

export default useTheme;
