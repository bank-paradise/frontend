import { PrimaryButton, SubTitle } from "components/atoms";
import { DefaultTemplate } from "components/templates";
import { useNavigate } from "react-router-dom";

export default function ErrorNotFound() {
  let navigate = useNavigate();
  return (
    <DefaultTemplate className="flex flex-col items-center justify-center gap-10">
      <img
        src="/assets/illustrations/not_found.svg"
        alt="404"
        className="w-[300px]"
      />
      <div className="flex flex-col items-center gap-2">
        <SubTitle>Page introuvable</SubTitle>
        <PrimaryButton className="w-max" onClick={() => navigate("/")}>
          Reveneir à l'accueil
        </PrimaryButton>
      </div>
    </DefaultTemplate>
  );
}
