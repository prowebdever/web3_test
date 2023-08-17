import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { AccountType, AccountInfoType, ContactType } from "../utils/types";
import { useGetAccountBalance, useGetAccountTransactions } from "../hooks/useChainInfo";
import { clearValue, getValue } from '../utils/LocalStorage';

interface AppDataContext {
  accounts: AccountType[];
  setAccounts: React.Dispatch<React.SetStateAction<AccountType[]>>;
  contacts: ContactType[];
  setContacts: React.Dispatch<React.SetStateAction<ContactType[]>>;
  accountInfos: AccountInfoType[];
  setAccountInfos: React.Dispatch<React.SetStateAction<AccountInfoType[]>>;
};

const initialAppData: AppDataContext = {
  accounts: [],
  setAccounts: () => {},
  contacts: [],
  setContacts: () => {},
  accountInfos: [],
  setAccountInfos: () => {},
};

export const AppContext = createContext<AppDataContext>(initialAppData);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

const AppProvider = ({ children }) => {
  const [accounts, setAccounts] = useState<AccountType[]>([]);
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [accountInfos, setAccountInfos] = useState<AccountInfoType[]>([]);

  useEffect(()=>{
    const getWallet = async () =>{
      // clearValue("polkadot-wallet");
      let _accounts = await getValue("polkadot-wallet");
      setAccounts(_accounts);

      let _contacts = await getValue("polkadot-contacts");
      setContacts(_contacts);
    }

    getWallet();

  }, [])

  useEffect(() => {
    const getAccountInfos = async () => {
      const accInfos = await Promise.all(
        accounts?.map(async (acc) => {
          return {
            account: acc,
            balance: await useGetAccountBalance(acc.address),
            transactions: await useGetAccountTransactions(acc.address)
          };
        })
      );

      setAccountInfos(accInfos);
    };

    // Set up a timer to fetch the account balance periodically
    const balanceTimer = setInterval(getAccountInfos, 5000);

    // Clear the timer when the component unmounts or accountInfos changes
    return () => clearInterval(balanceTimer);
  }, [accounts]);

  return (
    <AppContext.Provider value={{ accounts, setAccounts, contacts, setContacts, accountInfos, setAccountInfos }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
