import { bankAccounts, bankStatistics } from "features/bank/bank.model";
import { communityInfo } from "features/community/community.model";
import { formatPrice } from "helpers/formatPrice";
import joinClasses from "helpers/joinClasses";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import BankTitle from "./bankTitle";

export default function Statistics() {
  const statistics = useSelector(bankStatistics);
  const community = useSelector(communityInfo);
  const accounts = useSelector(bankAccounts);
  let navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row lg:flex-col gap-5">
      <div className="w-full">
        <BankTitle>Statistiques</BankTitle>
        <div className="mt-7 bg-gray-100 px-4 py-5 gap-3 flex flex-col dark:bg-slate-600 dark:text-white">
          <p className="uppercase text-sm flex justify-between w-full">
            ARGENTS ENTRANT:{" "}
            <span className="text-green-500">
              {formatPrice(statistics.incoming, community.currency)}
            </span>
          </p>
          <p className="uppercase text-sm flex justify-between w-full">
            ARGENTS SORTANT:{" "}
            <span className="text-red-500">
              {formatPrice(statistics.outgoing, community.currency)}
            </span>
          </p>
          <div className="w-full h-[1px] bg-gray-300" />
          <p className="uppercase text-sm flex justify-between w-full">
            TOTAL:{" "}
            <span>
              {formatPrice(
                statistics.incoming - statistics.outgoing,
                community.currency
              )}
            </span>
          </p>
        </div>
      </div>
      <div className="w-full">
        <BankTitle>Comptes</BankTitle>
        <div className="mt-7 gap-5 flex flex-col dark:text-white">
          {accounts.map((account, index) => (
            <Fragment key={account.id}>
              <div>
                {account.type === "personnal" ? (
                  <p
                    className="uppercase text-sm flex"
                    onClick={() => Navigate()}
                  >
                    COMPTE {account.name}
                  </p>
                ) : (
                  <button
                    className="uppercase text-sm flex gap-2 items-center hover:font-medium"
                    onClick={() => navigate(`/entreprises/${account.id}`)}
                  >
                    <span>COMPTE {account.name} </span>
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      className="text-primary font-bold"
                    >
                      <path
                        fill="currentColor"
                        d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83l1.41 1.41L19 6.41V10h2V3h-7z"
                      ></path>
                    </svg>
                  </button>
                )}

                <p className="uppercase text-sm flex justify-between w-full">
                  {account.rib}
                </p>
              </div>
              <div
                className={joinClasses(
                  "w-full h-[1px] bg-gray-300",
                  index !== accounts.length - 1 ? "block" : "hidden"
                )}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
