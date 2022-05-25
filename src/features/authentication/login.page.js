import {
  SubTitle,
  Input,
  PrimaryCard,
  PrimaryButton,
  SubParagraph,
} from "components/atoms";
import { DefaultTemplate } from "components/templates";
import joinClasses from "helpers/joinClasses";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { login } from "./user.model";

export default function Login() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const location = useLocation();

  const getPreviousUrl = () => {
    const { pathname } = location;
    if (pathname === "/auth/login") return "/";
    return pathname;
  };

  const onSubmit = async (data) => {
    if (loading) return;
    setError(null);
    setLoading(true);
    const response = await dispatch(login(data));
    setLoading(false);
    const { status } = response.payload;
    if (status === "error") {
      setError(response.payload.response);
      return;
    }
  };

  return (
    <DefaultTemplate
      className="flex justify-center items-center"
      connected={false}
    >
      <PrimaryCard className="w-full max-w-[530px] m-auto px-8 py-12 dark:bg-slate-800">
        <SubTitle>Connexion</SubTitle>
        <SubParagraph className="dark:text-white">
          Vous n'avez pas de compte ?{" "}
          <Link
            to={"/auth/register"}
            state={{ from: getPreviousUrl() }}
            className="underline text-primary"
          >
            Inscription
          </Link>
        </SubParagraph>
        <form
          className="flex flex-col gap-10 mt-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="email"
            placeholder="Adresse mail"
            className="dark:bg-slate-800"
            register={register}
            name="email"
            required
          />
          <Input
            type="password"
            placeholder="Mot de passe"
            className="dark:bg-slate-800"
            register={register}
            name="password"
            required
          />
          {error && <p className="text-sm text-red-500">{error}</p>}

          <PrimaryButton
            className={joinClasses("max-w-min", loading ? "opacity-50" : "")}
            type="submit"
          >
            {loading ? "Chargement..." : "Connexion"}
          </PrimaryButton>
        </form>
      </PrimaryCard>
    </DefaultTemplate>
  );
}
