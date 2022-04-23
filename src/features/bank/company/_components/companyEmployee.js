import {
  fetchCreateTransactionSalary,
  fetchRemoveEmployee,
  fetchUpdateSalary,
} from "api/bank";
import { Input, PrimaryButton } from "components/atoms";
import { getBank } from "features/bank/bank.model";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTimer } from "react-timer-hook";
import { toast } from "react-toastify";

export default function ComanyEmployee({
  employee,
  company_id,
  callback = () => {},
}) {
  const [amount, setAmount] = useState(employee.salary);
  const [loading, setLoading] = useState(false);
  const [randomKey, setRandomKey] = useState(Math.random());

  const add12h = (last_payment) => {
    let date = new Date(last_payment.replace(/-/g, "/"));
    date.setHours(date.getHours() + 12);
    return date.getTime();
  };

  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp: add12h(employee.last_payment),
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
      await callback();
    } else {
      toast.error(updatedSalary.response);
    }
  };

  const sendSalary = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const transaction = await fetchCreateTransactionSalary({
      company_id,
      amount,
      receiver: employee.rib,
    });
    if (transaction.status === "done") {
      toast.success("Salaire envoyé avec succès");
      callback();
    } else {
      toast.error(transaction.response);
    }
    setLoading(false);
  };

  const handleFireEmployee = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const transaction = await fetchRemoveEmployee({
      company_id,
      user_id: employee.user_id,
    });
    if (transaction.status === "done") {
      toast.success("Employé supprimé avec succès");
      callback();
    } else {
      toast.error(transaction.response);
    }
    setLoading(false);
  };

  return (
    <div className="w-full my-7">
      <h3 className="text-md font-medium dark:text-white flex items-center gap-2">
        {employee.pseudo}
        {employee.grade !== "boss" && (
          <div className="relative group">
            <button className="translate-y-[3px]">
              <svg width="1em" height="1em" viewBox="0 0 1024 1024">
                <path
                  fill="currentColor"
                  d="M388.8 896.4v-27.198c.6-2.2 1.6-4.2 2-6.4c8.8-57.2 56.4-102.4 112.199-106.2c62.4-4.4 115.2 31.199 132.4 89.199c2.2 7.6 3.8 15.6 5.8 23.4v27.2c-.6 1.8-1.6 3.399-1.8 5.399c-8.6 52.8-46.6 93-98.6 104.4c-4 .8-8 2-12 3h-27.2c-1.8-.6-3.6-1.6-5.4-1.8c-52-8.4-91.599-45.4-103.6-96.8c-1.2-5-2.6-9.6-3.8-14.2zm252.4-768.797l-.001 27.202c-.6 2.2-1.6 4.2-1.8 6.4c-9 57.6-56.8 102.6-113.2 106.2c-62.2 4-114.8-32-131.8-90.2c-2.2-7.401-3.8-15-5.6-22.401v-27.2c.6-1.8 1.6-3.4 2-5.2c9.6-52 39.8-86 90.2-102.2c6.6-2.2 13.6-3.4 20.4-5.2h27.2c1.8.6 3.6 1.6 5.4 1.8c52.2 8.6 91.6 45.4 103.6 96.8c1.201 4.8 2.401 9.4 3.601 13.999zm-.001 370.801v27.2c-.6 2.2-1.6 4.2-2 6.4c-9 57.4-58.6 103.6-114.6 106c-63 2.8-116.4-35.2-131.4-93.8c-1.6-6.2-3-12.4-4.4-18.6v-27.2c.6-2.2 1.6-4.2 2-6.4c8.8-57.4 58.6-103.601 114.6-106.2c63-3 116.4 35.2 131.4 93.8c1.6 6.4 3 12.6 4.4 18.8z"
                ></path>
              </svg>
            </button>
            <ul className="hidden group-active:flex group-hover:flex flex-col absolute left-0 bg-white shadow-lg rounded-lg z-[1]">
              <li
                className="px-5 text-sm py-3 text-red-500 inline-flex w-max hover:font-medium cursor-pointer"
                onClick={handleFireEmployee}
              >
                Supprimer
              </li>
            </ul>
          </div>
        )}
      </h3>
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
        {seconds + minutes + hours <= 0 ? (
          loading ? (
            <PrimaryButton className="cursor-not-allowed opacity-50" disabled>
              Chargement...
            </PrimaryButton>
          ) : (
            <PrimaryButton onClick={sendSalary}>Envoyer</PrimaryButton>
          )
        ) : (
          <PrimaryButton className="cursor-not-allowed opacity-50" disabled>
            <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
          </PrimaryButton>
        )}
      </form>
    </div>
  );
}
