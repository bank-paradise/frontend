import {
  Input,
  InputIcon,
  LineButton,
  Paragraph,
  Search,
  SubTitle,
} from "components/atoms";
import { Modal } from "components/molecules";
import { communityAccounts } from "features/community/community.model";
import { formatPrice } from "helpers/formatPrice";
import { useState } from "react";
import { useSelector } from "react-redux";
import BankTitle from "./bankTitle";
import Contact from "./contact";
import { PersoTransactions } from "./personnalTransactions";

export default function BankHeader({ accounts, currency = "EUR" }) {
  const [isOpenPersoTransac, setIsOpenPersoTransac] = useState(false);

  const getBalanceTotal = () => {
    return accounts.reduce((acc, account) => acc + account.balance, 0);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
      <div className="w-full md:max-w-[350px]">
        <BankTitle>Soldes</BankTitle>
        <div className="bg-primary text-white mt-4 px-5 py-5 rounded-lg ">
          <p className="text-md">Total:</p>
          <h3 className="text-[30px] font-bold mb-3">
            {formatPrice(getBalanceTotal(), currency)}
          </h3>
          <div className="w-[100px] h-[1px] bg-white mb-3" />
          {accounts.map(({ id, name, balance }) => (
            <p className="font-light text-md mt-1" key={id}>
              {formatPrice(balance, currency)} - {name}
            </p>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full bg-gray-100 px-10 py-5 gap-16 rounded-lg">
        <div className="w-full flex flex-col">
          <BankTitle className="mb-5">Actions Rapides</BankTitle>
          <div className="flex flex-col gap-5 justify-center">
            <LineButton
              className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white py-3"
              onClick={() => setIsOpenPersoTransac(true)}
            >
              Envoyer de l'argent
            </LineButton>
            <LineButton className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white py-3">
              Payer un bien ou un service
            </LineButton>
          </div>
        </div>
        <div className="w-full">
          <BankTitle className="mb-5">Renvoyer</BankTitle>
          <div className="grid grid-cols-3 gap-3 justify-center">
            <Contact name="albert" />
            <Contact name="albert" />
            <Contact name="albert" />
            <Contact name="albert" />
            <Contact name="albert" />
            <Contact name="albert" />
          </div>
        </div>
      </div>
      {isOpenPersoTransac && (
        <PersoTransactions
          setIsOpen={setIsOpenPersoTransac}
          isOpen={isOpenPersoTransac}
        />
      )}
    </div>
  );
}
