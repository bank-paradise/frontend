import { DefaultTemplate } from "components/templates";
import { userData } from "features/authentication/user.model";
import { useSelector } from "react-redux";
import Activities from "./_components/activities";
import BankHeader from "./_components/bankHeader";
import Statistics from "./_components/statistics";

export default function BankAccount() {
  const userInfo = useSelector(userData);

  return (
    <DefaultTemplate>
      <div className="w-full my-7">
        <h1 className="text-2xl font-medium">Bonjour {userInfo.name}</h1>
      </div>
      <div className="flex flex-col gap-10">
        <BankHeader />
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
          <div className="w-full lg:max-w-[350px]">
            <Statistics />
          </div>
          <Activities />
        </div>
      </div>
    </DefaultTemplate>
  );
}
