import { Input, PrimaryButton, Select } from "components/atoms";
import {
  communityInfo,
  updateCommunity,
} from "features/community/community.model";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function InformationsSettings() {
  const { register, handleSubmit } = useForm();
  const community = useSelector(communityInfo);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);
    const response = await dispatch(updateCommunity({ ...community, ...data }));

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
      <div className="flex gap-5">
        <Input
          className="w-full"
          type="text"
          placeholder="Nom de la communauté"
          register={register}
          defaultValue={community.name}
          name="name"
          required
        />
        <Select
          className="w-full max-w-[100px]"
          type="text"
          placeholder="Devise"
          register={register}
          name="currency"
          required
          defaultValue={community.currency}
        >
          <option value="" disabled>
            Devise
          </option>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
        </Select>
      </div>
      <Input
        className="w-full"
        placeholder="Description"
        type="text"
        register={register}
        name="description"
        defaultValue={community.description}
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
