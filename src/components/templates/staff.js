import { Navbar, SubNavbar } from "components/molecules";
import { bankProfessionalAccounts } from "features/bank/bank.model";
import joinClasses from "helpers/joinClasses";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const StaffTemplate = ({
  connected = true,
  className = "",
  children,
}) => {
  const enterprisesAccounts = useSelector(bankProfessionalAccounts);
  const [navitems, setNavitems] = useState([]);

  useEffect(() => {
    const enterprisesLinks = enterprisesAccounts.map((account) => ({
      name: account.name,
      path: `/entreprises/${account.id}`,
    }));

    setNavitems([
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
          ...enterprisesLinks,
          {
            path: "/entreprises/add",
            name: `<svg width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg> Ajouter`,
          },
        ],
      },
    ]);
  }, [enterprisesAccounts]);

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
    <div className="font-montserrat  dark:bg-slate-900">
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
