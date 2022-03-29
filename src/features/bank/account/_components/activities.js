import { userData } from "features/authentication/user.model";
import { bankTransactions } from "features/bank/bank.model";
import { communityInfo } from "features/community/community.model";
import { useSelector } from "react-redux";

export default function Activities() {
  const transactions = useSelector(bankTransactions);
  const user = useSelector(userData);
  const community = useSelector(communityInfo);

  const transactionType = (transaction) => {
    const formatedDate = new Date(transaction.created_at);
    const date = `${formatedDate.getDate()}/${
      formatedDate.getMonth() + 1
    }/${formatedDate.getFullYear()}`;

    if (!transaction.transmitter) {
      return (
        <li
          className="grid grid-cols-4 gap-5 text-sm bg-gray-100 px-5 py-4"
          key={transaction.id}
        >
          <p>{date}</p>
          <div className="col-span-2">
            <p className="uppercase">{community.name}</p>
            <p className="text-xs">
              <span className="text-green-500">Argent Reçu</span> -{" "}
              {transaction.description}
            </p>
          </div>
          <p className="text-right text-green-500">
            +{transaction.amount} {community.currency}
          </p>
        </li>
      );
    } else if (transaction.transmitter.user_id === user.id) {
      return (
        <li
          className="grid grid-cols-4 gap-5 text-sm bg-gray-100 px-5 py-4"
          key={transaction.id}
        >
          <p>{date}</p>
          <div className="col-span-2">
            <p className="uppercase">Moi</p>
            <p className="text-xs">
              <span className="text-red-500">Payement</span> -{" "}
              {transaction.description}
            </p>
          </div>
          <p className="text-right text-red-500">
            -{transaction.amount} {community.currency}
          </p>
        </li>
      );
    } else if (transaction.receiver.user_id === user.id) {
      return (
        <li
          className="grid grid-cols-4 gap-5 text-sm bg-gray-100 px-5 py-4"
          key={transaction.id}
        >
          <p>{date}</p>
          <div className="col-span-2">
            <p className="uppercase">{transaction.transmitter.name}</p>
            <p className="text-xs">
              <span className="text-green-500">Argent Reçu</span> -{" "}
              {transaction.description}
            </p>
          </div>
          <p className="text-right text-green-500">
            +{transaction.amount} {community.currency}
          </p>
        </li>
      );
    } else {
      return <p>unknown</p>;
    }
  };

  return (
    <ul className="w-full">
      {transactions
        .slice(0)
        .reverse()
        .map((transaction, index) => index < 6 && transactionType(transaction))}
    </ul>
  );
}
