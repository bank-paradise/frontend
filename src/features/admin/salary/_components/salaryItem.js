import { formatPrice } from "helpers/formatPrice";
import moment from "moment";
import { useState } from "react";

export default function SalaryItem({ item, currency, callback }) {
  const [unfold, setUnfold] = useState(false);

  const handleAwnser = (e, accepted) => {
    e.preventDefault();
    callback({ accepted, id: item.salary.id });
  };

  return (
    <li className=" my-5 rounded-lg shadow-lg p-5 transition-all dark:bg-slate-700">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs text-primary">
            {moment(item.salary.created_at).format("DD/MM/YYYY HH:mm")}
          </p>
          <p className="font-medium text-gray-600 dark:text-gray-400">
            {item.bank_account.name}
          </p>
          <p className="text-green-500 font-medium text-sm">
            {formatPrice(item.salary.salary, currency)}
          </p>
          <button
            className="text-xs underline flex items-center mt-3 transition-all dark:text-white"
            onClick={() => setUnfold(!unfold)}
          >
            {unfold ? "masquer" : "voir plus"}
            <svg
              width="1.6em"
              height="1.6em"
              viewBox="0 0 24 24"
              className={unfold ? "rotate-180" : "rotate-0"}
            >
              <path
                fill="currentColor"
                d="m11.3 14.3l-2.6-2.6q-.475-.475-.212-1.087Q8.75 10 9.425 10h5.15q.675 0 .937.613q.263.612-.212 1.087l-2.6 2.6q-.15.15-.325.225q-.175.075-.375.075t-.375-.075q-.175-.075-.325-.225Z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="">
          {item.salary.status === "waiting" ? (
            <div className="flex gap-5">
              <button
                className="rounded-full  bg-gray-200 hover:bg-red-500 text-gray-600 hover:text-white p-2"
                onClick={(e) => handleAwnser(e, false)}
              >
                <svg width="1.2em" height="1.2em" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
                  ></path>
                </svg>
              </button>
              <button
                className="rounded-full  bg-gray-200 hover:bg-green-500 text-gray-600 hover:text-white p-2"
                onClick={(e) => handleAwnser(e, true)}
              >
                <svg width="1.2em" height="1.2em" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41L9 16.17z"
                  ></path>
                </svg>
              </button>
            </div>
          ) : (
            <div>
              {item.salary.status === "accepted" ? (
                <span className="text-white bg-green-400 font-medium text-sm dark:text-black flex gap-2 items-center rounded px-3 py-1 uppercase">
                  acceptée
                </span>
              ) : (
                <span className="text-white bg-red-400 font-medium text-sm dark:text-black flex gap-2 items-center rounded px-3 py-1 uppercase">
                  refusée
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      {unfold && (
        <div className="border-t mt-4 pt-4 dark:text-white">
          <p className="text-sm font-medium">Description:</p>
          <p className="whitespace-pre text-xs">{item.salary.description}</p>
        </div>
      )}
    </li>
  );
}
