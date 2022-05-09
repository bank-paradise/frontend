import {
  BackButton,
  Paragraph,
  PrimaryButton,
  SubTitle,
} from "components/atoms";
import { DefaultTemplate } from "components/templates";
import { userData } from "features/authentication/user.model";
import { formatPrice } from "helpers/formatPrice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ATMPayment from "./_components/payment";
import ATMWithdrawal from "./_components/withdrawal";

export default function ATMPage() {
  const { name } = useSelector(userData);
  let navigate = useNavigate();
  const [action, setAction] = useState("");

  return (
    <DefaultTemplate className="flex flex-col gap-5 justify-center items-center max-w-2xl">
      <BackButton
        className="absolute top-5 left-5"
        onClick={() => {
          if (action.length) {
            setAction("");
          } else {
            navigate("/payment/new");
          }
        }}
      />
      {action.length ? (
        <div>
          {action === "payment" && <ATMPayment />}
          {action === "withdrawal" && <ATMWithdrawal />}
        </div>
      ) : (
        <div className="flex flex-col gap-5 justify-center items-center w-full">
          <div className="absolute md:static top-16 px-10">
            <Paragraph className="text-center dark:text-white">
              {name}
            </Paragraph>
            <SubTitle className="text-center">
              Choisissez une opération
            </SubTitle>
          </div>
          <PrimaryButton
            className="w-full"
            size="large"
            onClick={() => setAction("payment")}
          >
            Versement
          </PrimaryButton>
          <PrimaryButton
            className="w-full"
            size="large"
            onClick={() => setAction("withdrawal")}
          >
            Retrait
          </PrimaryButton>
        </div>
      )}
    </DefaultTemplate>
  );
}
