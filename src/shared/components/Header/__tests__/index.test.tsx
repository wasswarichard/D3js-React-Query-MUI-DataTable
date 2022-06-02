import { render } from '@testing-library/react';
import Selectors from 'shared/testUtils/selectors';
import Header from '../index';

describe('Tests for Header component', () => {
   it('should successfully render the Header', async () => {
      const { getByTestId } = render(<Header />);
      expect(getByTestId(Selectors.COMPANY_LOGO)).toHaveTextContent('D3js');
   });
});
