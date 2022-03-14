import { Route, Routes } from "react-router";

import Login from "features/authentication/login.page";
import Register from "features/authentication/register.page";
import { useDispatch, useSelector } from "react-redux";
import { check, userHeader } from "features/authentication/user.model";
import { useEffect } from "react";
import Cookies from "universal-cookie";

export default function RootContainer() {
  const cookies = new Cookies();
  const authHeader = useSelector(userHeader);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authHeader.status === "nothing" && cookies.get("::token")) {
      dispatch(check());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authHeader]);

  return (
    <>
      {authHeader.connected ? (
        <h1>Connecté</h1>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Routes>
      )}
    </>
  );
}
