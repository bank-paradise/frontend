import { fetchSendAwnserSalary } from "api/bank";
import { toast } from "react-toastify";
import SalaryItem from "./salaryItem";

export default function AwaitingSalaryList({
  list = [],
  currency = "USD",
  refresh = () => {},
}) {
  const handleAwnser = async (awnser) => {
    console.log(awnser);
    const response = await fetchSendAwnserSalary({
      salary_request_id: awnser.id,
      status: awnser.accepted ? "accepted" : "refuse",
    });
    if (response.status === "done") {
      toast.success(awnser.accepted ? "Demande acceptée" : "Demande refusée");
      await refresh();
    } else {
      toast.error(response.response);
    }
  };

  return (
    <ul>
      {list.map((item, index) => (
        <SalaryItem
          item={item}
          key={index}
          currency={currency}
          callback={handleAwnser}
        />
      ))}
    </ul>
  );
}
