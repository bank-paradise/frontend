import { PrimaryButton } from "components/atoms";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = ({ items = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav className="h-[73px] w-full bg-gradient-to-r from-primary to-primary-light fixed z-10">
        {/* DESKTOP VERSION */}
        <div className="flex justify-between m-auto items-center h-full px-[10%] max-w-[1920px] hidden lg:flex">
          <Link to="/" className="flex items-center justify-center h-full">
            <img src="/assets/brand/logo.svg" alt="accueil du site" />
          </Link>
          <div className="flex justify-between gap-16 text-white">
            <ul className="flex gap-7 items-center">
              {items.map((item, index) => {
                if (item.dropdown) {
                  return (
                    <li key={index} className="group hover:underline">
                      <Link to={item.path} className="flex items-center gap-1">
                        {item.name}

                        <svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
                          <path fill="currentColor" d="m7 10l5 5l5-5H7z"></path>
                        </svg>
                      </Link>
                      <ul className="absolute bg-white group-hover:flex hidden px-5 py-3 rounded-md shadow-md flex-col gap-3">
                        {item.dropdown.map((dropdownItem, index) => {
                          return (
                            <li
                              key={index}
                              className="text-secondary text-sm hover:text-primary"
                            >
                              <Link to={dropdownItem.path}>
                                {dropdownItem.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                }
                return (
                  <li key={index}>
                    <Link to={item.path} className="hover:underline">
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ul className="flex gap-7 items-center">
              <li>
                <Link to="/">Compte</Link>
              </li>
              <li>
                <PrimaryButton>Déconnexion</PrimaryButton>
              </li>
            </ul>
          </div>
        </div>
        {/* MOBILE VERSION */}
        <div className="flex justify-between items-center h-full px-[10%] lg:hidden">
          <Link to="/" className="flex items-center justify-center h-full">
            <img src="/assets/brand/logo.svg" alt="accueil du site" />
          </Link>
          <button onClick={() => setIsOpen(!isOpen)}>x</button>
        </div>
      </nav>
      {isOpen && (
        <div className="fixed h-screen w-screen bg-white flex items-end lg:hidden">
          <ul className="h-[calc(100vh-100px)] overflow-y-auto flex flex-col w-full gap-10 px-[10%]">
            {items.map((item, index) => {
              if (item.dropdown) {
                return (
                  <li key={index} className="group ">
                    <p className="flex items-center gap-1 text-xl w-full group-hover:underline">
                      {item.name}

                      <svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
                        <path fill="currentColor" d="m7 10l5 5l5-5H7z"></path>
                      </svg>
                    </p>
                    <ul className="group-hover:flex hidden px-7 py-5 flex-col gap-5 bg-gray-100 w-full left-0 mt-5">
                      {item.dropdown.map((dropdownItem, index) => {
                        return (
                          <li
                            key={index}
                            className="text-secondary text-xl hover:text-primary"
                          >
                            <Link to={dropdownItem.path} className="w-full">
                              {dropdownItem.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              }
              return (
                <li className="w-full" key={index}>
                  <Link
                    to={item.path}
                    className="hover:underline text-xl w-full"
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
            <li className="w-full">
              <Link to="/account" className="hover:underline text-xl w-full">
                Compte
              </Link>
            </li>
            <li className="w-full">
              <PrimaryButton>Déconnexion</PrimaryButton>
            </li>
          </ul>
        </div>
      )}
      <div className="h-[73px]" />
    </>
  );
};
