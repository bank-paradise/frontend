import { useEffect, useState } from "react";
import { fetchTransactions } from "api/community";
import { StaffTemplate } from "components/templates";
import BankTitle from "features/bank/account/_components/bankTitle";
import { fetchSalaryList } from "api/bank";
import FinishedSalaryList from "./_components/finishedSalaryList";
import { useSelector } from "react-redux";
import { communityInfo } from "features/community/community.model";
import AwaitingSalaryList from "./_components/awaitingSalaryList";

export default function CommunitySalary() {
  const [salaryList, setSalaryList] = useState([]);
  const { currency } = useSelector(communityInfo);

  const getSalaryList = async () => {
    const salaryList = await fetchSalaryList();
    console.log(salaryList.response);
    if (salaryList.status === "done") setSalaryList(salaryList.response);
  };
  useEffect(() => {
    getSalaryList();
  }, []);

  return (
    <StaffTemplate>
      <BankTitle>Demande Salaires</BankTitle>
      <h4 className="text-md font-medium mt-5 mb-2 dark:text-white">
        En attente de validation
      </h4>
      <AwaitingSalaryList
        list={salaryList.salary_requests_waiting}
        currency={currency}
        refresh={getSalaryList}
      />
      <hr className="my-10" />
      <h4 className="text-md font-medium mt-5 mb-2 dark:text-white">
        Demandes validées
      </h4>
      <FinishedSalaryList
        list={salaryList.salary_requests_finished}
        currency={currency}
      />
    </StaffTemplate>
  );
}
