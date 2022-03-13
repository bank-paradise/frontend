import { Button } from ".";

export const LineButton = ({ children, className, ...props }) => {
  return (
    <Button
      {...props}
      className="bg-transparent border border-primary text-primary"
    >
      {children}
    </Button>
  );
};
