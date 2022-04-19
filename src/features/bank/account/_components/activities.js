import { userData } from "features/authentication/user.model";
import {
  bankPersonalAccount,
  bankTransactions,
} from "features/bank/bank.model";
import { communityInfo } from "features/community/community.model";
import { formatPrice } from "helpers/formatPrice";
import joinClasses from "helpers/joinClasses";
import moment from "moment";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

export default function Activities() {
  const transactions = useSelector(bankTransactions);
  const personnalAccount = useSelector(bankPersonalAccount);
  const user = useSelector(userData);
  const community = useSelector(communityInfo);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 6;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    let sortedTransactions = transactions.slice();

    sortedTransactions = sortedTransactions.sort((a, b) => {
      return moment(a.created_at).isAfter(b.created_at) ? -1 : 1;
    });

    setCurrentItems(sortedTransactions.slice(itemOffset, endOffset));

    setPageCount(Math.ceil(sortedTransactions.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, transactions]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % transactions.length;
    setItemOffset(newOffset);
  };

  const transactionType = (transaction) => {
    const date = moment(transaction.created_at).format("DD/MM/YYYY HH:mm");

    if (!transaction.transmitter) {
      return (
        <li
          className={joinClasses(
            "grid grid-cols-3 md:grid-cols-4 gap-5 text-sm dark:text-white px-5 py-4",
            "odd:bg-gray-100 odd:dark:bg-slate-700 even:bg-white  even:dark:bg-slate-600"
          )}
          key={transaction.id}
        >
          <p>{date}</p>
          <div className="col-span-2">
            <p className="uppercase">{community.name}</p>
            <p className="text-xs">
              <span className="text-green-500">Argent Reçu</span>
              {transaction.description.length
                ? ` - ${transaction.description}`
                : ""}
            </p>
          </div>
          <p className="text-right text-green-500">
            +{formatPrice(transaction.amount, community.currency)}
          </p>
        </li>
      );
    } else if (transaction.receiver.rib === personnalAccount.rib) {
      return (
        <li
          className={joinClasses(
            "grid grid-cols-3 md:grid-cols-4 gap-5 text-sm dark:text-white px-5 py-4",
            "odd:bg-gray-100 odd:dark:bg-slate-700 even:bg-white  even:dark:bg-slate-600"
          )}
          key={transaction.id}
        >
          <p>{date}</p>
          <div className="col-span-2">
            <p className="uppercase">{transaction.transmitter.name}</p>
            <p className="text-xs">
              <span className="text-green-500">Argent Reçu</span>
              {transaction.description.length
                ? ` - ${transaction.description}`
                : ""}
            </p>
          </div>
          <p className="text-right text-green-500">
            +{formatPrice(transaction.amount, community.currency)}
          </p>
        </li>
      );
    } else if (transaction.transmitter.rib === personnalAccount.rib) {
      return (
        <li
          className={joinClasses(
            "grid grid-cols-3 md:grid-cols-4 gap-5 text-sm dark:text-white px-5 py-4",
            "odd:bg-gray-100 odd:dark:bg-slate-700 even:bg-white  even:dark:bg-slate-600"
          )}
          key={transaction.id}
        >
          <p>{date}</p>
          <div className="col-span-1 md:col-span-2">
            <p className="uppercase">Moi</p>
            <p className="text-xs">
              <span className="text-red-500">Payement</span>
              {transaction.description.length
                ? ` - ${transaction.description}`
                : ""}
            </p>
          </div>
          <p className="text-right text-red-500">
            -{formatPrice(transaction.amount, community.currency)}
          </p>
        </li>
      );
    }
  };

  return (
    <div className="w-full">
      <ul className="w-full">
        {currentItems.map((transaction) => transactionType(transaction))}
      </ul>
      {transactions.length >= itemsPerPage && (
        <ReactPaginate
          breakLabel="..."
          nextLabel={
            <svg width="1.3em" height="1.3em" viewBox="0 0 20 20">
              <path
                fill="currentColor"
                d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z"
              ></path>
            </svg>
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel={
            <svg width="1.3em" height="1.3em" viewBox="0 0 20 20">
              <path
                fill="currentColor"
                d="m4 10l9 9l1.4-1.5L7 10l7.4-7.5L13 1z"
              ></path>
            </svg>
          }
          previousClassName="text-primary hover:scale-110"
          nextClassName="text-primary hover:scale-110"
          renderOnZeroPageCount={null}
          containerClassName="flex justify-start items-center text-md md:text-sm gap-2 mt-5"
          activeLinkClassName="bg-primary !text-white"
          pageLinkClassName="px-4 py-2 text-gray-600 hover:bg-primary hover:text-white rounded-md"
        />
      )}
    </div>
  );
}
