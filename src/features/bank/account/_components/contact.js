import { useNavigate } from "react-router";

export default function Contact({ receiver = {} }) {
  let navigate = useNavigate();
  return (
    <button
      className="flex flex-col gap-1 max-w-min w-full group m-auto items-center"
      onClick={() =>
        navigate(`/payment/${receiver.type}`, { state: { receiver } })
      }
    >
      <div className="h-14 w-14 rounded-full bg-gray-400 flex items-center group-hover:bg-gray-500 justify-center">
        <p className="uppercase text-2xl text-white">{receiver.name[0]}</p>
      </div>
      <p className="text-center capitalize text-sm w-full group-hover:font-medium truncate">
        {receiver.name}
      </p>
    </button>
  );
}
