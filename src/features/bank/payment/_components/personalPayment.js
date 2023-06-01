import {
  Input,
  Paragraph,
  PrimaryButton,
  PrimaryCard,
  SecondaryButton,
  Select,
  SubParagraph,
  SubTitle,
} from "components/atoms";
import {
  bankCurrentcy,
  bankPersonalAccount,
  createTransaction,
} from "features/bank/bank.model";
import { communityAccounts } from "features/community/community.model";
import joinClasses from "helpers/joinClasses";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import NoMembersError from "./noMembersError";

export default function PersonalPayment({
  transmitter = {
    id: null,
    name: null,
    rib: null,
    balance: null,
  },
  backtoMenu = () => { },
  receiver = null,
}) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const commuAccounts = useSelector(communityAccounts);
  const devise = useSelector(bankCurrentcy);
  const personalAccount = useSelector(bankPersonalAccount);

  const [selectedAccount, setSelectedAccount] = useState(null);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState(1);

  useEffect(() => {
    if (receiver) {
      setSelectedAccount(receiver);
      setStep(2);
    }
  }, [receiver]);

  const handleSelectAccount = (e) => {
    e.preventDefault();
    if (!selectedAccount) {
      toast.error("Veuillez selectionner un bénéficiaire");
      return;
    }
    setStep(2);
  };

  const handleChangeAmout = (e) => {
    if (Number(e.target.value) < 0) {
      setAmount(0);
      return;
    }

    if (Number(e.target.value) > personalAccount.balance) {
      setAmount(personalAccount.balance);
    }
  };

  const sendTransaction = async (e) => {
    e.preventDefault();

    if (amount === 0) {
      toast.error("Veuillez entrer un montant");
      return;
    }
    if (!selectedAccount) {
      toast.error("Veuillez selectionner un bénéficiaire");
      return;
    }

    setLoading(true);
    const transaction = {
      amount,
      transmitter: transmitter.id ? transmitter.rib : personalAccount.rib,
      receiver: selectedAccount.rib,
      description,
    };
    const { payload } = await dispatch(createTransaction(transaction));

    if (payload.status === "done") {
      toast.success("Transaction effectuée avec succès");
      setAmount(0);
    } else {
      toast.error(payload.response);
    }
    setLoading(false);
    navigate("/");
  };

  if (!personalAccount) return null;

  return (
    <div>
      {step === 1 ? (
        <PrimaryCard className="w-full max-w-[530px] m-auto px-9 py-11 bg-gray-100 dark:bg-slate-800">
          {transmitter.id && (
            <Paragraph className="flex gap-2 items-center font-bold !text-[16px] dark:text-white">
              <svg
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
                className="text-primary"
              >
                <path
                  fill="currentColor"
                  d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"
                ></path>
              </svg>
              {transmitter.name}
            </Paragraph>
          )}
          <SubTitle>Envoyer de l'argent</SubTitle>
          <SubParagraph className="dark:text-white mb-5">
            Entrez le pseudo du destinataire
          </SubParagraph>
          {!commuAccounts.personnal.length && <NoMembersError />}
          <form
            className="flex flex-col gap-10 mt-5"
            onSubmit={handleSelectAccount}
          >
            <Select
              className="border py-3 px-4 shadow-md rounded-md !text-lg"
              placeholder="choisir un bénéficiaire"
              onChange={(e) => {
                if (e.target.value === "") return;
                const selected = commuAccounts.personnal.find(
                  (account) => account.rib === e.target.value
                );
                setSelectedAccount(selected);
              }}
            >
              <option value="">
                {commuAccounts.personnal.length
                  ? "Choisir un bénéficiaire"
                  : "Aucun membre"}
              </option>
              {commuAccounts.personnal.map((account) => (
                <option key={account.rib} value={account.rib}>
                  {account.name}
                </option>
              ))}
            </Select>
            <div className="flex gap-3">
              <SecondaryButton className="max-w-min" onClick={backtoMenu}>
                Annuler
              </SecondaryButton>
              <PrimaryButton
                className={joinClasses(
                  "max-w-min",
                  !selectedAccount && "opacity-50"
                )}
                type="submit"
              >
                Continuer
              </PrimaryButton>
            </div>
          </form>
        </PrimaryCard>
      ) : (
        <PrimaryCard className="w-full max-w-[530px] m-auto px-9 py-11 bg-gray-100 dark:bg-slate-800 animate__animated animate__fadeInRight">
          <div className="w-full flex justify-center">
            <h1 className="text-xl bg-gray-300 dark:bg-slate-700 rounded-full p-3 dark:text-gray-800 text-gray-400">
              <svg width="3em" height="3em" viewBox="0 0 256 256">
                <circle
                  cx="128"
                  cy="96"
                  r="64"
                  fill="currentColor"
                  opacity=".2"
                ></circle>
                <path
                  fill="currentColor"
                  d="M231.9 212a120.7 120.7 0 0 0-67.1-54.2a72 72 0 1 0-73.6 0A120.7 120.7 0 0 0 24.1 212a8 8 0 1 0 13.8 8a104.1 104.1 0 0 1 180.2 0a8 8 0 1 0 13.8-8ZM72 96a56 56 0 1 1 56 56a56 56 0 0 1-56-56Z"
                ></path>
              </svg>
            </h1>
          </div>
          <SubParagraph className="dark:text-white text-center text-lg font-bold mt-2 pb-0 flex flex-col gap-0">
            <span>{selectedAccount.name}</span>
            <button
              className="text-center w-full !text-xs underline"
              onClick={() => setStep(1)}
            >
              changer
            </button>
          </SubParagraph>
          <form
            className="flex flex-col gap-10 mt-10"
            onSubmit={sendTransaction}
          >
            <Input
              type="number"
              placeholder={`montant (${devise})`}
              className="border py-3 px-4 shadow-md rounded-md !text-lg"
              max={personalAccount.balance}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onBlur={handleChangeAmout}
            />
            <Input
              type="text"
              placeholder={"commentaire"}
              className="border py-3 px-4 shadow-md rounded-md !text-lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex gap-3 items-center">
              <SecondaryButton className="max-w-min" onClick={backtoMenu}>
                Annuler
              </SecondaryButton>
              <PrimaryButton
                className={joinClasses(
                  loading || amount.length < 1 ? "opacity-50" : ""
                )}
                type="submit"
              >
                {loading ? "Chargement..." : "Envoyer"}
              </PrimaryButton>
            </div>
          </form>
        </PrimaryCard>
      )}
    </div>
  );
}
