import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { Howl } from "howler";
import Pusher from "pusher-js";
import createNotification from "helpers/createNotif";
import { formatPrice } from "helpers/formatPrice";
import {
  communityInfo,
  getCommunity,
} from "features/community/community.model";
import CreateCommunity from "features/community/home/createCommunity.page";
import BankAccount from "features/bank/account/account.page";
import { userData } from "features/authentication/user.model";
import checkPermissions from "helpers/checkPermissions";
import CommunitySettings from "features/admin/settings/settings.page";
import CommunityInvitations from "features/admin/invitations/invitations.page";
import CommunityTransactions from "features/admin/transactions/transactions.page";
import CommunityMembers from "features/admin/members/members.page";
import CompanyAccount from "features/bank/company/company.page";
import { bankAccounts, getBank } from "features/bank/bank.model";
import CompanyCreate from "features/bank/company_create/companyCreate.page";
import PaymentPage from "features/bank/payment/payment.page";

export default function DefaultRouter() {
  const dispatch = useDispatch();
  const community = useSelector(communityInfo);
  const user = useSelector(userData);

  useEffect(() => {
    dispatch(getCommunity());
    dispatch(getBank());

    if (process.env.NODE_ENV === "development") Pusher.logToConsole = true;
    // || "ws.bank-paradise.fr"
    const pusher = new Pusher("BCN5HT4fS9AofMgc", {
      broadcaster: "pusher",
      wsHost: process.env.REACT_APP_WS_HOST,
      wsPort: 6001,
      forceTLS: process.env.REACT_APP_WS_TLS === "true",
      disableStats: true,
    });

    const channel = pusher.subscribe(`transaction.${user.id}`);

    channel.bind("transaction.received", async (event) => {
      if (event.transaction) {
        await dispatch(getBank());
        let sound = new Howl({
          src: ["/assets/sounds/notification.mp3"],
        });

        // créer une notification
        createNotification(
          `Vous avez reçu une transaction de ${formatPrice(
            event.transaction.transaction.amount
          )}`
        );

        sound.play();
      }
    });
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={!community ? <CreateCommunity /> : <BankAccount />}
      />
      <Route path="/payment/:type" element={<PaymentPage />} />
      <Route path="/entreprises/add" element={<CompanyCreate />} />
      <Route path="/entreprises/:companyId" element={<CompanyAccount />} />
      {/* All staff routes */}
      {checkPermissions(user, 2) && (
        <React.Fragment>
          <Route path="/commu/invitation" element={<CommunityInvitations />} />
          <Route path="/commu/users" element={<CommunityMembers />} />
          <Route
            path="/commu/transactions"
            element={<CommunityTransactions />}
          />
        </React.Fragment>
      )}
      {/* All owner routes */}
      {checkPermissions(user, 4) && (
        <React.Fragment>
          <Route path="/commu/settings" element={<CommunitySettings />} />
        </React.Fragment>
      )}

      <Route path="*" element={<p>Not found</p>} />
    </Routes>
  );
}
