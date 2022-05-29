import { Footer, Navbar, SubNavbar } from "components/molecules";
import { bankProfessionalAccounts } from "features/bank/bank.model";
import joinClasses from "helpers/joinClasses";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const StaffTemplate = ({
  connected = true,
  className = "",
  children,
}) => {
  const location = useLocation();
  const enterprisesAccounts = useSelector(bankProfessionalAccounts);
  const [navitems, setNavitems] = useState([]);

  useEffect(() => window.scrollTo(0, 0), [location.pathname]);

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
        path: "/payment/new",
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
      path: "/commu/salary",
      name: "Salaires",
    },
    {
      path: "/commu/transactions",
      name: "Argents",
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
        <div className="px-[5%] md:px-14 py-10 w-full md:w-[calc(100vw-260px)] min-h-[calc(100vh-73px)]">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};
