import { Navbar } from "components/molecules";
import joinClasses from "helpers/joinClasses";

export const DefaultTemplate = ({
  connected = true,
  user = {},
  className = "",
  children,
}) => {
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
        <Navbar items={navitems} connected={connected} />
      </header>
      <main
        className={joinClasses(
          "px-[5%] xl:px-[10%] max-w-[1500px] m-auto min-h-[calc(100vh-73px)]",
          className
        )}
      >
        {children}
      </main>
    </div>
  );
};
