import joinClasses from "helpers/joinClasses";
import { Link, useLocation } from "react-router-dom";

export const SubNavbar = ({ items = [] }) => {
  const location = useLocation();

  return (
    <>
      <nav className="md:h-screen md:w-[260px] md:bg-primary-light flex px-5 md:px-10 py-3 md:py-10 md:fixed justify-center md:justify-start">
        <ul className="flex md:flex-col gap-7 text-black md:text-white overflow-x-auto border-b-2 border-primary md:border-0 py-2">
          {items.map((item, index) => (
            <li key={index}>
              <Link
                className={joinClasses(
                  "hover:border-b",
                  location.pathname === item.path &&
                    "bg-primary md:bg-transparent p-2 md:p-0 md:border-b text-white"
                )}
                to={item.path}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="md:h-screen md:w-[260px] hidden md:block" />
    </>
  );
};
