import {
  BackButton,
  Paragraph,
  PrimaryButton,
  SubTitle,
} from "components/atoms";
import { ATMTemplate, DefaultTemplate } from "components/templates";
import { userData } from "features/authentication/user.model";
import { formatPrice } from "helpers/formatPrice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ATMPayment from "./_components/payment";
import ATMWithdrawal from "./_components/withdrawal";

export default function ATMPage() {
  const [connexion, setConnexion] = useState(true);
  const { name } = useSelector(userData);
  let navigate = useNavigate();
  const [action, setAction] = useState("");

  const backAction = () => {
    setAction("");
  };

  useEffect(() => {
    const random = Math.floor(Math.random() * 4) + 1;
    setTimeout(() => {
      setConnexion(false);
    }, random * 1000);
  }, []);

  return (
    <ATMTemplate className="flex flex-col gap-5 justify-center items-center max-w-2xl font-monospace">
      {connexion && (
        <div className="h-screen w-screen fixed top-0 left-0 bg-white z-50 flex flex-col gap-5 items-center justify-center">
          <img src="/assets/brand/atm.svg" className="w-[250px]" alt="atm" />
          <Paragraph className="font-bold mt-10 dost-loading flex">
            Connexion en cours
          </Paragraph>
        </div>
      )}
      <BackButton
        className="absolute top-5 left-5 !text-black"
        onClick={() => {
          if (action.length) {
            setAction("");
          } else {
            navigate("/payment/new");
          }
        }}
      />
      <img
        src="/assets/brand/atm.svg"
        className="w-[100px] absolute top-5 right-5"
        alt="atm"
      />

      {action.length ? (
        <div>
          {action === "payment" && <ATMPayment callback={backAction} />}
          {action === "withdrawal" && <ATMWithdrawal callback={backAction} />}
        </div>
      ) : (
        <div className="flex flex-col gap-5 justify-center items-center w-full">
          <div className="absolute md:static top-16 px-10">
            <Paragraph className="text-center font-medium">{name}</Paragraph>
            <SubTitle className="text-center text-green-700">
              Choisissez une opération
            </SubTitle>
          </div>
          <PrimaryButton
            className="w-full bg-gradient-to-b from-green-600 to-green-700"
            size="large"
            onClick={() => setAction("payment")}
          >
            Versement
          </PrimaryButton>
          <PrimaryButton
            className="w-full bg-gradient-to-b from-green-600 to-green-700"
            size="large"
            onClick={() => setAction("withdrawal")}
          >
            Retrait
          </PrimaryButton>
        </div>
      )}
    </ATMTemplate>
  );
}
