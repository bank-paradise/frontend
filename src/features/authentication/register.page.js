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
import { registration } from "./user.model";

export default function Register() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const onSubmit = async (data) => {
    if (loading) return;
    setError(null);
    setLoading(true);
    const response = await dispatch(registration(data));
    setLoading(false);
    const { status } = response.payload;
    if (status === "error") {
      setError(response.payload.response);
      return;
    }
    navigate("/");
  };

  return (
    <DefaultTemplate className="flex justify-center items-center">
      <PrimaryCard className="w-full max-w-[530px] m-auto px-8 py-12">
        <SubTitle>Inscription</SubTitle>
        <SubParagraph>
          Vous avez un compte ?{" "}
          <Link to="/auth/login" className="underline text-primary">
            Connexion
          </Link>
        </SubParagraph>
        <form
          className="flex flex-col gap-10 mt-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            placeholder="Pseudo"
            register={register}
            name="name"
            required
          />
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
          <PrimaryButton
            className={joinClasses("max-w-min", loading ? "opacity-50" : "")}
            type="submit"
          >
            {loading ? "Chargement..." : "Insciption"}
          </PrimaryButton>
        </form>
      </PrimaryCard>
    </DefaultTemplate>
  );
}