import { SubTitle } from "components/atoms";
import { Button } from "components/atoms/buttons";
import { useNavigate } from "react-router-dom";

export default function SelectPaymentMethod({ setMethod = () => { } }) {
  let navigate = useNavigate();
  return (
    <div className="w-full">
      <SubTitle className="text-center mb-10">Que voulez-vous faire ?</SubTitle>

      <div className="w-full flex flex-col md:flex-row gap-10">
        <button
          className="w-full bg-gray-50 dark:bg-slate-700 dark:text-white shadow-md rounded-xl flex flex-col justify-center items-center py-5 md:h-[300px] gap-5 hover:scale-105 transition-all text-gray-700 hover:text-green-500 animate__animated active:animate__fadeOut"
          onClick={() => setMethod("personnal")}
        >
          <svg width="5em" height="5em" viewBox="0 0 36 36">
            <path
              fill="currentColor"
              d="M24.89 26h7.86c-.66-8.71-4.41-14.12-9.22-17.32l2.19-4.78a1 1 0 0 0-.91-1.4H11.1a1 1 0 0 0-.91 1.4l1.2 2.6h10.12l-.9 2h-1.85A24.9 24.9 0 0 1 20 13.19a24.49 24.49 0 0 1 .32 3l-1.58 1.11a22.54 22.54 0 0 0-.32-3.86A21.74 21.74 0 0 0 17 8.5h-1a28.22 28.22 0 0 0-2.48 3.7a23.91 23.91 0 0 0-1.49 3.46l-1.37-.91a22.78 22.78 0 0 1 1.47-3.34a30.81 30.81 0 0 1 1.92-2.91H12.3l.08.17c-5.3 3.53-9.33 9.73-9.33 20.08a1.65 1.65 0 0 0 1.56 1.75h8a2.67 2.67 0 0 1 1.6-4.5a2.67 2.67 0 0 1-.37-1.34a2.7 2.7 0 0 1 2.7-2.7h6a2.7 2.7 0 0 1 2.7 2.7a2.63 2.63 0 0 1-.35 1.34Z"
              className="clr-i-solid clr-i-solid-path-1"
            ></path>
            <path
              fill="currentColor"
              d="M21.6 28.5a1 1 0 0 0-1-1h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 1-1Z"
              className="clr-i-solid clr-i-solid-path-2"
            ></path>
            <path
              fill="currentColor"
              d="M22.54 23.5h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2Z"
              className="clr-i-solid clr-i-solid-path-3"
            ></path>
            <path
              fill="currentColor"
              d="M22 31.5h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2Z"
              className="clr-i-solid clr-i-solid-path-4"
            ></path>
            <path
              fill="currentColor"
              d="M32.7 31.5h-7a1 1 0 0 0 0 2h7a1 1 0 0 0 0-2Z"
              className="clr-i-solid clr-i-solid-path-5"
            ></path>
            <path
              fill="currentColor"
              d="M33.7 27.5h-7a1 1 0 0 0 0 2h7a1 1 0 0 0 0-2Z"
              className="clr-i-solid clr-i-solid-path-6"
            ></path>
            <path fill="none" d="M0 0h36v36H0z"></path>
          </svg>
          <p className="font-bold">Envoyer de l'argent</p>
        </button>
        <button
          className="w-full bg-gray-50 dark:bg-slate-700 dark:text-white shadow-md rounded-xl flex flex-col justify-center items-center py-5 md:h-[300px] gap-5 hover:scale-105 transition-all text-gray-700 hover:text-green-500"
          onClick={() => setMethod("professional")}
        >
          <svg width="5em" height="5em" viewBox="0 0 512 512">
            <path
              fill="currentColor"
              d="M480 448h-12a4 4 0 0 1-4-4V273.51a4 4 0 0 0-5.24-3.86a104.92 104.92 0 0 1-28.32 4.78c-1.18 0-2.3.05-3.4.05a108.22 108.22 0 0 1-52.85-13.64a8.23 8.23 0 0 0-8 0a108.18 108.18 0 0 1-52.84 13.64a106.11 106.11 0 0 1-52.46-13.79a8.21 8.21 0 0 0-8.09 0a108.14 108.14 0 0 1-53.16 13.8a106.19 106.19 0 0 1-52.77-14a8.25 8.25 0 0 0-8.16 0a106.19 106.19 0 0 1-52.77 14c-1.09 0-2.19 0-3.37-.05h-.06a104.91 104.91 0 0 1-29.28-5.09a4 4 0 0 0-5.23 3.8V444a4 4 0 0 1-4 4H32.5c-8.64 0-16.1 6.64-16.48 15.28A16 16 0 0 0 32 480h447.5c8.64 0 16.1-6.64 16.48-15.28A16 16 0 0 0 480 448Zm-256-68a4 4 0 0 1-4 4h-88a4 4 0 0 1-4-4v-64a12 12 0 0 1 12-12h72a12 12 0 0 1 12 12Zm156 68h-72a4 4 0 0 1-4-4V316a12 12 0 0 1 12-12h56a12 12 0 0 1 12 12v128a4 4 0 0 1-4 4Zm112.57-277.72l-42.92-98.49C438.41 47.62 412.74 32 384.25 32H127.7c-28.49 0-54.16 15.62-65.4 39.79l-42.92 98.49c-9 19.41 2.89 39.34 2.9 39.35l.28.45c.49.78 1.36 2 1.89 2.78c.05.06.09.13.14.2l5 6.05a7.45 7.45 0 0 0 .6.65l5 4.83l.42.36a69.65 69.65 0 0 0 9.39 6.78v.05a74 74 0 0 0 36 10.67h2.47a76.08 76.08 0 0 0 51.89-20.31l.33-.31a7.94 7.94 0 0 1 10.89 0l.33.31a77.3 77.3 0 0 0 104.46 0a8 8 0 0 1 10.87 0a77.31 77.31 0 0 0 104.21.23a7.88 7.88 0 0 1 10.71 0a76.81 76.81 0 0 0 52.31 20.08h2.49a71.35 71.35 0 0 0 35-10.7c.95-.57 1.86-1.17 2.78-1.77A71.33 71.33 0 0 0 488 212.17l1.74-2.63q.26-.4.48-.84c1.66-3.38 10.56-20.76 2.35-38.42Z"
            ></path>
          </svg>
          <p className="font-bold">Payer un bien ou un service</p>
        </button>
      </div>

      <Button
        className="mt-10 bg-gradient-to-r from-primary to-primary-light py-5 text-lg font-bold text-white flex justify-center group w-full md:w-1/2 m-auto hover:scale-105 transition-all items-center gap-2"
        onClick={() => navigate("/atm")}
      >
        <svg
          width="3em"
          height="3em"
          viewBox="0 0 24 24"
          className="opacity-60 group-hover:opacity-100"
        >
          <path
            fill="currentColor"
            d="M11 17h2v-1h1c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1h-3v-1h4V8h-2V7h-2v1h-1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h3v1H9v2h2v1zm9-13H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V6h16v12z"
          ></path>
        </svg>
        <svg
          width="5em"
          height="5em"
          viewBox="0 0 24 24"
          className="opacity-60 group-hover:opacity-100"
        >
          <path
            fill="currentColor"
            d="M8 9v1.5h2.25V15h1.5v-4.5H14V9zM6 9H3c-.55 0-1 .45-1 1v5h1.5v-1.5h2V15H7v-5c0-.55-.45-1-1-1zm-.5 3h-2v-1.5h2V12zM21 9h-4.5c-.55 0-1 .45-1 1v5H17v-4.5h1V14h1.5v-3.51h1V15H22v-5c0-.55-.45-1-1-1z"
          ></path>
        </svg>
      </Button>
    </div>
  );
}
