import { fetchAllAccounts, fetchinjectTransaction } from "api/community";
import { Input, PrimaryButton, Select } from "components/atoms";
import getUsername from "helpers/getUsername";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Switch from "react-switch";
import { toast } from "react-toastify";

export default function SendTransaction({ callback = () => {} }) {
  const { register, handleSubmit } = useForm();
  const [accounts, setAccounts] = useState({
    personnal: [],
    professional: [],
    cash: [],
  });
  const [removeMoney, setRemoveMoney] = useState(false);
  const [loading, setLoading] = useState(false);

  const getAccounts = async () => {
    const accountsResponse = await fetchAllAccounts();
    if (accountsResponse.status === "done")
      setAccounts(accountsResponse.response);
  };

  useEffect(() => {
    getAccounts();
  }, []);

  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);
    const invitation = await fetchinjectTransaction({
      ...data,
      remove: removeMoney,
    });
    if (invitation.status === "done") {
      toast.success(
        `${data.amount} on été ${removeMoney ? "retiré" : "ajouté"}`
      );
      setRemoveMoney(false);
      callback();
    } else {
      toast.error(invitation.response);
    }
    setLoading(false);
  };

  return (
    <div>
      <h4 className="text-md font-medium mt-5 mb-2 dark:text-white">
        Envoyer de l'argent
      </h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10 max-w-xl"
      >
        <Select
          className="w-full"
          type="text"
          placeholder="Compte"
          register={register}
          name="receiver"
          required
        >
          <option disabled>compte</option>
          <option disabled>─── JOUEURS ───</option>

          {accounts.personnal.map((account) => {
            return (
              account.user_id && (
                <option key={account.id} value={account.rib}>
                  {account.name}
                </option>
              )
            );
          })}
          <option disabled>── ENTREPRISES ──</option>
          {accounts.professional.map((account) => {
            return (
              !account.name.includes("{{DELETED}}") && (
                <option key={account.id} value={account.rib}>
                  {account.name}
                </option>
              )
            );
          })}
          <option disabled>── LIQUIDES ──</option>
          {accounts.cash.map((account) => {
            return (
              !account.name.includes("{{DELETED}}") && (
                <option key={account.id} value={account.rib}>
                  {account.name}
                </option>
              )
            );
          })}
        </Select>
        <Input
          className="w-full"
          type="number"
          placeholder="montant"
          register={register}
          name="amount"
          required
        />
        <Input
          className="w-full"
          type="text"
          placeholder="Description"
          register={register}
          name="description"
          required
        />
        <div className="flex flex-col gap-4">
          <p className="font-medium dark:text-white">Vous voulez ?</p>
          <label className="flex gap-4 items-center">
            <Switch
              checked={removeMoney}
              onChange={() => setRemoveMoney(!removeMoney)}
              color="red"
              onColor="#ef4444"
              onHandleColor="#f87171"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="react-switch"
              id="material-switch"
              offColor="#22c55e"
              offHandleColor="#4ade80"
            />
            <span className="dark:text-white">
              {removeMoney ? "Retirer de l'argent" : "Ajouter de l'argent"}
            </span>
          </label>
        </div>

        {loading ? (
          <PrimaryButton type="submit" className="w-fit opacity-50">
            Chargement...
          </PrimaryButton>
        ) : (
          <PrimaryButton type="submit" className="w-fit">
            Envoyer
          </PrimaryButton>
        )}
      </form>
    </div>
  );
}
