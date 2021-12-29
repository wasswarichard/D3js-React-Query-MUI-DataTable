import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import classnames from 'classnames';
import { Breadcrumbs, Loader, ErrorMessage, TransactionCard } from 'shared/components';
import useCommonStyles from 'shared/theme/commonStyles';
import { useQuery } from 'react-query';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as api from '../../services/accountRequests';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { mergeAccountsToClients } from '../../shared/utils';
import { ITransaction, transactionCardProps } from '../../shared/types';

const TransactionList = () => {
   const commonClasses = useCommonStyles();
   const [clientId, setClientId] = useState('');
   const [mergedAccountsToClients, setMergedAccountsToClients] = useState<transactionCardProps[]>(
      []
   );
   const { isLoading, data, error } = useQuery('clients', api.getClients);
   const [accountTransactions, setAccountTransactions] = useState<transactionCardProps[]>([]);

   useEffect(() => {
      api.endPoint.get('/accounts').then((response: { data: ITransaction[] }) => {
         const result = mergeAccountsToClients(response.data, data);
         setMergedAccountsToClients(result);
         setAccountTransactions(result);
      });
   }, [data]);

   useEffect(() => {
      if (clientId.length > 0) {
         const clientTransactions = mergedAccountsToClients.filter(
            (client: { id: string }) => client.id === clientId
         );
         setAccountTransactions(clientTransactions);
      } else {
         setAccountTransactions(mergedAccountsToClients);
      }
   }, [clientId, mergedAccountsToClients]);

   if (isLoading || (!data && !error)) {
      return <Loader />;
   }

   if (error) {
      return <ErrorMessage />;
   }

   const breadcrumbs = [
      { label: 'Transactions', navigateTo: '/' },
      { label: 'Latest Transactions', navigateTo: '/' },
   ];

   const inputChangeHandler = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>,
      options?: any
   ) => {
      if (options) {
         setClientId(options.id);
      } else {
         setClientId('');
      }
   };

   return (
      <Grid
         container
         className={classnames([commonClasses.mainContainer, commonClasses.paddingTopBottom30])}
         spacing={2}
      >
         <Grid item xs={12}>
            <Breadcrumbs data={breadcrumbs} />
         </Grid>
         <Grid item xs={12}>
            <Grid item xs={4}>
               <Autocomplete
                  id="name"
                  options={data}
                  autoHighlight
                  getOptionLabel={(option: { firstname: string; name: string }) =>
                     `${option.firstname}, ${option.name}`
                  }
                  onChange={(event, value) => {
                     inputChangeHandler(event, value);
                  }}
                  renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
                     <TextField {...params} label="Name" />
                  )}
               />
            </Grid>
         </Grid>
         <Grid item xs={12}>
            {accountTransactions?.map((transaction: transactionCardProps) => {
               return <TransactionCard key={transaction.id} transaction={transaction} />;
            })}
         </Grid>
      </Grid>
   );
};

export default TransactionList;
