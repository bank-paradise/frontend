import joinClasses from "helpers/joinClasses";
import { Card } from ".";

export const SecondaryCard = ({ className = "", children, ...props }) => {
  return (
    <Card
      className={joinClasses(
        "w-full bg-gray-100 dark:bg-slate-700 px-10 py-5 rounded-lg",
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
};
