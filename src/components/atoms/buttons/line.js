import joinClasses from "helpers/joinClasses";
import { Button } from ".";

export const LineButton = ({ children, className, ...props }) => {
  return (
    <Button
      {...props}
      className={joinClasses(
        "bg-transparent border border-primary text-primary hover:bg-primary hover:text-white dark:border-white dark:text-white",
        className
      )}
    >
      {children}
    </Button>
  );
};
