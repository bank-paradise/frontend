import { useDispatch, useSelector } from "react-redux";
import { check, userHeader } from "features/authentication/user.model";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import AuthenticationRouter from "./authentication";
import DefaultRouter from "./default";
import { DefaultTemplate } from "components/templates";
import { Loader } from "components/atoms";
import { fetchVersion } from "api/api";

export default function RootContainer() {
  const cookies = new Cookies();
  const authHeader = useSelector(userHeader);
  const dispatch = useDispatch();
  const [hasNewVersion, setHasNewVersion] = useState(false);

  const checkLocalVersion = async () => {
    const api = await fetchVersion();
    if (api.status === "error") return;
    const localVersion = localStorage.getItem("version");
    if (localVersion !== api.response.version) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
      });
      localStorage.setItem("version", api.response.version);
      console.warn("New version detected, clearing cache");
      setHasNewVersion(true);
    }
  };

  useEffect(() => {
    checkLocalVersion();
  }, []);

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
    <>
      {authHeader.connected ? (
        <DefaultRouter hasNewVersion={hasNewVersion} />
      ) : (
        <AuthenticationRouter />
      )}
    </>
  );
}
