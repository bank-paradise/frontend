import joinClasses from "helpers/joinClasses";
import { getSizeClass } from "themes/size";

export const Button = ({ children, className, size = "", ...props }) => {
  return (
    <button
      className={joinClasses(
        "rounded-[8px] font-medium shadow-lg hover:shadow-sm transition-all",
        getSizeClass(size),
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
