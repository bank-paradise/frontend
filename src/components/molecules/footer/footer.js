import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-primary to-primary-light px-[5%] xl:px-[10%] max-w-[1500px] m-auto py-4 flex flex-col md:flex-row gap-2 md:justify-between mt-10">
      <div className="flex gap-4 items-center text-white text-sm">
        <Link to="/" className="hover:underline">
          Mentions légales
        </Link>
        <Link to="/" className="hover:underline">
          CGU
        </Link>
      </div>
      <div className="text-white text-sm flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center">
        <p>2022 © Tous droits réservés | bank-paradise.fr</p>
        <img
          src="/assets/brand/logo.svg"
          alt=""
          className="h-[25px] hidden md:block"
        />
      </div>
    </footer>
  );
}
