import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import {
  communityInfo,
  getCommunity,
} from "features/community/community.model";
import CreateCommunity from "features/community/home/createCommunity.page";
import BankAccount from "features/bank/account/account.page";

export default function DefaultRouter() {
  const dispatch = useDispatch();
  const community = useSelector(communityInfo);

  useEffect(() => {
    dispatch(getCommunity());
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={!community ? <CreateCommunity /> : <BankAccount />}
      />
    </Routes>
  );
}
