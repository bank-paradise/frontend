import { useEffect, useState } from "react";
import {
  Input,
  PrimaryButton,
  PrimaryCard,
  SubParagraph,
  SubTitle,
} from "components/atoms";
import { DefaultTemplate } from "components/templates";
import joinClasses from "helpers/joinClasses";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchCreateSalaryRequest } from "api/bank";
import { useSelector } from "react-redux";
import { bankPersonalAccount } from "../bank.model";

export default function SendSalaryRequest() {
  const navigate = useNavigate();
  const bankAccount = useSelector(bankPersonalAccount);
  const [loading, setLoading] = useState(false);

  const [salary, setSalary] = useState({
    bank_account_id: 0,
    salary: 0,
    description: "",
  });

  useEffect(() => {
    if (!bankAccount) return;

    setSalary({
      ...salary,
      bank_account_id: bankAccount.id,
    });
  }, [bankAccount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetchCreateSalaryRequest({ ...salary });
    if (response.status === "done") {
      toast.success("Votre demande a été envoyée");
      setLoading(false);
      navigate("/");
    } else {
      toast.error(response.response);
      setLoading(false);
    }
  };

  const defaultDescription = `Nom: 
Prénom: 
Métier: 
Heure d'arrivée: 
Heure de départ: 
Run: `;

  return (
    <DefaultTemplate className="flex justify-center items-center">
      <div className="flex flex-col items-center gap-5 w-full">
        <PrimaryCard className="w-full max-w-[530px] m-auto md:px-9 py-11 bg-gray-100 dark:bg-slate-800">
          <SubTitle className="">Demande de salaire</SubTitle>
          <SubParagraph className="dark:text-white mb-10">
            Votre demande sera controlée par un administrateur
          </SubParagraph>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <Input
              type="number"
              placeholder="montant"
              className="border py-3 px-4 shadow-md rounded-md !text-lg"
              onChange={(e) =>
                setSalary({ ...salary, salary: Number(e.target.value) })
              }
            />
            <textarea
              className="appearance-none focus:border-primary border-b w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-400 dark:bg-slate-800 dark:text-white text-[16px] md:text-sm border py-3 px-4 shadow-md rounded-md !text-lg"
              placeholder={defaultDescription}
              rows={6}
              onChange={(e) =>
                setSalary({ ...salary, description: e.target.value })
              }
              defaultValue={defaultDescription}
            ></textarea>
            {!loading ? (
              <PrimaryButton
                size="large"
                className={joinClasses(
                  "max-w-min mt-4",
                  !salary.salary.length &&
                    !salary.description.length &&
                    "opacity-50"
                )}
                type="submit"
              >
                Envoyer
              </PrimaryButton>
            ) : (
              <PrimaryButton className="max-w-min mt-4 opacity-50">
                Chargement...
              </PrimaryButton>
            )}
          </form>
        </PrimaryCard>
      </div>
    </DefaultTemplate>
  );
}
