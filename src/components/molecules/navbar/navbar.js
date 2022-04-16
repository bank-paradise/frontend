import { PrimaryButton, SecondaryButton } from "components/atoms";
import { logout, userData } from "features/authentication/user.model";
import checkPermissions from "helpers/checkPermissions";
import joinClasses from "helpers/joinClasses";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = ({ connected = true, items = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  let navigate = useNavigate();

  const user = useSelector(userData);

  const dispatch = useDispatch();
  return (
    <>
      <nav className="h-[73px] w-full bg-gradient-to-r from-primary to-primary-light fixed z-10">
        {/* DESKTOP VERSION */}
        <div className="flex justify-between m-auto items-center h-full px-[10%] max-w-[1920px] hidden lg:flex">
          <Link to="/" className="flex items-center justify-center h-full">
            <img src="/assets/brand/logo.svg" alt="accueil du site" />
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
                  <Link to="/">Compte</Link>
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
        <div className="flex justify-between items-center h-full px-[10%] lg:hidden">
          <Link to="/" className="flex items-center justify-center h-full">
            <img src="/assets/brand/logo.svg" alt="accueil du site" />
          </Link>
          <button onClick={() => setIsOpen(!isOpen)}>
            <span
              className={joinClasses(
                "block h-0.5 w-5 my-1 transition-all transform bg-white",
                isOpen && "absolute rotate-45 translate-y-0.5"
              )}
            />
            <span
              className={joinClasses(
                "block bg-white h-0.5 w-5 my-1 transition-all",
                isOpen && "opacity-0"
              )}
            />
            <span
              className={joinClasses(
                "block h-0.5 w-5 my-1 transition-all transform bg-white",
                isOpen && "absolute -rotate-45 -translate-y-2"
              )}
            />
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className="fixed h-screen w-screen bg-white flex items-end lg:hidden animate__animated animate__fadeIn z-[5]">
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
              {checkPermissions(user, 2) && (
                <li className="w-full">
                  <SecondaryButton
                    onClick={() => {
                      navigate("/commu/users");
                      setIsOpen(false);
                    }}
                    className="flex gap-2 items-center font-medium"
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
              <li className="w-full">
                <PrimaryButton onClick={() => dispatch(logout())}>
                  Déconnexion
                </PrimaryButton>
              </li>
            </ul>
          )}
        </div>
      )}
      <div className="h-[73px]" />
    </>
  );
};
