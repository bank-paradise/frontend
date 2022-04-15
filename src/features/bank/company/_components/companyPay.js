import { LineButton } from "components/atoms";
import joinClasses from "helpers/joinClasses";

export default function CompanyPay({ setTab = () => {} }) {
  return (
    <div className="w-full animate__animated animate__fadeIn ">
      <LineButton
        onClick={() => setTab("activities")}
        className="flex gap-2 items-center"
      >
        <svg width="1em" height="1em" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M17.77 3.77L16 2L6 12l10 10l1.77-1.77L9.54 12z"
          ></path>
        </svg>
        Retour
      </LineButton>
      <h1>CompanyPay</h1>
    </div>
  );
}
