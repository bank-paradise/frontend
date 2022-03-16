import BankTitle from "./bankTitle";

export default function Statistics() {
  return (
    <div className="flex flex-col md:flex-row lg:flex-col gap-5">
      <div className="w-full">
        <BankTitle>Statistiques</BankTitle>
        <div className="mt-7 bg-gray-100 px-4 py-5 gap-3 flex flex-col">
          <p className="uppercase text-sm flex justify-between w-full">
            ARGENTS ENTRANT: <span className="text-green-500">360000 EUR</span>
          </p>
          <p className="uppercase text-sm flex justify-between w-full">
            ARGENTS SORTANT: <span className="text-red-500">360000 EUR</span>
          </p>
          <div className="w-full h-[1px] bg-gray-300" />
          <p className="uppercase text-sm flex justify-between w-full">
            TOTAL: <span>360000 EUR</span>
          </p>
        </div>
      </div>
      <div className="w-full">
        <BankTitle>Statistiques</BankTitle>
        <div className="mt-7 gap-5 flex flex-col">
          <div>
            <p className="uppercase text-sm flex">COMPTE COURANT</p>
            <p className="uppercase text-sm flex justify-between w-full">
              IBAN: <span>CC3454-256-9654</span>
            </p>
          </div>
          <div className="w-full h-[1px] bg-gray-300" />

          <div>
            <p className="uppercase text-sm flex">COMPTE COURANT</p>
            <p className="uppercase text-sm flex justify-between w-full">
              IBAN: <span>CC3454-256-9654</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
