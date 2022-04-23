import { SubTitle } from "components/atoms";
import { DefaultTemplate } from "components/templates";
import { getCommunity } from "features/community/community.model";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { bankProfessionalAccounts } from "../bank.model";
import PersonalPayment from "./_components/personalPayment";
import ProfessionalPayment from "./_components/professionalPayment";
import SelectPaymentMethod from "./_components/selectPaymentMethod";

export default function PaymentPage() {
  const { type, companyId } = useParams();
  const dispatch = useDispatch();
  let location = useLocation();
  const proAccounts = useSelector(bankProfessionalAccounts);
  const [paymentType, setPaymentType] = useState(type);

  useEffect(() => {
    dispatch(getCommunity());
  }, []);

  const companyAccount = () => {
    return proAccounts.find((account) => account.id === Number(companyId));
  };

  const checkPaymentType = (type) => {
    if (type === "professional") return true;
    else if (type === "personnal") return true;
    else return false;
  };

  const backtoMenu = () => {
    setPaymentType("none");
    if (location.state && location.state.receiver) {
      location.state = null;
    }
  };

  return (
    <DefaultTemplate className="flex justify-center items-center">
      <div className="flex flex-col items-center gap-5 w-full">
        {checkPaymentType(paymentType) ? (
          <div className="animate__animated animate__fadeInDown">
            {paymentType === "personnal" ? (
              <PersonalPayment
                transmitter={companyAccount()}
                backtoMenu={backtoMenu}
                receiver={
                  location.state && location.state.receiver
                    ? location.state.receiver
                    : null
                }
              />
            ) : (
              <ProfessionalPayment
                transmitter={companyAccount()}
                backtoMenu={backtoMenu}
                receiver={
                  location.state && location.state.receiver
                    ? location.state.receiver
                    : null
                }
              />
            )}
          </div>
        ) : (
          <SelectPaymentMethod setMethod={setPaymentType} />
        )}
      </div>
    </DefaultTemplate>
  );
}
