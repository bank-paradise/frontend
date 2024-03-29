import { StaffTemplate } from "components/templates";
import BankTitle from "features/bank/account/_components/bankTitle";
import InformationsSettings from "./_components/informations";
import StarterSettings from "./_components/starter";

export default function CommunitySettings() {
  return (
    <StaffTemplate>
      <BankTitle>Paramètres de la communauté</BankTitle>
      <h4 className="text-md font-medium mt-5 mb-2 dark:text-white">
        Informations
      </h4>
      <InformationsSettings />
      <hr className="my-10" />
      <h4 className="text-md font-medium mt-5 mb-2 dark:text-white">
        Argent de départ
      </h4>
      <StarterSettings />
    </StaffTemplate>
  );
}
