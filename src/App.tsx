import { ThemeProvider } from '@material-ui/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useTheme } from './shared/theme';
import { Layout } from './shared/components';
import Routes from './Routes';

const App = () => {
   const { theme } = useTheme();
   const client = new QueryClient();

   return (
      <ThemeProvider theme={theme}>
         <QueryClientProvider client={client}>
            <Layout>
               <Routes />
            </Layout>
         </QueryClientProvider>
      </ThemeProvider>
   );
};

export default App;
