import { fetchinjectTransaction } from "api/community";
import { Input, PrimaryButton, Select } from "components/atoms";
import { communityAccounts } from "features/community/community.model";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function SendTransaction({ callback = () => {} }) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const accounts = useSelector(communityAccounts);

  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);
    const invitation = await fetchinjectTransaction(data);
    if (invitation.status === "done") {
      toast.success(`${data.amount} on été ajouté`);
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

          {accounts.personnal.map((account) => (
            <option value={account.rib}>{account.name}</option>
          ))}
          <option disabled>── ENTREPRISES ──</option>
          {accounts.professional.map((account) => (
            <option value={account.rib}>{account.name}</option>
          ))}
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
