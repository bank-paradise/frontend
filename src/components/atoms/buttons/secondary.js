import joinClasses from "helpers/joinClasses";
import { Button } from ".";

export const SecondaryButton = ({ children, className, ...props }) => {
  return (
    <Button
      {...props}
      className={joinClasses("bg-white text-primary", className)}
    >
      {children}
    </Button>
  );
};
