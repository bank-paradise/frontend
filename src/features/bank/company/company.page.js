import { DefaultTemplate } from "components/templates";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { bankAllInfo } from "../bank.model";
import CompanyActivities from "./_components/companyActivities";
import CompanyPay from "./_components/companyPay";
import CompanySolde from "./_components/companySolde";
import CompanyActions from "./_components/companyActions";
import { userData } from "features/authentication/user.model";
import CompanyInvoice from "./invoices/companyInvoice";

export default function CompanyAccount() {
  const bankInformations = useSelector(bankAllInfo);
  const user = useSelector(userData);
  const { accounts, currency } = bankInformations;
  const [account, setAccount] = useState(null);
  const [grade, setGrade] = useState("employee");
  const [tab, setTab] = useState("activities");
  const params = useParams();
  useEffect(() => {
    const accountById = accounts.find(
      (account) => account.id === Number(params.companyId)
    );
    if (accountById) {
      setAccount(accountById);
      setGrade(
        accountById.employees.find((employee) => employee.user_id === user.id)
          .grade
      );
    }
  }, [accounts, params, bankInformations, user]);

  return (
    <DefaultTemplate>
      {account && (
        <div className="mt-5" key={account.rib}>
          {account && (
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 mt-10">
              <div className="w-full lg:max-w-[350px]">
                <CompanySolde account={account} currency={currency} />
              </div>
              <div className="w-full">
                {tab === "activities" ? (
                  <div className="flex flex-col gap-10 animate__animated animate__fadeIn">
                    <CompanyActions
                      setTab={setTab}
                      company_id={account.id}
                      grade={grade}
                    />

                    <CompanyActivities rib={account.rib} key={account.id} />
                  </div>
                ) : tab === "invoice" ? (
                  <CompanyInvoice setTab={setTab} company_id={account.id} />
                ) : (
                  <CompanyPay
                    setTab={setTab}
                    employees={account.employees}
                    company_id={account.id}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </DefaultTemplate>
  );
}
