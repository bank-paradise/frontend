import moment from "moment";
import "moment/locale/fr";
import FinishedSalaryList from "./finishedSalaryList";
export default function FinishedSalaryListByDate({
  list = [],
  currency = "USD",
}) {
  moment.locale("fr");
  return (
    <ul>
      {Object.keys(list)
        .slice()
        .sort((a, b) => {
          return moment(list[a]).isAfter(list[b]) ? -1 : 1;
        })
        .map((item, index) => (
          <FinishedSalaryList
            list={list[item]}
            title={moment(item).format("DD MMMM YYYY")}
            key={index}
            currency={currency}
          />
        ))}
    </ul>
  );
}
