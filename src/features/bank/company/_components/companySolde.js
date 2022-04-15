import BankTitle from "features/bank/account/_components/bankTitle";
import { formatPrice } from "helpers/formatPrice";

export default function CompanySolde({ account, currency }) {
  return (
    <div className="w-full md:max-w-[350px]">
      <BankTitle>Soldes</BankTitle>
      <div className="bg-primary text-white mt-4 px-5 py-5 rounded-lg ">
        <p className="text-md">Total:</p>
        <h3 className="text-[30px] font-bold mb-3">
          {formatPrice(account.balance, currency)}
        </h3>
        <div className="w-[100px] h-[1px] bg-white mb-3" />
        <p className="font-medium text-md mt-1">{account.name}</p>
        <p className="font-light text-sm mt-1 truncate">{account.rib}</p>
      </div>
    </div>
  );
}
