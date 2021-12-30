import axios from 'axios';

export const endPoint = axios.create({
   baseURL: process.env.REACT_APP_ENDPOINT,
});

export const getClients = () => {
   return endPoint.get('/clients').then((response: { data: any }) => response.data);
};

export const getAccounts = () => {
   return endPoint.get('/accounts').then((response: { data: any }) => response.data);
};

export const getAccount = (id: string) => {
   return endPoint.get(`/accounts?client=${id}`).then((res: { data: any }) => res.data);
};

export const postAccount = (account: any) => {
   return endPoint.post('/account', account).then((res) => res.data);
};
