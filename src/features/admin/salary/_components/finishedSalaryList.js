import moment from "moment";
import SalaryItem from "./salaryItem";

export default function FinishedSalaryList({ list = [], currency = "USD" }) {
  return (
    <ul>
      {list
        .slice()
        .sort((a, b) => {
          return moment(a.created_at).isAfter(b.created_at) ? -1 : 1;
        })
        .map((item, index) => (
          <SalaryItem item={item} key={index} currency={currency} />
        ))}
    </ul>
  );
}
