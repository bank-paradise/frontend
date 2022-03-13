import { Navbar } from "components/molecules";

export const DefaultTemplate = ({ user = {}, children }) => {
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
      <main className="px-[10%] max-w-[1920px] m-auto">{children}</main>
    </div>
  );
};
