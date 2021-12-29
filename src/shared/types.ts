export interface IClient {
   address: string;
   birthday: string;
   created: string;
   firstName: string;
   firstname?: string;
   id: string;
   name: string;
}

export interface ITransaction {
   balance: string;
   card_type: string;
   created: string;
   id: string;
   number: number;
   label: string;
   value: number;
}

export interface transactionCardProps extends IClient {
   accounts: any;
}

export interface clientDetails extends IClient {
   accounts: string[];
}

export interface ColumnConfig {
   name: string;
   label: string;
}
