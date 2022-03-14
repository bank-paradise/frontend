import joinClasses from "helpers/joinClasses";
import { Card } from ".";

export const PrimaryCard = ({ className = "", children, ...props }) => {
  return (
    <Card className={joinClasses("px-[24px] py-[16px]", className)} {...props}>
      {children}
    </Card>
  );
};
