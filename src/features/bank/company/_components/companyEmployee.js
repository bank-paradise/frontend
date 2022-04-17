import { fetchCreateTransactionSalary, fetchUpdateSalary } from "api/bank";
import { Input, PrimaryButton } from "components/atoms";
import { getBank } from "features/bank/bank.model";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTimer } from "react-timer-hook";
import { toast } from "react-toastify";

export default function ComanyEmployee({ employee, company_id }) {
  const [amount, setAmount] = useState(employee.salary);

  const addDay = (last_payment) => {
    let date = new Date(last_payment.replace(/-/g, "/"));
    date.setDate(date.getDate() + 1);
    return date.getTime();
  };

  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp: addDay(employee.last_payment),
  });

  const handleChangeAmout = async (e) => {
    e.preventDefault();
    if (Number(e.target.value) < 0) {
      setAmount(0);
      return;
    }
    setAmount(Number(e.target.value));
    const updatedSalary = await fetchUpdateSalary({
      company_id,
      amount,
      user_id: employee.user_id,
    });

    if (updatedSalary.status === "done") {
      toast.success(`Le salaire de ${employee.pseudo} a été mis à jour`);
    } else {
      toast.error(updatedSalary.response);
    }
  };

  const sendSalary = async (e) => {
    e.preventDefault();
    const transaction = await fetchCreateTransactionSalary({
      company_id,
      amount,
      receiver: employee.rib,
    });
    if (transaction.status === "done") {
      toast.success("Salaire envoyé avec succès");
    } else {
      toast.error("Une erreur est survenue");
    }
  };

  const getDays = (date1, date2) => {
    return Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
  };

  return (
    <div className="w-full my-7">
      <h3 className="text-md font-medium dark:text-white">{employee.pseudo}</h3>
      <form className="flex items-center gap-2">
        <Input
          name="salary"
          placeholder={`salaire de ${employee.pseudo}`}
          type="number"
          value={amount}
          onBlur={handleChangeAmout}
          onChange={(e) => setAmount(e.target.value)}
          className="dark:!bg-slate-900"
        />
        {getDays(
          new Date(),
          new Date(employee.last_payment.replace(/-/g, "/"))
        ) >= 1 ? (
          <PrimaryButton onClick={sendSalary}>Envoyer</PrimaryButton>
        ) : (
          <PrimaryButton className="cursor-not-allowed opacity-50" disabled>
            <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
          </PrimaryButton>
        )}
      </form>
    </div>
  );
}
