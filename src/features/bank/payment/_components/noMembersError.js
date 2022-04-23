import { PrimaryButton, SecondaryButton } from "components/atoms";
import { useNavigate } from "react-router-dom";

export default function NoMembersError() {
  let navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-2 py-4">
      <p className="text-black z-[1] flex gap-2 items-center text-red-400 font-medium text-sm">
        <svg width="1em" height="1em" viewBox="0 0 24 24">
          <path
            d="M12.884 2.532c-.346-.654-1.422-.654-1.768 0l-9 17A.999.999 0 0 0 3 21h18a.998.998 0 0 0 .883-1.467L12.884 2.532zM13 18h-2v-2h2v2zm-2-4V9h2l.001 5H11z"
            fill="currentColor"
          ></path>
        </svg>
        Aucun membre dans la communauté.
      </p>
      <div className="flex gap-2">
        <PrimaryButton
          size="small"
          className="shadow-none flex items-center gap-2 w-max"
          onClick={(e) => {
            e.preventDefault();
            navigate("/commu/invitation");
          }}
        >
          <span>Ajouter un membre</span>
        </PrimaryButton>
        <SecondaryButton
          size="small"
          className="shadow-none flex items-center gap-2 w-max"
          onClick={() => window.location.reload()}
        >
          <svg width="1.4em" height="1.4em" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
            ></path>
          </svg>
          Actualiser
        </SecondaryButton>
      </div>
    </div>
  );
}
