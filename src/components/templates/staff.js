import { Navbar, SubNavbar } from "components/molecules";
import joinClasses from "helpers/joinClasses";

export const StaffTemplate = ({
  connected = true,
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

  const adminnavitems = [
    {
      path: "/commu/invitation",
      name: "Invitation",
    },
    {
      path: "/commu/users",
      name: "Membres",
    },
    {
      path: "/commu/transactions",
      name: "Virements",
    },
    {
      path: "/commu/statistiques",
      name: "Statistiques",
    },
    {
      path: "/commu/settings",
      name: "Paramètres",
    },
  ];
  return (
    <div className="font-montserrat">
      <header>
        <Navbar items={navitems} connected={connected} />
      </header>
      <main className="flex flex-col md:flex-row">
        <SubNavbar items={adminnavitems} />
        <div className="px-14 py-10 w-full md:w-[calc(100vw-260px)]">
          {children}
        </div>
      </main>
    </div>
  );
};
