import { Navbar } from "components/molecules";
import { bankProfessionalAccounts } from "features/bank/bank.model";
import joinClasses from "helpers/joinClasses";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const DefaultTemplate = ({
  connected = true,
  user = {},
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
            name: "Ajouter",
          },
        ],
      },
    ]);
  }, [enterprisesAccounts]);

  return (
    <div className="font-montserrat">
      <header>
        <Navbar items={navitems} connected={connected} />
      </header>
      <main
        className={joinClasses(
          "px-[5%] xl:px-[10%] max-w-[1500px] m-auto min-h-[calc(100vh-73px)] py-3 dark:bg-slate-900",
          className
        )}
      >
        {children}
      </main>
    </div>
  );
};
