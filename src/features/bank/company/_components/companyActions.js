import { fetchDeleteCompany } from "api/bank";
import { LabelNew, LineButton } from "components/atoms";
import { Button } from "components/atoms/buttons";
import BankTitle from "features/bank/account/_components/bankTitle";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CompanyActions({ setTab, company_id, grade }) {
  let navigate = useNavigate();
  const handleDeleteCompany = async (e) => {
    e.preventDefault();
    const res = await fetchDeleteCompany(company_id);
    if (res.status === "done") {
      toast.success("Entreprise supprimée avec succès, redirection...");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } else {
      toast.error(res.response);
    }
  };

  console.log("grade -> ", grade);

  return (
    <div className="flex flex-col md:flex-row w-full bg-gray-100 dark:bg-slate-700 px-10 py-5 gap-16 rounded-lg md:min-h-[230px] relative">
      <div className="w-full flex flex-col">
        <BankTitle className="mb-5">Actions Rapides</BankTitle>
        <div className="absolute right-5 group">
          <button>
            <svg width="1em" height="1em" viewBox="0 0 1024 1024">
              <path
                fill="currentColor"
                d="M388.8 896.4v-27.198c.6-2.2 1.6-4.2 2-6.4c8.8-57.2 56.4-102.4 112.199-106.2c62.4-4.4 115.2 31.199 132.4 89.199c2.2 7.6 3.8 15.6 5.8 23.4v27.2c-.6 1.8-1.6 3.399-1.8 5.399c-8.6 52.8-46.6 93-98.6 104.4c-4 .8-8 2-12 3h-27.2c-1.8-.6-3.6-1.6-5.4-1.8c-52-8.4-91.599-45.4-103.6-96.8c-1.2-5-2.6-9.6-3.8-14.2zm252.4-768.797l-.001 27.202c-.6 2.2-1.6 4.2-1.8 6.4c-9 57.6-56.8 102.6-113.2 106.2c-62.2 4-114.8-32-131.8-90.2c-2.2-7.401-3.8-15-5.6-22.401v-27.2c.6-1.8 1.6-3.4 2-5.2c9.6-52 39.8-86 90.2-102.2c6.6-2.2 13.6-3.4 20.4-5.2h27.2c1.8.6 3.6 1.6 5.4 1.8c52.2 8.6 91.6 45.4 103.6 96.8c1.201 4.8 2.401 9.4 3.601 13.999zm-.001 370.801v27.2c-.6 2.2-1.6 4.2-2 6.4c-9 57.4-58.6 103.6-114.6 106c-63 2.8-116.4-35.2-131.4-93.8c-1.6-6.2-3-12.4-4.4-18.6v-27.2c.6-2.2 1.6-4.2 2-6.4c8.8-57.4 58.6-103.601 114.6-106.2c63-3 116.4 35.2 131.4 93.8c1.6 6.4 3 12.6 4.4 18.8z"
              ></path>
            </svg>
          </button>
          <ul className="hidden group-active:flex group-hover:flex flex-col absolute right-0 bg-white shadow-lg rounded-lg">
            {grade === "boss" && (
              <li className="px-5 text-sm py-3 inline-flex w-max hover:font-medium cursor-pointer">
                Modifier le nom
              </li>
            )}
            {grade === "boss" && (
              <li
                className="px-5 text-sm py-3 text-red-500 inline-flex w-max hover:font-medium cursor-pointer"
                onClick={handleDeleteCompany}
              >
                Supprimer l'entreprise
              </li>
            )}
            {grade !== "boss" && (
              <li
                className="px-5 text-sm py-3 text-red-500 inline-flex w-max hover:font-medium cursor-pointer"
                onClick={handleDeleteCompany}
              >
                Démissionner
              </li>
            )}
          </ul>
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col gap-5 justify-center w-full">
            {grade === ("boss" || "manager") && (
              <LineButton
                className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white py-3"
                onClick={() =>
                  navigate(`/entreprises/${company_id}/payment/personnal`)
                }
              >
                Envoyer de l'argent
              </LineButton>
            )}
            {grade === ("boss" || "manager") && (
              <LineButton
                className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white py-3"
                onClick={() =>
                  navigate(`/entreprises/${company_id}/payment/professional`)
                }
              >
                Payer un bien ou un service
              </LineButton>
            )}
          </div>
          {grade === "boss" && (
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
              Gestion des employés
            </Button>
          )}
        </div>
        {grade === ("boss" || "manager") && <hr className="mt-5" />}
        <div className="relative">
          <LabelNew className="translate-y-1/2 translate-x-5" />
          <Button
            className="flex gap-3 items-center justify-center w-full bg-blue-500 hover:bg-blue-600 text-white py-3 mt-5"
            onClick={() => setTab("invoice")}
          >
            💰 Factures
          </Button>
        </div>
      </div>
    </div>
  );
}
