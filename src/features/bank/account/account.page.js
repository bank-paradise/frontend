import { useEffect } from "react";
import { Howl, Howler } from "howler";
import Pusher from "pusher-js";
import { DefaultTemplate } from "components/templates";
import { userData } from "features/authentication/user.model";
import { useDispatch, useSelector } from "react-redux";
import { bankAllInfo, createTransaction, getBank } from "../bank.model";
import Activities from "./_components/activities";
import BankHeader from "./_components/bankHeader";
import Statistics from "./_components/statistics";

export default function BankAccount() {
  const userInfo = useSelector(userData);
  const { accounts, currency } = useSelector(bankAllInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBank());

    Pusher.logToConsole = true;

    const pusher = new Pusher("15c2976a1d4aa2b7300e", {
      broadcaster: "pusher",
      wsHost: process.env.REACT_APP_WS_HOST,
      forceTLS: process.env.REACT_APP_WS_TLS === "true",
      disableStats: true,
    });

    const channel = pusher.subscribe(`transaction.${userInfo.id}`);

    channel.bind("transaction.received", async () => {
      await dispatch(getBank());
      let sound = new Howl({
        src: ["/assets/sounds/notification.mp3"],
      });

      sound.play();
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addTransaction = () => {
    dispatch(
      createTransaction({
        amount: 1,
        transmitter: "f47a4352-09a4-479a-9f3c-41366458568a",
        receiver: "7d0d3d0e-8d96-429e-9c4c-9337f26b6503",
      })
    );
  };

  return (
    <DefaultTemplate>
      <div className="w-full my-7">
        <h1 className="text-2xl font-medium">Bonjour {userInfo.name}</h1>
        <button onClick={addTransaction}>create transaction</button>
      </div>
      {accounts && (
        <div className="flex flex-col gap-10">
          <BankHeader accounts={accounts} currency={currency} />
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
            <div className="w-full lg:max-w-[350px]">
              <Statistics />
            </div>
            <Activities />
          </div>
        </div>
      )}
    </DefaultTemplate>
  );
}
