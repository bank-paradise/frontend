import joinClasses from "helpers/joinClasses";
import { Button } from ".";

export const PrimaryButton = ({ children, className, ...props }) => {
  return (
    <Button
      {...props}
      className={joinClasses(
        "bg-primary text-white hover:bg-primary-dark",
        className
      )}
    >
      {children}
    </Button>
  );
};
