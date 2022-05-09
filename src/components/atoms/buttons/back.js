import joinClasses from "helpers/joinClasses";

export function BackButton({ onClick, className, ...props }) {
  return (
    <button
      onClick={onClick}
      className={joinClasses(
        "flex gap-2 items-center dark:text-white",
        className
      )}
      {...props}
    >
      <svg width="1em" height="1em" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M17.77 3.77L16 2L6 12l10 10l1.77-1.77L9.54 12z"
        ></path>
      </svg>
      <p>retour</p>
    </button>
  );
}
