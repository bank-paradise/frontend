import { useEffect, useState } from "react";
import { fetchTransactions } from "api/community";
import { StaffTemplate } from "components/templates";
import BankTitle from "features/bank/account/_components/bankTitle";
import TransactionsList from "./_components/transactionsList";
import SendTransaction from "./_components/sendTransaction";

export default function CommunityTransactions() {
  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    const transactionsResponse = await fetchTransactions();
    if (transactionsResponse.status === "done")
      setTransactions(transactionsResponse.response.transactions);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <StaffTemplate>
      <BankTitle>Transactions</BankTitle>
      <SendTransaction callback={getTransactions} />
      <hr className="my-10" />
      <TransactionsList list={transactions.reverse()} />
    </StaffTemplate>
  );
}
