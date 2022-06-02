import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TransactionDetails from './pages/TransactionDetails';
import { PageNotFound } from './shared/components';
import TransactionCard from './pages/TransactionList';

const RoutePaths = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/transaction/:id/:name" element={<TransactionDetails />} />
            <Route path="/" element={<TransactionCard />} />
            <Route path="*" element={<PageNotFound />} />
         </Routes>
      </BrowserRouter>
   );
};

export default RoutePaths;
