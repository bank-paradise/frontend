import { fetchAddEmployee } from "api/bank";
import {
  LineButton,
  Paragraph,
  PrimaryButton,
  PrimaryCard,
  Search,
  Select,
  SubParagraph,
  SubTitle,
} from "components/atoms";
import { Card } from "components/atoms/cards";
import BankTitle from "features/bank/account/_components/bankTitle";
import { getBank } from "features/bank/bank.model";
import { communityAccounts } from "features/community/community.model";
import joinClasses from "helpers/joinClasses";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ComanyEmployee from "./companyEmployee";

export default function CompanyPay({
  setTab = () => {},
  employees = [],
  company_id = 0,
}) {
  const commuAccounts = useSelector(communityAccounts);
  const dispatch = useDispatch();
  const [addEmployee, setAddEmployee] = useState(null);
  const [randomKey, setRandomKey] = useState(Math.random());

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    if (addEmployee) {
      const newEmployee = await fetchAddEmployee({
        rib: addEmployee.rib,
        company_id,
      });

      if (newEmployee.status === "done") {
        toast.success("Employé ajouté avec succès");
        window.location.reload();
      } else {
        toast.error(newEmployee.response);
      }
    }
  };

  const refreshSalaryComponent = async () => {
    await dispatch(getBank());
    setRandomKey(Math.random());
  };

  return (
    <div className="w-full animate__animated animate__fadeIn ">
      <LineButton
        onClick={() => setTab("activities")}
        className="flex gap-2 items-center"
      >
        <svg width="1em" height="1em" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M17.77 3.77L16 2L6 12l10 10l1.77-1.77L9.54 12z"
          ></path>
        </svg>
        Retour
      </LineButton>
      <BankTitle className="mt-5 mb-3">Employés</BankTitle>
      <SubParagraph className="dark:text-white">
        Retrouvez ici tous les employés de votre entreprise.
      </SubParagraph>
      <ul>
        {employees.map((employee, index) => (
          <ComanyEmployee
            employee={employee}
            key={index + randomKey}
            company_id={company_id}
            callback={refreshSalaryComponent}
          />
        ))}
      </ul>
      <PrimaryCard className="bg-gray-100 dark:bg-slate-800">
        <BankTitle className="mb-3">Ajouter un employé</BankTitle>
        <SubParagraph className="dark:text-white">
          Vous pouvez ajouter ici un employé
        </SubParagraph>
        <br />
        <form className="flex flex-col md:flex-row gap-3">
          <Select
            className="border py-3 px-4 shadow-md rounded-md !text-lg"
            placeholder="choisir un bénéficiaire"
            onChange={(e) => {
              if (e.target.value === "") return;
              const selected = commuAccounts.personnal.find(
                (account) => account.rib === e.target.value
              );
              setAddEmployee(selected);
            }}
          >
            <option value="">
              {commuAccounts.personnal.length
                ? "Choisir un joueur"
                : "Aucun membre"}
            </option>
            {commuAccounts.personnal.map((account) => (
              <option key={account.rib} value={account.rib}>
                {account.name}
              </option>
            ))}
          </Select>
          <PrimaryButton onClick={handleAddEmployee}>Ajouter</PrimaryButton>
        </form>
      </PrimaryCard>
    </div>
  );
}
