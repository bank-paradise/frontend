import { Route, Routes } from "react-router";

import Login from "features/authentication/login.page";
import Register from "features/authentication/register.page";
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
    if (authHeader.status === "done") {
      // demander la permission des notifications
      if (Notification.permission !== "granted") {
        Notification.requestPermission();
      }
      // si l'utilisateur est connecté, on lui envoie une notification
      const notification = new Notification("Bienvenue sur Bank Paradise", {
        body: "Vous êtes connecté",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authHeader]);

  return (
    <>{authHeader.connected ? <DefaultRouter /> : <AuthenticationRouter />}</>
  );
}
