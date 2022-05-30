import joinClasses from "helpers/joinClasses";
import moment from "moment";
import { useState } from "react";
import SalaryItem from "./salaryItem";

export default function FinishedSalaryList({
  list = [],
  currency = "USD",
  title = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(list);
  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="border-b-2 select-none	border-black dark:border-white flex justify-between items-center cursor-pointer dark:text-white my-5"
      >
        <h4 className="text-md font-medium mt-5 mb-2">{title}</h4>
        <svg
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
          className={joinClasses(
            isOpen ? "rotate-180" : "rotate-0",
            "transition-all"
          )}
        >
          <path
            fill="currentColor"
            d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4Z"
          ></path>
        </svg>
      </div>
      <ul className={!isOpen ? "hidden" : ""}>
        {list
          .slice()
          .sort((a, b) => {
            return moment(a.salary.updated_at).isAfter(b.salary.updated_at)
              ? -1
              : 1;
          })
          .map((item, index) => (
            <SalaryItem item={item} key={index} currency={currency} />
          ))}
      </ul>
    </div>
  );
}
