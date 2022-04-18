import {
  Input,
  PrimaryButton,
  PrimaryCard,
  Search,
  SecondaryButton,
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

export default function PersonalPayment({
  backtoMenu = () => {},
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
      transmitter: personalAccount.rib,
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
        <PrimaryCard className="w-full max-w-[530px] m-auto px-9 py-11 dark:bg-slate-800">
          <SubTitle>Envoyer de l'argent</SubTitle>
          <SubParagraph className="dark:text-white">
            Entrez le pseudo du destinataire
          </SubParagraph>
          <form
            className="flex flex-col gap-10 mt-10"
            onSubmit={handleSelectAccount}
          >
            <Search
              array={commuAccounts.personnal}
              searchedKey="name"
              className="w-full "
              select={setSelectedAccount}
              placeholder="choisir un bénéficiaire"
            />
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
        <PrimaryCard className="w-full max-w-[530px] m-auto px-9 py-11 dark:bg-slate-800 animate__animated animate__fadeInRight">
          <SubTitle>Envoyer de l'argent</SubTitle>
          <SubParagraph className="dark:text-white">
            Entrez le montant à envoyer
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
