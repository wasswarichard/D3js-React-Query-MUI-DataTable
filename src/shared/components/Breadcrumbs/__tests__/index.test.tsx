import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import Breadcrumbs from '../index';

describe('Tests for Breadcrumbs component', () => {
   it('should successfully render the Breadcrumbs', async () => {
      const { getByText } = render(
         <Router>
            <Breadcrumbs data={[{ label: 'test', navigateTo: '/' }]} />,
         </Router>
      );

      expect(getByText('test')).toBeInTheDocument();
   });
});
