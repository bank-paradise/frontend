import { fetchAddEmployee } from "api/bank";
import {
  LineButton,
  Paragraph,
  PrimaryButton,
  PrimaryCard,
  Search,
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
      <BankTitle className="mt-5 mb-3">Salaires</BankTitle>
      <SubParagraph className="dark:text-white">
        Vous ne pouvez envoyer le salaire{" "}
        <span className="underline">qu’une fois toute les 12 heures</span>
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
        <BankTitle className="mb-3">Ajouter un salarié</BankTitle>
        <SubParagraph className="dark:text-white">
          Vous pouvez ajouter ici un salarié
        </SubParagraph>
        <br />
        <form className="flex flex-col md:flex-row gap-3">
          <Search
            placeholder="Pseudo du joueur"
            array={commuAccounts.personnal}
            searchedKey="name"
            select={setAddEmployee}
          />
          <PrimaryButton onClick={handleAddEmployee}>Ajouter</PrimaryButton>
        </form>
      </PrimaryCard>
    </div>
  );
}