import React, {
  createContext,
  ReactNode,
  ReactNodeArray,
  useContext,
  useState,
} from "react";

interface IProps {
  children: ReactNode | ReactNodeArray;
}

const TransactionContext = createContext({} as any);

const TransactionsProvider = ({ children }: IProps) => {
  const [transactionsParams, setTransactionsParams] = useState<any>({
    transactionID: "",
    cardId: "",
    amount: "",
    currency: "",
  });

  return (
    <TransactionContext.Provider
      value={{ setTransactionsParams, transactionsParams }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

const useTransactionsParams = () => {
  return useContext(TransactionContext);
};

export { TransactionsProvider, useTransactionsParams };
