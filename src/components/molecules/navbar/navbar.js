import { PrimaryButton } from "components/atoms";
import { Link } from "react-router-dom";

export const Navbar = ({ items = [] }) => {
  return (
    <>
      <nav className="h-[73px] w-full bg-gradient-to-r from-primary to-primary-light fixed">
        <div className="flex justify-between m-auto items-center h-full px-[10%] max-w-[1920px] hidden lg:flex">
          <Link to="/" className="flex items-center justify-center h-full">
            <img src="/assets/brand/logo.svg" alt="accueil du site" />
          </Link>
          <div className="flex justify-between gap-16 text-white">
            <ul className="flex gap-7 items-center">
              {items.map((item) => {
                if (item.dropdown) {
                  return (
                    <li key={item.path} className="group hover:underline">
                      <Link to={item.path} className="flex items-center gap-1">
                        {item.name}

                        <svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
                          <path fill="currentColor" d="m7 10l5 5l5-5H7z"></path>
                        </svg>
                      </Link>
                      <ul className="absolute bg-white group-hover:flex hidden px-5 py-3 rounded-md shadow-md flex-col gap-3">
                        {item.dropdown.map((dropdownItem) => {
                          return (
                            <li
                              key={dropdownItem.path}
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
                  <li>
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
      </nav>
      <div className="h-[73px]" />
    </>
  );
};
