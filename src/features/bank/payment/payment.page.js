import { SubTitle } from "components/atoms";
import { DefaultTemplate } from "components/templates";
import { getCommunity } from "features/community/community.model";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router";
import PersonalPayment from "./_components/personalPayment";
import ProfessionalPayment from "./_components/professionalPayment";
import SelectPaymentMethod from "./_components/selectPaymentMethod";

export default function PaymentPage() {
  const { type } = useParams();
  const dispatch = useDispatch();
  let location = useLocation();
  const [paymentType, setPaymentType] = useState(type);
  console.log(location);

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
    if (location.state && location.state.receiver) {
      location.state = null;
    }
  };

  return (
    <DefaultTemplate className="flex justify-center items-center">
      <div className="flex flex-col items-center gap-5 w-full">
        {console.log(checkPaymentType(paymentType))}
        {checkPaymentType(paymentType) ? (
          <div className="animate__animated animate__fadeInDown">
            {paymentType === "personnal" ? (
              <PersonalPayment
                backtoMenu={backtoMenu}
                receiver={
                  location.state && location.state.receiver
                    ? location.state.receiver
                    : null
                }
              />
            ) : (
              <ProfessionalPayment
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
