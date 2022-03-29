import { Input, InputIcon, PrimaryButton, Search } from "components/atoms";
import { Modal } from "components/molecules";
import {
  bankCurrentcy,
  bankPersonalAccount,
  createTransaction,
} from "features/bank/bank.model";
import { communityAccounts } from "features/community/community.model";
import joinClasses from "helpers/joinClasses";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const PersoTransactions = ({ isOpen = false, setIsOpen = () => {} }) => {
  const commuAccounts = useSelector(communityAccounts);
  const devise = useSelector(bankCurrentcy);
  const personalAccount = useSelector(bankPersonalAccount);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedAccount, setSelectedAccount] = useState(null);

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
    setError(null);

    if (amount === 0) {
      setError("Veuillez entrer un montant");
      return;
    }
    if (!selectedAccount) {
      setError("Veuillez selectionner un bénéficiaire");
      return;
    }

    setLoading(true);
    const transaction = {
      amount,
      transmitter: personalAccount.rib,
      receiver: selectedAccount.rib,
      description,
    };
    await dispatch(createTransaction(transaction));
    setAmount(0);
    setIsOpen(false);
    setLoading(false);
  };

  if (!personalAccount) return null;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Envoyer de l'argents">
      <form className="flex items-start m-auto gap-5 flex-col max-w-[400px] py-7">
        <Input
          type="number"
          placeholder={`montant (${devise})`}
          className="border py-3 px-4 shadow-md rounded-md !text-lg"
          max={personalAccount.balance}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onBlur={handleChangeAmout}
        />

        <Search
          array={commuAccounts.personnal}
          searchedKey="name"
          className="w-full "
          select={setSelectedAccount}
          placeholder="choisir un bénéficiaire"
        />

        <Input
          type="text"
          placeholder={"commentaire"}
          className="border py-3 px-4 shadow-md rounded-md !text-lg"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}
        <PrimaryButton
          className={joinClasses("mt-5", loading ? "opacity-50" : "")}
          onClick={sendTransaction}
        >
          {loading ? "Chargement..." : "Envoyer"}
        </PrimaryButton>
      </form>
    </Modal>
  );
};
