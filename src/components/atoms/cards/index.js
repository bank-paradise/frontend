import joinClasses from "helpers/joinClasses";

export const Card = ({ className = "", children, ...props }) => {
  return (
    <div className={joinClasses("rounded-[10px] shadow-xl", className)}>
      {children}
    </div>
  );
};
