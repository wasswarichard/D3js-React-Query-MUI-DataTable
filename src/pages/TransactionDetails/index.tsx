import { useParams } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import classnames from 'classnames';
import { Breadcrumbs, Loader, DataTable, ErrorMessage } from 'shared/components';
import { ColumnConfig, ITransaction } from 'shared/types';
import useCommonStyles from 'shared/theme/commonStyles';
import { useQuery } from 'react-query';
import * as api from '../../api/accounts';
import { SetStateAction, useEffect, useState } from 'react';
import { formatTableData } from '../../shared/utils';

interface RouteParams {
   id: string;
}

const TransactionDetails = () => {
   const commonClasses = useCommonStyles();
   const { id } = useParams<RouteParams>();
   const { isLoading, data, error } = useQuery(['todos', id], () => api.getAccount(id));
   const [formattedTransactions, setFormattedTransactions] = useState<ITransaction[]>([]);

   useEffect(() => {
      const formattedTableData: SetStateAction<ITransaction[]> = [];
      if (data) {
         const response = formatTableData(data);
         setFormattedTransactions(response);
      } else {
         setFormattedTransactions(formattedTableData);
      }
   }, [data]);

   if (isLoading || (!data && !error)) {
      return <Loader />;
   }

   if (error) {
      return <ErrorMessage />;
   }

   const breadcrumbs = [
      { label: 'Explorer', navigateTo: '/' },
      { label: 'Latest Transactions', navigateTo: '/' },
      { label: `${id}`, navigateTo: `/transaction/${id}` },
   ];

   const columns: ColumnConfig[] = [
      {
         name: 'id',
         label: 'Id',
      },
      {
         name: 'number',
         label: 'Account',
      },
      {
         name: 'card_type',
         label: 'Card Type',
      },
      {
         name: 'balance',
         label: 'Balance',
      },
      {
         name: 'created',
         label: 'Created',
      },
   ];

   const dataTableTitle = <Typography variant="h5">Account Transactions</Typography>;

   return (
      <Grid
         container
         className={classnames([commonClasses.mainContainer, commonClasses.paddingTopBottom30])}
      >
         <Grid item xs={12}>
            <Breadcrumbs data={breadcrumbs} />
         </Grid>
         <Grid item xs={12}>
            <DataTable
               columns={columns}
               keyColumn="id"
               title={dataTableTitle}
               data={formattedTransactions}
            />
         </Grid>
      </Grid>
   );
};

export default TransactionDetails;
