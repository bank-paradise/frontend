import { PrimaryButton, SubTitle } from "components/atoms";
import { DefaultTemplate } from "components/templates";
import { useNavigate } from "react-router-dom";

export default function ErrorInConstruction() {
  let navigate = useNavigate();
  return (
    <DefaultTemplate className="flex flex-col items-center justify-center gap-10">
      <img
        src="/assets/illustrations/in_construction.svg"
        alt="en construction"
        className="w-[300px]"
      />
      <div className="flex flex-col items-center gap-2">
        <SubTitle>Page en construction</SubTitle>
        <PrimaryButton className="w-max" onClick={() => navigate("/")}>
          Reveneir à l'accueil
        </PrimaryButton>
      </div>
    </DefaultTemplate>
  );
}
