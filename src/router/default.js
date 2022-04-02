import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";
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

export default function DefaultRouter() {
  const dispatch = useDispatch();
  const community = useSelector(communityInfo);
  const user = useSelector(userData);

  useEffect(() => {
    dispatch(getCommunity());
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={!community ? <CreateCommunity /> : <BankAccount />}
      />
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
