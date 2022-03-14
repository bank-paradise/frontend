import { Navbar } from "components/molecules";
import joinClasses from "helpers/joinClasses";

export const DefaultTemplate = ({ user = {}, className = "", children }) => {
  const navitems = [
    {
      path: "/activities",
      name: "Activités",
    },
    {
      path: "/transactions",
      name: "Virements",
    },
    {
      path: "/entreprises",
      name: "Entreprises",
      dropdown: [
        {
          path: "/entreprises/add",
          name: "LS Custom",
        },
        {
          path: "/entreprises/add",
          name: "Ajouter",
        },
      ],
    },
  ];
  return (
    <div className="font-montserrat">
      <header>
        <Navbar items={navitems} />
      </header>
      <main
        className={joinClasses(
          "px-[10%] max-w-[1920px] m-auto min-h-[calc(100vh-73px)]",
          className
        )}
      >
        {children}
      </main>
    </div>
  );
};
