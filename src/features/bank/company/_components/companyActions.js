import { LineButton } from "components/atoms";
import { Button } from "components/atoms/buttons";
import BankTitle from "features/bank/account/_components/bankTitle";
import { formatPrice } from "helpers/formatPrice";

export default function CompanyActions({ setTab }) {
  return (
    <div className="flex flex-col md:flex-row w-full bg-gray-100 dark:bg-slate-700 px-10 py-5 gap-16 rounded-lg md:h-[230px]">
      <div className="w-full flex flex-col">
        <BankTitle className="mb-5">Actions Rapides</BankTitle>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col gap-5 justify-center w-full">
            <LineButton className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white py-3">
              Envoyer de l'argent
            </LineButton>
            <LineButton className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white py-3">
              Payer un bien ou un service
            </LineButton>
          </div>
          <Button
            className="flex gap-3 items-center justify-center w-full bg-primary hover:bg-primary-dark text-white py-3"
            onClick={() => setTab("pay")}
          >
            <svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M17.755 14c.78 0 1.466.397 1.87 1H13.5a2.5 2.5 0 0 0-2.5 2.5v4c0 .161.015.32.045.472c-2.939-.186-5.136-1.25-6.53-3.207a2.75 2.75 0 0 1-.511-1.596v-.92A2.249 2.249 0 0 1 6.253 14h11.502ZM12 2.005a5 5 0 1 1 0 10a5 5 0 0 1 0-10ZM12 17.5a1.5 1.5 0 0 1 1.5-1.5h8a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5h-8a1.5 1.5 0 0 1-1.5-1.5v-4Zm10 .5a1 1 0 0 1-1-1h-1a2 2 0 0 0 2 2v-1Zm0 2a2 2 0 0 0-2 2h1a1 1 0 0 1 1-1v-1Zm-8-3a1 1 0 0 1-1 1v1a2 2 0 0 0 2-2h-1Zm1 5a2 2 0 0 0-2-2v1a1 1 0 0 1 1 1h1Zm4.25-2.5a1.75 1.75 0 1 0-3.5 0a1.75 1.75 0 0 0 3.5 0Z"
              ></path>
            </svg>
            Payer les salaires
          </Button>
        </div>
      </div>
    </div>
  );
}
