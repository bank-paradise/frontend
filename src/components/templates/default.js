import { Footer, Navbar } from "components/molecules";
import { bankProfessionalAccounts } from "features/bank/bank.model";
import joinClasses from "helpers/joinClasses";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const DefaultTemplate = ({
  connected = true,
  user = {},
  className = "",
  children,
}) => {
  const enterprisesAccounts = useSelector(bankProfessionalAccounts);
  const [navitems, setNavitems] = useState([]);
  const location = useLocation();

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
          enterprisesLinks.length < 3
            ? {
              path: "/entreprises/add",
              name: `<svg width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"></path></svg> Ajouter`,
            }
            : {},
        ],
      },
    ]);
  }, [enterprisesAccounts]);

  useEffect(() => window.scrollTo(0, 0), [location.pathname]);

  return (
    <div className="font-montserrat dark:bg-slate-900">
      <header>
        <Navbar items={navitems} connected={connected} />
      </header>
      <main
        className={joinClasses(
          "px-[5%] xl:px-[10%] max-w-[1500px] m-auto min-h-[calc(100vh-73px)] py-3 ",
          className
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};
