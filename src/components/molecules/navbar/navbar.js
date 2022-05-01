import { PrimaryButton, SecondaryButton } from "components/atoms";
import { logout, userData } from "features/authentication/user.model";
import checkPermissions from "helpers/checkPermissions";
import joinClasses from "helpers/joinClasses";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import getMobileOperatingSystem from "helpers/getMobileSystem";
import UseAnimation from "react-useanimations";
import burgerMenu from "react-useanimations/lib/menu4";
import heart from "react-useanimations/lib/heart";

export const Navbar = ({ connected = true, items = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  let navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(userData);
  const dispatch = useDispatch();

  const isInStandaloneMode = () =>
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone ||
    document.referrer.includes("android-app://");

  return (
    <>
      <nav
        className={joinClasses(
          getMobileOperatingSystem() === "ios" && isInStandaloneMode()
            ? "h-[100px]"
            : "h-[60px]",
          "border-t border-gray-200 lg:border-none lg:h-[73px] w-full bg-white lg:bg-gradient-to-r from-primary to-primary-light fixed z-10 bottom-0 lg:top-0"
        )}
      >
        {/* DESKTOP VERSION */}
        <div className="flex justify-between m-auto items-center h-full px-[10%] max-w-[1920px] hidden lg:flex">
          <Link to="/" className="flex items-center justify-center h-full">
            <img src="/assets/brand/logo-beta.svg" alt="accueil du site" />
          </Link>
          {user && (
            <div className="flex justify-between gap-16 text-white">
              <ul className="flex gap-7 items-center">
                {items.map((item, index) => {
                  if (item.dropdown) {
                    return (
                      <li key={index} className="group hover:underline">
                        <Link
                          to={item.path}
                          className="flex items-center gap-1"
                        >
                          {item.name}

                          <svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="m7 10l5 5l5-5H7z"
                            ></path>
                          </svg>
                        </Link>
                        <ul className="absolute bg-white group-hover:flex hidden px-5 py-3 rounded-md shadow-md flex-col justify-start gap-3 animate__animated animate__fadeIn">
                          {item.dropdown.map((dropdownItem, index) => {
                            if (!dropdownItem.path) return null;
                            return (
                              <li
                                key={index}
                                className="text-secondary text-sm hover:text-primary"
                              >
                                <Link
                                  className="flex items-center gap-1"
                                  to={dropdownItem.path}
                                  dangerouslySetInnerHTML={{
                                    __html: dropdownItem.name,
                                  }}
                                ></Link>
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
                  <Link to="/account">Compte</Link>
                </li>
                {checkPermissions(user, 2) && (
                  <li>
                    <SecondaryButton
                      className="flex gap-2 items-center px-4 font-medium"
                      onClick={() => navigate("/commu/users")}
                    >
                      <svg width="1.3em" height="1.3em" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12 23C6.443 21.765 2 16.522 2 11V5l10-4l10 4v6c0 5.524-4.443 10.765-10 12ZM4 6v5a10.58 10.58 0 0 0 8 10a10.58 10.58 0 0 0 8-10V6l-8-3Z"
                        ></path>
                        <circle
                          cx="12"
                          cy="8.5"
                          r="2.5"
                          fill="currentColor"
                        ></circle>
                        <path
                          fill="currentColor"
                          d="M7 15a5.782 5.782 0 0 0 5 3a5.782 5.782 0 0 0 5-3c-.025-1.896-3.342-3-5-3c-1.667 0-4.975 1.104-5 3Z"
                        ></path>
                      </svg>
                      Staff
                    </SecondaryButton>
                  </li>
                )}
                <li>
                  <PrimaryButton onClick={() => dispatch(logout())}>
                    Déconnexion
                  </PrimaryButton>
                </li>
              </ul>
            </div>
          )}
        </div>
        {/* MOBILE VERSION */}
        {/* 
        <div className="flex justify-between items-center h-full px-[10%] lg:hidden">
          <Link to="/" className="flex items-center justify-center h-full">
            <img src="/assets/brand/logo.svg" alt="accueil du site" />
          </Link>

          <UseAnimation
            reverse={isOpen}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            size={50}
            strokeColor="#fff"
            className="cursor-pointer"
            wrapperStyle={{ marginTop: "5px" }}
            animation={burgerMenu}
            speed={1.5}
          />
        </div> */}
        <div
          className={joinClasses(
            "flex justify-between items-center h-full text-gray-600 px-[5%] sm:px-[10%] lg:hidden text-[14px]",
            getMobileOperatingSystem() === "ios" &&
              isInStandaloneMode() &&
              "pb-5"
          )}
        >
          <Link
            to="/"
            className={joinClasses(
              "flex flex-col items-center gap-1 active:text-primary",
              location.pathname === "/" && "text-primary font-medium"
            )}
          >
            <svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 9.5L12 4l9 5.5M19 13v6.4a.6.6 0 0 1-.6.6H5.6a.6.6 0 0 1-.6-.6V13"
              ></path>
            </svg>
            <p className="text-xs">Accueil</p>
          </Link>
          <Link
            to="/activities"
            className={joinClasses(
              "flex flex-col items-center gap-1 active:text-primary",
              location.pathname === "/activities" && "text-primary font-medium"
            )}
          >
            <svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5s1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5S5.5 6.83 5.5 6S4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5s1.5-.68 1.5-1.5s-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"
              ></path>
            </svg>
            <p className="text-xs">Activités</p>
          </Link>
          <Link
            to="/payment/new"
            className={joinClasses(
              "flex flex-col items-center gap-1 text-primary"
            )}
          >
            <svg width="2.8em" height="2.8em" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
              ></path>
            </svg>
          </Link>
          <Link
            to="/entreprises"
            className={joinClasses(
              "flex flex-col items-center gap-1 active:text-primary",
              location.pathname.includes("/entreprises") &&
                "text-primary font-medium"
            )}
          >
            <svg width="1.5em" height="1.5em" viewBox="0 0 32 32">
              <path
                fill="currentColor"
                d="M8 8h2v4H8zm0 6h2v4H8zm6-6h2v4h-2zm0 6h2v4h-2zm-6 6h2v4H8zm6 0h2v4h-2z"
              ></path>
              <path
                fill="currentColor"
                d="M30 14a2 2 0 0 0-2-2h-6V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v26h28ZM4 4h16v24H4Zm18 24V14h6v14Z"
              ></path>
            </svg>
            <p className="text-xs">Entreprises</p>
          </Link>
          <Link
            to="/account"
            className={joinClasses(
              "flex flex-col items-center gap-1 active:text-primary",
              location.pathname === "/account" && "text-primary font-medium"
            )}
          >
            <svg width="1.5em" height="1.5em" viewBox="0 0 256 256">
              <circle
                cx="128"
                cy="96"
                r="64"
                fill="currentColor"
                opacity=".2"
              ></circle>
              <path
                fill="currentColor"
                d="M231.9 212a120.7 120.7 0 0 0-67.1-54.2a72 72 0 1 0-73.6 0A120.7 120.7 0 0 0 24.1 212a8 8 0 1 0 13.8 8a104.1 104.1 0 0 1 180.2 0a8 8 0 1 0 13.8-8ZM72 96a56 56 0 1 1 56 56a56 56 0 0 1-56-56Z"
              ></path>
            </svg>
            <p className="text-xs">Compte</p>
          </Link>
        </div>
      </nav>

      {/* <div
        className={joinClasses(
          "transition-all ease-in-out duration-300 fixed h-screen w-screen bg-white dark:bg-slate-800 dark:text-white flex items-end lg:hidden animate__animated animate__fadeIn z-[5]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {user && (
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
                            <Link
                              to={dropdownItem.path}
                              dangerouslySetInnerHTML={{
                                __html: dropdownItem.name,
                              }}
                              className="w-full flex items-center gap-2"
                            ></Link>
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
              <PrimaryButton onClick={() => dispatch(logout())}>
                Déconnexion
              </PrimaryButton>
            </li>
          </ul>
        )}
      </div> */}

      <div className="lg:h-[73px]" />

      <div
        className={joinClasses(
          "fixed right-5  lg:hidden flex flex-col gap-5 z-[5]",
          getMobileOperatingSystem() === "ios" && isInStandaloneMode()
            ? "bottom-[120px]"
            : "bottom-[80px]"
        )}
      >
        {/* <button
          className="h-[55px] w-[55px] bg-gray-100  flex items-center justify-center text-gray-700 rounded-full shadow-lg hover:bg-gray-300"
          onClick={() => navigate("/payment/new")}
        >
          <svg width="2em" height="2em" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
            ></path>
          </svg>
        </button> */}
        {user && checkPermissions(user, 2) && (
          <button
            className="h-[55px] w-[55px] bg-primary flex items-center justify-center text-white rounded-full shadow-lg hover:bg-primary-dark"
            onClick={() => navigate("/commu/users")}
          >
            <svg width="2em" height="2em" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 23C6.443 21.765 2 16.522 2 11V5l10-4l10 4v6c0 5.524-4.443 10.765-10 12ZM4 6v5a10.58 10.58 0 0 0 8 10a10.58 10.58 0 0 0 8-10V6l-8-3Z"
              ></path>
              <circle cx="12" cy="8.5" r="2.5" fill="currentColor"></circle>
              <path
                fill="currentColor"
                d="M7 15a5.782 5.782 0 0 0 5 3a5.782 5.782 0 0 0 5-3c-.025-1.896-3.342-3-5-3c-1.667 0-4.975 1.104-5 3Z"
              ></path>
            </svg>
          </button>
        )}
      </div>
    </>
  );
};
