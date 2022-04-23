import {
  Input,
  Paragraph,
  PrimaryButton,
  PrimaryCard,
  Search,
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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ProfessionalPayment({
  transmitter = {
    id: null,
    name: null,
    rib: null,
    balance: null,
  },
  backtoMenu = () => {},
  receiver = null,
}) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const commuAccounts = useSelector(communityAccounts);
  const devise = useSelector(bankCurrentcy);
  const personalAccount = useSelector(bankPersonalAccount);

  // retourner une liste sans le compte qui a l'id du transmitter
  const filteredAccounts = () => {
    return commuAccounts.professional.filter(
      (account) =>
        !account.name.includes("{{DELETED}}") && account.rib !== transmitter.rib
    );
  };

  const [selectedAccount, setSelectedAccount] = useState(receiver);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState(receiver ? 2 : 1);

  const handleSelectAccount = (e) => {
    e.preventDefault();
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
      transmitter: transmitter ? transmitter.rib : personalAccount.rib,
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
          <SubTitle>Payer un bien ou un service</SubTitle>
          <SubParagraph className="dark:text-white">
            Entrez le nom de l'entreprise qui recevra la somme
          </SubParagraph>
          <form
            className="flex flex-col gap-10 mt-10"
            onSubmit={handleSelectAccount}
          >
            {/* <Search
              array={commuAccounts.professional}
              searchedKey="name"
              className="w-full "
              select={setSelectedAccount}
              placeholder="choisir un bénéficiaire"
            /> */}
            <Select
              className="border py-3 px-4 shadow-md rounded-md !text-lg"
              placeholder="choisir un bénéficiaire"
              onChange={(e) => {
                if (e.target.value === "") return;
                const selected = commuAccounts.professional.find(
                  (account) => account.rib === e.target.value
                );
                setSelectedAccount(selected);
              }}
            >
              <option value="">Choisir une entreprise</option>
              {filteredAccounts().map((account) => (
                <option key={account.rib} value={account.rib}>
                  {account.name}
                </option>
              ))}
            </Select>
            <div className="flex gap-3 items-center">
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
          <div className="w-full flex justify-center">
            <h1 className="text-xl bg-gray-300 dark:bg-slate-700 rounded-full p-5 dark:text-gray-800 text-gray-400">
              <svg width="2.4em" height="2.4em" viewBox="0 0 16 16">
                <path
                  fill="currentColor"
                  d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8A2.37 2.37 0 0 1 8 7.083A2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0a.5.5 0 0 1 1 0a1.375 1.375 0 0 0 2.75 0a.5.5 0 0 1 1 0a1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0a.5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z"
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
                className={joinClasses(loading ? "opacity-50" : "")}
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
