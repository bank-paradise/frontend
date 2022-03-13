import { Button } from ".";

export const SecondaryButton = ({ children, className, ...props }) => {
  return (
    <Button {...props} className="bg-white text-primary">
      {children}
    </Button>
  );
};
