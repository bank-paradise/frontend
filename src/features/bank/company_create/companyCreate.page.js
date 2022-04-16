import {
  Input,
  Paragraph,
  PrimaryButton,
  PrimaryCard,
  SubParagraph,
  SubTitle,
} from "components/atoms";
import { DefaultTemplate } from "components/templates";
import joinClasses from "helpers/joinClasses";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCompany } from "../bank.model";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function CompanyCreate() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const { payload } = await dispatch(createCompany({ name: company }));
    setLoading(false);
    if (payload.status === "done") {
      toast.success("Entreprise créée avec succès");
      navigate(`/entreprises/${payload.response.account.id}`);
    } else {
      toast.error(payload.response);
    }
  };

  return (
    <DefaultTemplate
      className="flex justify-center items-center"
      connected={false}
    >
      <PrimaryCard className="w-full max-w-[530px] m-auto px-8 py-12 dark:bg-slate-800 animate__animated animate__fadeInDown">
        <SubTitle>Créer une entreprise</SubTitle>
        <SubParagraph className="dark:text-white">
          Vous pouvez créer jusqu'à 3 entreprises
        </SubParagraph>
        <form className="flex flex-col gap-10 mt-10" onSubmit={handleSubmit}>
          <Input
            name="enterprise"
            type="text"
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Nom de l'entreprise"
            required
          />

          <PrimaryButton
            className={joinClasses("max-w-min", loading ? "opacity-50" : "")}
            type="submit"
          >
            {loading ? "Chargement..." : "Créer"}
          </PrimaryButton>
        </form>
      </PrimaryCard>
    </DefaultTemplate>
  );
}
