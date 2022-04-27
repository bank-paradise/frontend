import { LineButton } from "components/atoms";
import { formatPrice } from "helpers/formatPrice";
import BankTitle from "./bankTitle";
import Contact from "./contact";
import { useNavigate } from "react-router-dom";

export default function BankHeader({
  accounts,
  currency = "EUR",
  transactions = [],
  username = "",
}) {
  let navigate = useNavigate();

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
          className="bg-primary text-white mt-4 px-5 py-5 rounded-lg "
          id="balande-account-container"
        >
          <p className="text-md">Total:</p>
          <h3 className="text-[30px] font-bold mb-3">
            {formatPrice(getBalanceTotal(), currency)}
          </h3>
          <div className="w-[100px] h-[1px] bg-white mb-3" />
          {accounts.map(({ id, name, balance, type }) => {
            return type === "personnal" ? (
              <p className="font-light text-md mt-1" key={id}>
                {formatPrice(balance, currency)} - {name}
              </p>
            ) : (
              <button
                className="font-light text-md mt-1 hover:font-medium"
                key={id}
                onClick={() => navigate(`/entreprises/${id}`)}
              >
                {formatPrice(balance, currency)} - {name}
              </button>
            );
          })}
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
