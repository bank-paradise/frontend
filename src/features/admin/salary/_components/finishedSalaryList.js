import SalaryItem from "./salaryItem";

export default function FinishedSalaryList({ list = [], currency = "USD" }) {
  return (
    <ul>
      {list.map((item, index) => (
        <SalaryItem item={item} key={index} currency={currency} />
      ))}
    </ul>
  );
}
