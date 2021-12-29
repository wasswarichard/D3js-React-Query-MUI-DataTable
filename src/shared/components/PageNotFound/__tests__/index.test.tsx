import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PageNotFound from '../index';

describe('Tests for PageNotFound component', () => {
   it('should successfully render the PageNotFound component', async () => {
      const { getByText } = render(
         <Router>
            <PageNotFound />
         </Router>
      );

      expect(getByText('Page not found')).toBeInTheDocument();
   });
});
