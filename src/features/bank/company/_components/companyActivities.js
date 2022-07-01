import BankTitle from "features/bank/account/_components/bankTitle";
import { bankTransactions } from "features/bank/bank.model";
import { communityInfo } from "features/community/community.model";
import { formatPrice } from "helpers/formatPrice";
import getUsername from "helpers/getUsername";
import joinClasses from "helpers/joinClasses";
import moment from "moment";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

export default function CompanyActivities({ rib = "" }) {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 6;

  const transactions = useSelector(bankTransactions);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    let sortedTransactions = transactions.slice().filter((transaction) => {
      return (
        transaction.transaction.transmitter === rib ||
        transaction.transaction.receiver === rib
      );
    });

    sortedTransactions = sortedTransactions.sort((a, b) => {
      return moment(a.created_at).isAfter(b.created_at) ? -1 : 1;
    });

    setCurrentItems(sortedTransactions.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(transactions.length / itemsPerPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemOffset, itemsPerPage, transactions]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % transactions.length;
    setItemOffset(newOffset);
  };

  const community = useSelector(communityInfo);

  if (!community) return null;

  const transactionType = (transaction) => {
    if (!transaction) return;
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
          <div className="ol-span-1 col-span-2">
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
    } else if (!transaction.receiver) {
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
            <p className="uppercase flex items-center gap-1">
              <span className="text-red-500">
                {transaction.transmitter.name}
              </span>
              <svg width="1em" height="1em" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="m12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8l-8-8z"
                ></path>
              </svg>
              <span className="text-green-500">{community.name}</span>
            </p>
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
    } else if (transaction.receiver.rib === rib) {
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
    } else if (transaction.transmitter.rib === rib) {
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
            <p className="uppercase flex items-center gap-1">
              <span className="text-red-500">
                {transaction.transmitter.name}
              </span>
              <svg width="1em" height="1em" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="m12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8l-8-8z"
                ></path>
              </svg>
              <span className="text-green-500">
                {getUsername(transaction.receiver.name)}
              </span>
            </p>
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
      <BankTitle>Activités Récentes</BankTitle>
      <ul className="w-full mt-5">
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
