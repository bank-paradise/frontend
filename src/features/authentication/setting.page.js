import { fetchDeleteUser, fetchEditUser } from "api/authentication";
import { fetchDeleteCommunity, fetchKickMember } from "api/community";
import {
  Input,
  LineButton,
  Paragraph,
  PrimaryButton,
  PrimaryCard,
  SubTitle,
} from "components/atoms";
import { DefaultTemplate } from "components/templates";
import { logout, userData } from "features/authentication/user.model";
import { communityInfo } from "features/community/community.model";
import checkPermissions from "helpers/checkPermissions";
import joinClasses from "helpers/joinClasses";
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function AccountSetting() {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const { register, handleSubmit, watch } = useForm();
  const community = useSelector(communityInfo);
  const user = useSelector(userData);
  const watchAllFields = watch();

  const handleChangeUser = async (data) => {
    if (!isEdited) return;
    if (loading) return;
    setLoading(true);
    const res = await fetchEditUser(data);
    if (res.status === "done") {
      toast.success("Votre profil a été mis à jour, rechargement...");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      toast.error(res.response);
    }
    setLoading(false);
  };

  const handleDeleteAccount = async () => {
    if (loading) return;
    setLoading(true);
    const res = await fetchDeleteUser();
    if (res.status === "done") {
      toast.success("Votre compte a été supprimé, redirection...");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      toast.error(res.response);
    }
    setLoading(false);
  };

  const handleExitCommunity = async () => {
    if (loading) return;
    setLoading(true);
    const memberKicked = await fetchKickMember({
      user_id: user.id,
    });

    if (memberKicked.status === "done") {
      toast.success("Vous avez quitté la communauté");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      toast.error(memberKicked.response);
    }
    setLoading(false);
  };

  const handleDeleteCommunity = async () => {
    if (loading) return;
    setLoading(true);
    const res = await fetchDeleteCommunity();
    if (res.status === "done") {
      toast.success("Votre communauté a été supprimée, redirection...");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      toast.error(res.response);
    }
    setLoading(false);
  };

  const generatePassword = () => {
    const length = 8;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let ret = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      ret += charset.charAt(Math.floor(Math.random() * n));
    }
    return ret;
  };

  useEffect(() => {
    const defaultFieldsString = JSON.stringify({
      name: user.name,
      email: user.email,
      password: "",
      new_password: "",
    });
    const fieldsToString = JSON.stringify(watchAllFields);

    if (!watchAllFields.name && !watchAllFields.email) return;
    if (fieldsToString !== defaultFieldsString) {
      setIsEdited(true);
    } else {
      setIsEdited(false);
    }
  }, [watchAllFields]);

  return (
    <DefaultTemplate>
      <SubTitle>Compte</SubTitle>
      <div className="flex flex-col-reverse md:flex-row w-full gap-10 md:gap-4 mt-5">
        <PrimaryCard className="md:max-w-[350px] w-full">
          <Paragraph className="mb-5 font-medium">Communauté</Paragraph>
          {community ? (
            <ul className="">
              <li>
                <span className="font-medium">Nom: </span>
                {community.name}
              </li>
              <li>
                <span className="font-medium">Description: </span>
                {community.description}
              </li>
              <li>
                <span className="font-medium">Device: </span>
                {community.currency}
              </li>
              <li>
                <span className="font-medium">Grade: </span>
                {user.community_role}
              </li>
              <li>
                <span className="font-medium">Créer le: </span>
                {moment(community.created_at).format("DD/MM/YYYY")}
              </li>
              <li className="mt-20 w-full flex flex-col justify-end gap-4">
                <LineButton
                  className={joinClasses(
                    "w-max",
                    loading && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() => handleExitCommunity()}
                >
                  {loading ? "chargement..." : "Quitter la communauté"}
                </LineButton>
                {checkPermissions(user, 4) && (
                  <LineButton
                    className="w-max"
                    onClick={() => handleDeleteCommunity()}
                  >
                    Supprimer la communauté
                  </LineButton>
                )}
              </li>
            </ul>
          ) : (
            <p>Aucune communauté</p>
          )}
        </PrimaryCard>
        {!editing ? (
          <PrimaryCard className="w-full flex flex-col justify-between">
            <div>
              <Paragraph className="mb-5 font-medium flex items-center justify-between">
                Informations
                <PrimaryButton size="small" onClick={() => setEditing(true)}>
                  Modifier
                </PrimaryButton>
              </Paragraph>

              <ul className="">
                <li>
                  <span className="font-medium">Pseudo: </span>
                  {user.name}
                </li>
                <li>
                  <span className="font-medium">Adresse mail: </span>
                  {user.email}
                </li>
                <li>
                  <span className="font-medium">Mot de passe: </span>
                  <span className="blur-sm">{generatePassword()}</span>
                </li>
                <li>
                  <span className="font-medium">Créer le: </span>
                  {moment(user.created_at).format("DD/MM/YYYY")}
                </li>
              </ul>
            </div>
            <div className="mt-10 w-full flex flex-col md:flex-row justify-end gap-4">
              <LineButton
                className={joinClasses(
                  "w-max",
                  loading && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => handleDeleteAccount()}
              >
                {loading ? "chargement..." : "Supprimer mon compte"}
              </LineButton>
              <PrimaryButton
                className="w-max"
                onClick={() => dispatch(logout())}
              >
                Déconnexion
              </PrimaryButton>
            </div>
          </PrimaryCard>
        ) : (
          <PrimaryCard className="w-full flex flex-col justify-between">
            <div>
              <Paragraph className="mb-5 font-medium flex items-center justify-between">
                Informations
                <PrimaryButton size="small" onClick={() => setEditing(false)}>
                  Annuler
                </PrimaryButton>
              </Paragraph>
              <form
                onSubmit={handleSubmit(handleChangeUser)}
                className="flex flex-col gap-6"
              >
                <Input
                  className="w-max"
                  placeholder="Pseudo"
                  defaultValue={user.name}
                  name="name"
                  type="text"
                  register={register}
                  required
                />
                <Input
                  placeholder="Adresse mail"
                  defaultValue={user.email}
                  name="email"
                  type="email"
                  register={register}
                  required
                />
                <div className="flex flex-col gap-4">
                  <p className="text-gray-500 text-sm">
                    Uniquement si vous souhaitez changer votre mot de passe:
                  </p>
                  <Input
                    placeholder="Ancien mot de passe"
                    name="password"
                    type="password"
                    register={register}
                  />
                  <Input
                    placeholder="Nouveau mot de passe"
                    name="new_password"
                    type="password"
                    register={register}
                  />
                </div>

                <PrimaryButton
                  className={joinClasses(
                    "w-max",
                    (!isEdited || loading) && "opacity-50 cursor-not-allowed"
                  )}
                  type="submit"
                >
                  {loading ? "chargement..." : "Enregistrer"}
                </PrimaryButton>
              </form>
            </div>
          </PrimaryCard>
        )}
      </div>
    </DefaultTemplate>
  );
}
