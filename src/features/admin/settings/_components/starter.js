import { Input, PrimaryButton, Select } from "components/atoms";
import {
  communityInfo,
  updateCommunity,
} from "features/community/community.model";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function StarterSettings() {
  const { register, handleSubmit } = useForm();
  const community = useSelector(communityInfo);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);
    const response = await dispatch(
      updateCommunity({
        ...community,
        starting_amout: Number(data.starting_amout),
        starting_message: data.starting_message,
      })
    );
    if (response.payload.status === "done") {
      toast.success("Information mis à jour");
    } else {
      toast.error("Une erreur est survenue");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-10 max-w-xl"
    >
      <Input
        className="w-full"
        type="number"
        placeholder="Montant"
        register={register}
        defaultValue={community.starting_amout}
        name="starting_amout"
        required
      />

      <Input
        className="w-full"
        placeholder="Description"
        type="text"
        register={register}
        name="starting_message"
        defaultValue={community.starting_message}
        required
      />
      {loading ? (
        <PrimaryButton type="submit" className="w-fit opacity-50">
          Chargement...
        </PrimaryButton>
      ) : (
        <PrimaryButton type="submit" className="w-fit">
          Enregistrer
        </PrimaryButton>
      )}
    </form>
  );
}
