import { clientDetails, ITransaction, transactionCardProps } from '../types';

export const msToTime = (timeInMs: number) => {
   let seconds: number | string = Math.floor((timeInMs / 1000) % 60);
   let minutes: number | string = Math.floor((timeInMs / (1000 * 60)) % 60);
   let hours: number | string = Math.floor((timeInMs / (1000 * 60 * 60)) % 24);

   hours = hours < 10 ? '0' + hours : hours;
   minutes = minutes < 10 ? '0' + minutes : minutes;
   seconds = seconds < 10 ? '0' + seconds : seconds;

   return hours + ':' + minutes + ':' + seconds;
};

export const mergeAccountsToClients = (accounts: ITransaction[], clients: clientDetails[]) => {
   const mergedAccountsToClients = clients?.map((client: clientDetails) => {
      return {
         ...client,
         birthday: new Date(client.birthday).toLocaleString(),
         accounts: client.accounts?.map((clientAccount: string) => {
            return accounts.find((account: ITransaction) => account.id === clientAccount);
         }),
      };
   });
   return mergedAccountsToClients?.map((client: transactionCardProps) => {
      return {
         ...client,
         accounts: client.accounts?.map((account: ITransaction) => {
            return {
               ...account,
               card_type: account.card_type.replace(/\s/g, '').toUpperCase(),
               label: account.number,
               value: account.balance,
            };
         }),
      };
   });
};

export const formatTableData = (data: ITransaction[]) => {
   return data.map((transaction: ITransaction) => {
      return {
         ...transaction,
         created: new Date(transaction.created).toLocaleString(),
      };
   });
};

export const formatPieChartData = (accounts: ITransaction[]) => {
   let pieChartData = [
      { label: '>= 0', value: 0 },
      { label: '< 0', value: 0 },
   ];
   accounts.forEach((account: any) => {
      if (account.value > 0 || account.value === 0) {
         pieChartData[0].value = pieChartData[0].value + account.value;
      } else {
         pieChartData[1].value = pieChartData[1].value + Math.abs(account.value);
      }
   });

   return pieChartData;
};

export const pieChartSelectedData = (selectedPieChartArea: string, data: transactionCardProps) => {
   if (selectedPieChartArea === '>= 0') {
      const filteredAccounts = data.accounts.filter(
         (account: { balance: number }) => account.balance >= 0
      );
      return {
         ...data,
         accounts: filteredAccounts,
      };
   } else {
      const filteredAccounts = data.accounts.filter(
         (account: { balance: number }) => account.balance < 0
      );
      return {
         ...data,
         accounts: filteredAccounts,
      };
   }
};
