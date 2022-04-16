import { DefaultTemplate } from "components/templates";
import { userData } from "features/authentication/user.model";
import { useSelector } from "react-redux";
import { bankAllInfo } from "../bank.model";
import Activities from "./_components/activities";
import BankHeader from "./_components/bankHeader";
import Statistics from "./_components/statistics";

export default function BankAccount() {
  const userInfo = useSelector(userData);
  const { accounts, currency } = useSelector(bankAllInfo);

  return (
    <DefaultTemplate>
      <div className="w-full my-7">
        <h1 className="text-2xl font-medium dark:text-white">
          Bonjour {userInfo.name}
        </h1>
      </div>
      {accounts && (
        <div className="flex flex-col gap-10">
          <BankHeader accounts={accounts} currency={currency} />
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
            <div className="w-full lg:max-w-[350px]">
              <Statistics />
            </div>
            <Activities />
          </div>
        </div>
      )}
    </DefaultTemplate>
  );
}
