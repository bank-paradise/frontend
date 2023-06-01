import {
  PrimaryButton,
  SubParagraph,
  SubTitle,
} from "components/atoms";
import { DefaultTemplate } from "components/templates";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bankProfessionalAccounts } from "../bank.model";

export default function CompanyList() {
  const enterprises = useSelector(bankProfessionalAccounts);

  let navigate = useNavigate();

  return (
    <DefaultTemplate className="flex justify-center items-center">
      <div className="flex flex-col items-center gap-5 w-full">
        <div className="w-full">
          <SubTitle className="text-3xl font-bold text-left w-full">
            Liste des entreprises
          </SubTitle>
          <SubParagraph className="dark:text-white w-full text-left">
            Vous pouvez avoir jusqu'à 3 entreprises
          </SubParagraph>
        </div>
        <div className="flex flex-col gap-4 w-full">
          {enterprises.map((enterprise) => (
            <button
              key={enterprise.id}
              className="flex justify-between bg-gray-100 items-center px-5 py-4 rounded-lg shadow-sm border-b"
              onClick={() => navigate(`/entreprises/${enterprise.id}`)}
            >
              <p>{enterprise.name}</p>
              <svg
                className="text-gray-300"
                width="1.3em"
                height="1.3em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"
                ></path>
              </svg>
            </button>
          ))}
        </div>

        <div className="w-full flex flex-col items-center">
          <div className="flex w-full items-center gap-4 px-10 pb-4 dark:text-white">
            <div className="w-full h-[1px] bg-secondary  dark:bg-white" />
            <p className="text-secondary dark:text-white py-5">ou</p>
            <div className="w-full h-[1px] bg-secondary  dark:bg-white" />
          </div>
          {enterprises.length < 3 ? (
            <PrimaryButton onClick={() => navigate("/entreprises/add")}>
              Créer une entreprise
            </PrimaryButton>
          ) : (
            <SubParagraph>
              Vous avez atteint le nombre maximum d'entreprises
            </SubParagraph>
          )}
        </div>
      </div>
    </DefaultTemplate>
  );
}
