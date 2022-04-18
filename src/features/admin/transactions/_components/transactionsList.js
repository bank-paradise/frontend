import formatDate from "helpers/formatDate";
import { formatPrice } from "helpers/formatPrice";
import joinClasses from "helpers/joinClasses";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export default function TransactionsList({ list = [] }) {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 4;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(list.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(list.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, list]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % list.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <h4 className="text-md font-medium mt-5 mb-2 dark:text-white">
        Liste des transactions
      </h4>
      <ul className="w-full">
        {currentItems.length ? (
          currentItems
            .sort(function (a, b) {
              return new Date(b.created_at) - new Date(a.created_at);
            })
            .map((transaction) => (
              <li
                key={transaction.id}
                className={joinClasses(
                  "flex flex-col md:grid grid-cols-4 gap-5 px-5 py-3 justify-between dark:text-white",
                  "odd:bg-gray-100 odd:dark:bg-slate-700 even:bg-white  even:dark:bg-slate-600"
                )}
              >
                <p className="font-medium">
                  {formatDate(transaction.created_at)}
                </p>
                <div className="col-span-2">
                  <p className="font-medium flex gap-2 items-center">
                    <span className="text-red-500">
                      {transaction.transmitter}
                    </span>

                    <svg width="1em" height="1em" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="m12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8l-8-8z"
                      ></path>
                    </svg>
                    <span className="text-green-500">
                      {transaction.receiver}
                    </span>
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

      {list.length >= itemsPerPage && (
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
          pageRangeDisplayed={1}
          marginPagesDisplayed={1.3}
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
