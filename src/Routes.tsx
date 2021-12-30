import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TransactionDetails from './pages/TransactionDetails';
import { PageNotFound } from './shared/components';
import TransactionCard from './pages/TransactionList';

const Routes = () => {
   return (
      <Router>
         <Switch>
            <Route path="/transaction/:id/:name">
               <TransactionDetails />
            </Route>
            <Route path="/" exact>
               <TransactionCard />
            </Route>
            <Route path="*">
               <PageNotFound />
            </Route>
         </Switch>
      </Router>
   );
};

export default Routes;
