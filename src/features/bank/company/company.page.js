import { DefaultTemplate } from "components/templates";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { bankAllInfo } from "../bank.model";
import CompanyActivities from "./_components/companyActivities";
import CompanyPay from "./_components/companyPay";
import CompanySolde from "./_components/companySolde";
import CompanyActions from "./_components/companyActions";

export default function CompanyAccount() {
  const bankInformations = useSelector(bankAllInfo);
  const { accounts, currency } = bankInformations;
  const [account, setAccount] = useState(null);
  const [tab, setTab] = useState("activities");
  const params = useParams();
  useEffect(() => {
    const accountById = accounts.find(
      (account) => account.id === Number(params.companyId)
    );
    setAccount(accountById);
  }, [accounts, params, bankInformations]);

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
                    <CompanyActions setTab={setTab} company_id={account.id} />
                    <CompanyActivities
                      rib={account.rib}
                      tab={tab}
                      company_name={account.name}
                    />
                  </div>
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
