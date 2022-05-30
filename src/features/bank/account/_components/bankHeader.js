import { LineButton } from "components/atoms";
import { formatPrice } from "helpers/formatPrice";
import BankTitle from "./bankTitle";
import Contact from "./contact";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  bankPersonalAccount,
  bankProfessionalAccounts,
} from "features/bank/bank.model";

export default function BankHeader({
  accounts,
  currency = "EUR",
  transactions = [],
  username = "",
}) {
  let navigate = useNavigate();

  const cashAccount = accounts.find((account) => account.type === "cash");
  const personnalAccount = useSelector(bankPersonalAccount);
  const entreprisesAccount = useSelector(bankProfessionalAccounts);

  const getBalanceTotal = () => {
    return accounts.reduce((acc, account) => acc + account.balance, 0);
  };

  // fonction qui recup les 6 derniers transmitters
  const getLastTransmitters = () => {
    const contacts = transactions
      .filter(
        (transaction) =>
          transaction.receiver &&
          transaction.receiver.name !== username &&
          transaction.receiver.user_id !== null
      )
      .slice(0, 6)
      .map((transaction) => transaction.receiver);

    const ids = contacts.map((o) => o.id);
    const filtered = contacts.filter(
      ({ id }, index) => !ids.includes(id, index + 1)
    );

    return filtered;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
      <div className="w-full md:max-w-[350px]">
        <BankTitle>Soldes</BankTitle>
        <div
          className="bg-primary text-white mt-4 px-5 py-5 rounded-lg"
          id="balande-account-container"
        >
          <div>
            <h3 className="text-[30px] font-bold">
              {personnalAccount &&
                formatPrice(personnalAccount.balance, currency)}
            </h3>
            <p className="-mt-2 mb-5 text-lg">
              {cashAccount && formatPrice(cashAccount.balance, currency)}
            </p>
          </div>
          <div className="w-[100px] h-[1px] bg-white mb-3" />
          {entreprisesAccount &&
            entreprisesAccount.map(({ id, name, balance }) => (
              <button
                className="font-light text-md mt-1 hover:font-medium w-full text-left"
                key={id}
                onClick={() => navigate(`/entreprises/${id}`)}
              >
                {formatPrice(balance, currency)} - {name}
              </button>
            ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full bg-gray-100 px-10 py-5 gap-16 rounded-lg dark:bg-slate-700 dark:text-white">
        <div className="w-full flex flex-col" id="payment-account-container">
          <BankTitle className="mb-5">Actions Rapides</BankTitle>
          <div className="flex flex-col gap-5 justify-center">
            <LineButton
              className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white py-3"
              onClick={() => navigate("/payment/personnal")}
            >
              Envoyer de l'argent
            </LineButton>
            <LineButton
              className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white py-3"
              onClick={() => navigate("/payment/professional")}
            >
              Payer un bien ou un service
            </LineButton>
            <hr />
            <LineButton
              className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white py-3 flex items-center gap-2 justify-center"
              onClick={() => navigate("/salary/add")}
            >
              <svg width="1.4em" height="1.4em" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M11 18h2v-1h1q.425 0 .713-.288Q15 16.425 15 16v-3q0-.425-.287-.713Q14.425 12 14 12h-3v-1h4V9h-2V8h-2v1h-1q-.425 0-.712.287Q9 9.575 9 10v3q0 .425.288.712Q9.575 14 10 14h3v1H9v2h2Zm7 4H6q-.825 0-1.412-.587Q4 20.825 4 20V4q0-.825.588-1.413Q5.175 2 6 2h8l6 6v12q0 .825-.587 1.413Q18.825 22 18 22Zm0-2V8.85L13.15 4H6v16ZM6 20V4v16Z"
                ></path>
              </svg>
              Demande de salaire
            </LineButton>
          </div>
        </div>
        <div className="w-full">
          <BankTitle className="mb-5">Renvoyer</BankTitle>
          {getLastTransmitters().length ? (
            <div className="grid grid-cols-3 gap-3 justify-center">
              {getLastTransmitters().map((receiver, index) => (
                <Contact key={index} receiver={receiver} />
              ))}
            </div>
          ) : (
            <p className="w-full text-center text-sm">Aucun contact</p>
          )}
        </div>
      </div>
    </div>
  );
}
