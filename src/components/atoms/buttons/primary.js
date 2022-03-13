import { Button } from ".";

export const PrimaryButton = ({ children, className, ...props }) => {
  return (
    <Button {...props} className="bg-primary text-white">
      {children}
    </Button>
  );
};
