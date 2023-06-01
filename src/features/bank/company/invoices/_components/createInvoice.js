import {
  Paragraph,
  PrimaryButton,
  SecondaryCard,
  Select,
} from "components/atoms";
import { communityAccounts } from "features/community/community.model";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function CreateInvoice({ company_id = 0 }) {
  const commuAccounts = useSelector(communityAccounts);

  const [invoice, setInvoice] = useState({
    recipient_type: null,
    recipient_id: null,
    amount: 0,
    description: "",
  });

  return (
    <SecondaryCard>
      <Paragraph className="text-black dark:text-white font-bold text-center">
        La facture est destinée à :
      </Paragraph>
      {!invoice.recipient_type ? (
        <div className="flex justify-between px-10 py-5">
          <PrimaryButton
            onClick={() =>
              setInvoice({ ...invoice, recipient_type: "company" })
            }
          >
            Entreprise
          </PrimaryButton>
          <PrimaryButton
            onClick={() =>
              setInvoice({ ...invoice, recipient_type: "personnal" })
            }
          >
            Particulier
          </PrimaryButton>
        </div>
      ) : (
        <div className="py-5">
          <Select
            className="border py-3 px-4 shadow-md rounded-md !text-lg"
            placeholder="choisir un bénéficiaire"
            onChange={(e) => {
              if (e.target.value === "") return;
              const selected = commuAccounts.personnal.find(
                (account) => account.rib === e.target.value
              );
              setInvoice({
                ...invoice,
                recipient_id: selected.rib,
              });
            }}
          >
            <option value="">
              {commuAccounts.personnal.length
                ? `Choisir${invoice.recipient_type === "company"
                  ? " une entreprise"
                  : " un joueur"
                }`
                : "Aucun membre"}
            </option>
            {invoice.recipient_type === "company" &&
              commuAccounts.professional.map((account) => (
                <option key={account.rib} value={account.rib}>
                  {account.name}
                </option>
              ))}
            {invoice.recipient_type === "personnal" &&
              commuAccounts.personnal.map((account) => (
                <option key={account.rib} value={account.rib}>
                  {account.name}
                </option>
              ))}
          </Select>
        </div>
      )}
    </SecondaryCard>
  );
}
