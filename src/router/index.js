import { useDispatch, useSelector } from "react-redux";
import { check, userHeader } from "features/authentication/user.model";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import AuthenticationRouter from "./authentication";
import DefaultRouter from "./default";
import { DefaultTemplate } from "components/templates";
import { Loader } from "components/atoms";

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

  if (authHeader.status === "loading") {
    return (
      <DefaultTemplate
        className="flex justify-center items-center"
        connected={false}
      >
        <Loader strokeColor="#D61016" size={45} />
      </DefaultTemplate>
    );
  }

  return (
    <>{authHeader.connected ? <DefaultRouter /> : <AuthenticationRouter />}</>
  );
}
