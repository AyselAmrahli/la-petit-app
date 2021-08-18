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

const CardsContext = createContext({} as any);

const CardsProvider = ({ children }: IProps) => {
  const [cardsParams, setCardsParams] = useState<any>({
    cardId: "",
    cardAccount: "",
    currency: "",
    status: "",
  });

  return (
    <CardsContext.Provider value={{ setCardsParams, cardsParams }}>
      {children}
    </CardsContext.Provider>
  );
};

const useCardsParams = () => {
  return useContext(CardsContext);
};

export { CardsProvider, useCardsParams };
