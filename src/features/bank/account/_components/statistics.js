import { bankAccounts, bankStatistics } from "features/bank/bank.model";
import { communityInfo } from "features/community/community.model";
import joinClasses from "helpers/joinClasses";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import BankTitle from "./bankTitle";

export default function Statistics() {
  const statistics = useSelector(bankStatistics);
  const community = useSelector(communityInfo);
  const accounts = useSelector(bankAccounts);

  return (
    <div className="flex flex-col md:flex-row lg:flex-col gap-5">
      <div className="w-full">
        <BankTitle>Statistiques</BankTitle>
        <div className="mt-7 bg-gray-100 px-4 py-5 gap-3 flex flex-col">
          <p className="uppercase text-sm flex justify-between w-full">
            ARGENTS ENTRANT:{" "}
            <span className="text-green-500">
              {statistics.incoming} {community.currency}
            </span>
          </p>
          <p className="uppercase text-sm flex justify-between w-full">
            ARGENTS SORTANT:{" "}
            <span className="text-red-500">
              {statistics.outgoing} {community.currency}
            </span>
          </p>
          <div className="w-full h-[1px] bg-gray-300" />
          <p className="uppercase text-sm flex justify-between w-full">
            TOTAL:{" "}
            <span>
              {statistics.incoming - statistics.outgoing} {community.currency}
            </span>
          </p>
        </div>
      </div>
      <div className="w-full">
        <BankTitle>Comptes</BankTitle>
        <div className="mt-7 gap-5 flex flex-col">
          {accounts.map((account, index) => (
            <Fragment key={account.id}>
              <div>
                <p className="uppercase text-sm flex">COMPTE {account.name}</p>
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
