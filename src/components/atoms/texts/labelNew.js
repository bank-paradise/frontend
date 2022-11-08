import joinClasses from "helpers/joinClasses";

export const LabelNew = ({ className = "", ...props }) => {
  return (
    <span
      className={joinClasses(
        "text-xs bg-primary max-w-min px-1.5 py-0.5 rounded text-white font-bold absolute",
        className
      )}
      {...props}
    >
      new
    </span>
  );
};
