import { SubTitle } from "components/atoms";
import { DefaultTemplate } from "components/templates";
import { getCommunity } from "features/community/community.model";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import PersonalPayment from "./_components/personalPayment";
import ProfessionalPayment from "./_components/professionalPayment";
import SelectPaymentMethod from "./_components/selectPaymentMethod";

export default function PaymentPage() {
  const { type } = useParams();
  const dispatch = useDispatch();
  const [paymentType, setPaymentType] = useState(type);

  useEffect(() => {
    dispatch(getCommunity());
  }, []);

  const checkPaymentType = (type) => {
    if (type === "professional") return true;
    else if (type === "personnal") return true;
    else return false;
  };

  const backtoMenu = () => {
    setPaymentType("none");
  };

  return (
    <DefaultTemplate className="flex justify-center items-center">
      <div className="flex flex-col items-center gap-5 w-full">
        {console.log(checkPaymentType(paymentType))}
        {checkPaymentType(paymentType) ? (
          <div className="animate__animated animate__fadeInDown">
            {paymentType === "personnal" ? (
              <PersonalPayment backtoMenu={backtoMenu} />
            ) : (
              <ProfessionalPayment backtoMenu={backtoMenu} />
            )}
          </div>
        ) : (
          <SelectPaymentMethod setMethod={setPaymentType} />
        )}
      </div>
    </DefaultTemplate>
  );
}
