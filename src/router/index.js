import { useDispatch, useSelector } from "react-redux";
import { check, userHeader } from "features/authentication/user.model";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import AuthenticationRouter from "./authentication";
import DefaultRouter from "./default";

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
    <>{authHeader.connected ? <DefaultRouter /> : <AuthenticationRouter />}</>
  );
}
