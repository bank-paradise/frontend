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
import { Link, useNavigate } from "react-router-dom";
import { login } from "./user.model";

export default function Login() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  let navigate = useNavigate();

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
    navigate("/");
  };

  return (
    <DefaultTemplate
      className="flex justify-center items-center"
      connected={false}
    >
      <PrimaryCard className="w-full max-w-[530px] m-auto px-8 py-12">
        <SubTitle>Connexion</SubTitle>
        <SubParagraph>
          Vous n'avez pas de compte ?{" "}
          <Link to="/auth/register" className="underline text-primary">
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
            register={register}
            name="email"
            required
          />
          <Input
            type="password"
            placeholder="Mot de passe"
            register={register}
            name="password"
            required
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          {
            <PrimaryButton
              className={joinClasses("max-w-min", loading ? "opacity-50" : "")}
              type="submit"
            >
              {loading ? "Chargement..." : "Connexion"}
            </PrimaryButton>
          }
        </form>
      </PrimaryCard>
    </DefaultTemplate>
  );
}
