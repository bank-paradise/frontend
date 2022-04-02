import { useEffect, useState } from "react";
import { fetchMembers } from "api/community";
import { StaffTemplate } from "components/templates";
import BankTitle from "features/bank/account/_components/bankTitle";
import MembersList from "./_components/membersList";

export default function CommunityMembers() {
  const [members, setMembers] = useState([]);

  const getMembers = async () => {
    const membersResponse = await fetchMembers();
    if (membersResponse.status === "done")
      setMembers(membersResponse.response.members);
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <StaffTemplate>
      <BankTitle>Membres</BankTitle>
      <MembersList list={members} callback={getMembers} />
    </StaffTemplate>
  );
}
