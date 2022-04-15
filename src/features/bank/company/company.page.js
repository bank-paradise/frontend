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
  const { accounts, currency } = useSelector(bankAllInfo);
  const [account, setAccount] = useState(null);
  const [tab, setTab] = useState("activities");
  const params = useParams();
  useEffect(() => {
    const accountById = accounts.find(
      (account) => account.id === Number(params.companyId)
    );
    console.log("accountById", accountById);
    setAccount(accountById);
  }, [accounts]);

  return (
    <DefaultTemplate>
      {account && (
        <div className="mt-5">
          {account && (
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 mt-10">
              <div className="w-full lg:max-w-[350px]">
                <CompanySolde account={account} currency={currency} />
              </div>
              <div className="w-full">
                {tab === "activities" ? (
                  <div className="flex flex-col gap-10 animate__animated animate__fadeIn">
                    <CompanyActions
                      account={account}
                      currency={currency}
                      setTab={setTab}
                    />
                    <CompanyActivities rib={account.rib} tab={tab} />
                  </div>
                ) : (
                  <CompanyPay setTab={setTab} />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </DefaultTemplate>
  );
}
