import { render } from '@testing-library/react';
import Selectors from 'shared/testUtils/selectors';
import Layout from '../index';

describe('Tests for Layout component', () => {
   it('should successfully render the Layout component', async () => {
      const { getByTestId } = render(
         <Layout>
            <div data-testid="layout-child">Latest Transactions</div>
         </Layout>
      );

      expect(getByTestId(Selectors.COMPANY_LOGO)).toHaveTextContent('CluePoints');
      expect(getByTestId(Selectors.LAYOUT_CHILD)).toHaveTextContent('Latest Transactions');
   });
});
