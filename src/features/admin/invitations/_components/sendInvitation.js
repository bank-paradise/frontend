import { fetchsendInvitation } from "api/community";
import { Input, PrimaryButton } from "components/atoms";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function SendInvitation({ callback = () => {} }) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);
    const invitation = await fetchsendInvitation(data);
    if (invitation.status === "done") {
      toast.success("Invitation envoyé !");
      callback();
    } else {
      toast.error(invitation.response);
    }
    setLoading(false);
  };

  return (
    <div>
      <h4 className="text-md font-medium mt-5 mb-2 dark:text-white">
        Inviter un joueur
      </h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10 max-w-xl"
      >
        <Input
          className="w-full"
          type="email"
          placeholder="email du joueur"
          register={register}
          name="email"
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
