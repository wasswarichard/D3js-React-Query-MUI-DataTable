import { ThemeProvider } from '@material-ui/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useTheme } from './shared/theme';
import { Layout } from './shared/components';
import RoutePaths from './Routes';

const App = () => {
   const { theme } = useTheme();
   const client = new QueryClient();

   return (
      <ThemeProvider theme={theme}>
         <QueryClientProvider client={client}>
            <Layout>
               <RoutePaths />
            </Layout>
         </QueryClientProvider>
      </ThemeProvider>
   );
};

export default App;
