import {
  Input,
  PrimaryButton,
  PrimaryCard,
  Select,
  SubTitle,
} from "components/atoms";
import { check } from "features/authentication/user.model";
import { getBank } from "features/bank/bank.model";
import {
  createCommunity,
  invitationsList,
} from "features/community/community.model";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Invitations from "./Invitations";

export default function DontHaveCommunity() {
  const invitations = useSelector(invitationsList);
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    await dispatch(createCommunity(data));
    await dispatch(check());
    await dispatch(getBank());
  };

  return (
    <div className="h-[calc(100vh-73px)] w-full flex jusitfy-center items-center">
      {!isOpen ? (
        <PrimaryCard className="max-w-lg m-auto w-full flex flex-col items-center h-max justify-center py-10 px-5 bg-gray-100 rounded-md dark:bg-slate-800 dark:text-white">
          <SubTitle>Bienvenue</SubTitle>
          <Invitations invitations={invitations} />
          <div className="flex w-full items-center gap-4 px-10 pb-4 dark:text-white">
            <div className="w-full h-[1px] bg-secondary  dark:bg-white" />
            <p className="text-secondary dark:text-white py-5">ou</p>
            <div className="w-full h-[1px] bg-secondary  dark:bg-white" />
          </div>
          <PrimaryButton onClick={() => setIsOpen(true)}>
            Créer une communautée
          </PrimaryButton>
        </PrimaryCard>
      ) : (
        <PrimaryCard className="max-w-lg relative m-auto w-full flex flex-col items-center h-max justify-center py-10 px-5 bg-gray-100 dark:bg-slate-800 rounded-md">
          <button
            className="absolute top-5 left-10 flex items-center text-ms dark:text-white"
            onClick={() => setIsOpen(false)}
          >
            <svg width="1em" height="1em" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M11.67 3.87L9.9 2.1L0 12l9.9 9.9l1.77-1.77L3.54 12z"
              ></path>
            </svg>
            retour
          </button>
          <SubTitle className="mt-5 text-center">
            Créer une communautée
          </SubTitle>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-[400px] flex flex-col gap-5 w-full mt-5"
          >
            <div className="flex gap-5">
              <Input
                className="w-full"
                type="text"
                placeholder="Nom de la communauté"
                register={register}
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
              >
                <option value="">Devise</option>
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
              required
            />
            <PrimaryButton type="submit">Créer</PrimaryButton>
          </form>
        </PrimaryCard>
      )}
    </div>
  );
}
