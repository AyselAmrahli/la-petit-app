import { ECurrency, EStatus } from "./enum";

export interface IMerchantInfo {
  name: string;
  category: string;
}

export interface ITransactions {
  transactionID: number;
  cardAccount: number;
  cardId: number;
  amount: number;
  currency: ECurrency;
  transactionDate: string;
  merchantInfo: IMerchantInfo;
}

export interface ICards {
  cardId: number;
  cardAccount: number;
  maskedCardNumber: string;
  expireDate: string;
  currency: ECurrency;
  status: EStatus;
  balance: number;
}
