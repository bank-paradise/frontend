import formatDate from "helpers/formatDate";
import { formatPrice } from "helpers/formatPrice";
import joinClasses from "helpers/joinClasses";

export default function TransactionsList({ list = [] }) {
  return (
    <div>
      <h4 className="text-md font-medium mt-5 mb-2">Liste des transactions</h4>
      <ul className="w-full">
        {list.length ? (
          list
            .sort(function (a, b) {
              return new Date(b.created_at) - new Date(a.created_at);
            })
            .map((transaction, index) => (
              <li
                key={transaction.id}
                className={joinClasses(
                  "flex flex-col md:grid grid-cols-4 gap-5 px-5 py-3 justify-between",
                  index % 2 ? "bg-white" : "bg-gray-100"
                )}
              >
                <p className="font-medium">
                  {formatDate(transaction.created_at)}
                </p>
                <div className="col-span-2">
                  <p className="font-medium flex gap-2 items-center">
                    {transaction.transmitter}

                    <svg width="1em" height="1em" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="m12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8l-8-8z"
                      ></path>
                    </svg>
                    {transaction.receiver}
                  </p>
                  <p className="text-sm">{transaction.description}</p>
                </div>

                <p className="text-right text-green-500">
                  {formatPrice(transaction.amount, transaction.currency)}
                </p>
              </li>
            ))
        ) : (
          <p className="text-center text-sm font-medium py-5 ">
            Aucune transaction
          </p>
        )}
      </ul>
    </div>
  );
}
