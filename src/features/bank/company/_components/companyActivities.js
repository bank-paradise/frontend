import BankTitle from "features/bank/account/_components/bankTitle";
import { communityInfo } from "features/community/community.model";
import { formatPrice } from "helpers/formatPrice";
import joinClasses from "helpers/joinClasses";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

export default function CompanyActivities({ rib = "" }) {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 6;

  const transactions = useSelector((state) => {
    console.log(state.bank.transactions);
    return state.bank.transactions.filter((transaction) => {
      return (
        transaction.transaction.transmitter === rib ||
        transaction.transaction.receiver === rib
      );
    });
  });

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    const sortedTransactions = transactions
      .sort((a, b) => {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      })
      .reverse();

    setCurrentItems(sortedTransactions.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(transactions.length / itemsPerPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemOffset, itemsPerPage, transactions]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % transactions.length;
    setItemOffset(newOffset);
  };

  const community = useSelector(communityInfo);

  const transactionType = (transaction, position) => {
    if (!transaction) return;
    const formatedDate = new Date(transaction.created_at);
    const date = `${formatedDate.getDate()}/${
      formatedDate.getMonth() + 1
    }/${formatedDate.getFullYear()}`;

    if (!transaction.transmitter) {
      return (
        <li
          className={joinClasses(
            "grid grid-cols-3 md:grid-cols-4 gap-5 text-sm dark:text-white px-5 py-4",
            position
              ? "bg-white  dark:bg-slate-600"
              : "bg-gray-100  dark:bg-slate-700"
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
    } else if (transaction.receiver.rib === rib) {
      return (
        <li
          className={joinClasses(
            "grid grid-cols-3 md:grid-cols-4 gap-5 text-sm dark:text-white px-5 py-4",
            position
              ? "bg-white  dark:bg-slate-600"
              : "bg-gray-100  dark:bg-slate-700"
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
            position
              ? "bg-white  dark:bg-slate-600"
              : "bg-gray-100  dark:bg-slate-700"
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
    } else {
      return <p>unknown</p>;
    }
  };

  return (
    <div className="w-full">
      <BankTitle>Activités Récentes</BankTitle>
      <ul className="w-full mt-5">
        {currentItems.map((transaction, index) =>
          transactionType(transaction, index % 2)
        )}
      </ul>
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
    </div>
  );
}
