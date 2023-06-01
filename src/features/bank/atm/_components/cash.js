import {
  Input,
  Paragraph,
  PrimaryButton,
  Select,
} from "components/atoms";
import { Button } from "components/atoms/buttons";
import {
  bankCashAccount,
  createTransaction,
} from "features/bank/bank.model";
import {
  communityAccounts,
  communityInfo,
} from "features/community/community.model";
import { formatPrice } from "helpers/formatPrice";
import joinClasses from "helpers/joinClasses";
import { Howl } from "howler";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ATMCash({ callback = () => { } }) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [step, setStep] = useState(1);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [paymentDone, setPaymentDone] = useState({
    status: null,
    message: "",
  });
  const community = useSelector(communityInfo);
  const commuAccounts = useSelector(communityAccounts);
  const cashAccount = useSelector(bankCashAccount);

  const atmKeySound = () => {
    let sound = new Howl({
      src: ["/assets/sounds/atm-key.mp3"],
    });

    sound.play();
  };

  const handleSelectAmout = () => {
    setStep(2);
  };

  const handlePayment = async (amount) => {
    const transaction = {
      amount,
      transmitter: cashAccount.rib,
      receiver: selectedAccount.rib,
      description: "paiement en espèces",
    };

    const { payload } = await dispatch(createTransaction(transaction));

    setPaymentDone({
      status: payload.status === "done",
      message:
        payload.status === "done"
          ? "Vous avez donner de l'argent en espèces"
          : payload.response,
    });
  };

  return (
    <div
      className="animate__animated animate__zoomIn"
      style={{
        animationDuration: "0.5s",
      }}
    >
      {paymentDone.status === null ? (
        <div>
          {step === 1 && (
            <>
              <Paragraph className="text-center font-bold">
                Choisissez le montant que vous souhaitez donner
              </Paragraph>
              <div className="grid grid-cols-2 gap-5 mt-10">
                <PrimaryButton
                  className="w-full !px-0 order-1 bg-gradient-to-b from-green-600 to-green-700"
                  size="large"
                  onClick={() => {
                    atmKeySound();
                    setAmount(50);
                    handleSelectAmout();
                  }}
                >
                  {formatPrice(50, community.currency)}
                </PrimaryButton>
                <PrimaryButton
                  className="w-full !px-0 order-3 bg-gradient-to-b from-green-600 to-green-700"
                  size="large"
                  onClick={() => {
                    atmKeySound();
                    setAmount(500);
                    handleSelectAmout();
                  }}
                >
                  {formatPrice(500, community.currency)}
                </PrimaryButton>
                <PrimaryButton
                  className="w-full !px-0 order-5 bg-gradient-to-b from-green-600 to-green-700"
                  size="large"
                  onClick={() => {
                    atmKeySound();
                    setAmount(2500);
                    handleSelectAmout();
                  }}
                >
                  {formatPrice(2500, community.currency)}
                </PrimaryButton>
                <PrimaryButton
                  className="w-full !px-0 order-2 bg-gradient-to-b from-green-600 to-green-700"
                  size="large"
                  onClick={() => {
                    atmKeySound();
                    setAmount(10000);
                    handleSelectAmout();
                  }}
                >
                  {formatPrice(10000, community.currency)}
                </PrimaryButton>
                <PrimaryButton
                  className="w-full !px-0 order-4 bg-gradient-to-b from-green-600 to-green-700"
                  size="large"
                  onClick={() => {
                    atmKeySound();
                    setAmount(100000);
                    handleSelectAmout();
                  }}
                >
                  {formatPrice(100000, community.currency)}
                </PrimaryButton>
              </div>
              <div className="flex w-full items-center gap-4 mt-5 px-10 pb-4 dark:text-white">
                <div className="w-full h-[1px] bg-secondary" />
                <p className="text-secondary py-5">ou</p>
                <div className="w-full h-[1px] bg-secondary" />
              </div>
              <p className="mb-2 text-gray-700 text-center">
                Précisez le montant exact
              </p>
              <Input
                className="shadow-md !py-3 rounded-lg dark:bg-gray-100 bg-gray-100 !text-gray-800"
                placeholder="Montant exact"
                type="number"
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              {amount > 0 && (
                <PrimaryButton
                  className="w-full mt-3 bg-gradient-to-b from-green-600 to-green-700"
                  onClick={() => {
                    atmKeySound();
                    handleSelectAmout();
                  }}
                >
                  Continuer
                </PrimaryButton>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <Paragraph className="text-center font-bold">
                Choisissez à qui vous souhaitez donner de l'argent
              </Paragraph>

              <Select
                className="border py-3 px-4 shadow-md rounded-md !text-lg dark:bg-gray-100 !text-gray-800 mb-5 !text-[16px] mt-12"
                placeholder="choisir une personne"
                onChange={(e) => {
                  if (e.target.value === "") return;
                  const selected = commuAccounts.cash.find(
                    (account) => account.rib === e.target.value
                  );
                  setSelectedAccount(selected);
                }}
              >
                <option value="">
                  {commuAccounts.cash.length
                    ? "Choisir une personne"
                    : "Aucun membre"}
                </option>
                {commuAccounts.cash.map((account) => (
                  <option key={account.rib} value={account.rib}>
                    {account.name}
                  </option>
                ))}
              </Select>
              <PrimaryButton
                className={joinClasses(
                  "w-full mt-3 bg-gradient-to-b from-green-600 to-green-700",
                  amount > 0 && selectedAccount
                    ? "opacity-100"
                    : "opacity-50 cursor-not-allowed"
                )}
                onClick={() => {
                  atmKeySound();
                  handlePayment(amount);
                }}
                disabled={amount > 0 && !selectedAccount}
              >
                Envoyer
              </PrimaryButton>
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-5 items-center">
          {paymentDone.status ? (
            <svg
              width="5em"
              height="5em"
              viewBox="0 0 1024 1024"
              className="text-green-700"
            >
              <path
                fill="currentColor"
                d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896zm-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"
              ></path>
            </svg>
          ) : (
            <svg
              width="5em"
              height="5em"
              viewBox="0 0 24 24"
              className="text-primary"
            >
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
              ></path>
            </svg>
          )}
          <Paragraph className="text-center font-bold">
            {paymentDone.message}
          </Paragraph>

          <Button
            onClick={callback}
            className="bg-gradient-to-b from-green-600 to-green-700 text-white"
          >
            Retour
          </Button>
        </div>
      )}
    </div>
  );
}
