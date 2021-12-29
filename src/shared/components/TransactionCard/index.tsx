import { Grid, Typography } from '@material-ui/core';
import Card from '@mui/material/Card';
import React, { useEffect, useState } from 'react';
import { BarChart, PieChart, CheckBoxGroup } from '../index';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import ReplayIcon from '@mui/icons-material/Replay';
import { ITransaction, transactionCardProps } from '../../types';
import { formatPieChartData, pieChartSelectedData } from '../../utils';

const TransactionCard = ({ transaction }: { transaction: transactionCardProps }) => {
   const [selectedCardType, setSelectedCardType] = useState<string[]>([]);
   const [accountTransaction, setAccountTransactions] = useState<transactionCardProps>(transaction);
   const [selectedPieChartArea, setSelectedPieChartArea] = useState<string>('');

   useEffect(() => {
      if (selectedCardType.length > 0) {
         const selectedAccounts = transaction.accounts.filter((account: ITransaction) =>
            selectedCardType.some((card: string) => account.card_type === card)
         );
         setAccountTransactions({ ...transaction, accounts: selectedAccounts });
      } else {
         setAccountTransactions(transaction);
      }
   }, [selectedCardType, transaction]);

   useEffect(() => {
      if (selectedPieChartArea.length > 0) {
         const selectedPieChartData = pieChartSelectedData(selectedPieChartArea, transaction);
         setAccountTransactions(selectedPieChartData);
      }
   }, [selectedPieChartArea, transaction]);

   return (
      <Card style={{ marginBottom: 30, backgroundColor: '#fffffb', borderRadius: '10px' }}>
         <Grid container>
            <Grid item xs={3} container spacing={0}>
               <Grid item xs={12}>
                  <Typography style={{ marginTop: '20px', marginLeft: '10px', fontWeight: 'bold' }}>
                     Client ID {transaction.id}
                  </Typography>
                  <Grid style={{ marginTop: '20px', marginLeft: '30px' }}>
                     <Typography style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                        Information
                     </Typography>
                     <Grid style={{ marginTop: '10px' }}>
                        <Typography style={{ fontWeight: 'bold' }}>Date of Birth:</Typography>
                        <Typography>
                           {transaction.birthday === 'Invalid Date' ? 'None' : transaction.birthday}
                        </Typography>
                     </Grid>
                     <Grid style={{ marginTop: '10px' }}>
                        <Typography style={{ fontWeight: 'bold' }}>First Name:</Typography>
                        <Typography>{transaction.firstName || transaction.firstname}</Typography>
                     </Grid>
                     <Grid style={{ marginTop: '10px' }}>
                        <Typography style={{ fontWeight: 'bold' }}>Last Name:</Typography>
                        <Typography>{transaction.name}</Typography>
                     </Grid>
                  </Grid>
               </Grid>
            </Grid>

            <Grid item xs={3}>
               <PieChart
                  data={formatPieChartData(transaction.accounts)}
                  setSelectedPieChartArea={setSelectedPieChartArea}
               />
            </Grid>

            <Grid item xs={6} container spacing={0}>
               <Grid item xs={12} container justifyContent="center">
                  <Link
                     to={`/transaction/${transaction.id}`}
                     style={{ textDecoration: 'none', marginRight: '20px' }}
                  >
                     <Button variant="contained" endIcon={<ViewColumnIcon />}>
                        {' '}
                        More{' '}
                     </Button>
                  </Link>
                  <Button
                     variant="contained"
                     endIcon={<ReplayIcon />}
                     onClick={() => {
                        setSelectedCardType([]);
                     }}
                  >
                     Reset
                  </Button>
               </Grid>
               <Grid item xs={12} container justifyContent="center">
                  <CheckBoxGroup
                     selectedCardType={selectedCardType}
                     setSelectedCardType={setSelectedCardType}
                  />
               </Grid>
               <Grid item xs={12} container justifyContent="center">
                  <BarChart
                     svgProps={{
                        margin: { top: 60, bottom: 50, left: 50, right: 20 },
                        width: 400,
                        height: 200,
                     }}
                     axisProps={{
                        xLabel: 'Balance',
                        yLabel: 'Account',
                     }}
                     data={accountTransaction.accounts || []}
                     strokeWidth={4}
                  />
               </Grid>
            </Grid>
         </Grid>
      </Card>
   );
};

export default TransactionCard;
