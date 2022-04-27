import { useEffect, useState } from "react";
import { fetchMembers } from "api/community";
import { StaffTemplate } from "components/templates";
import BankTitle from "features/bank/account/_components/bankTitle";
import MembersList from "./_components/membersList";
import { Loader } from "components/atoms";

export default function CommunityMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMembers = async () => {
    setLoading(true);
    const membersResponse = await fetchMembers();
    setLoading(false);
    if (membersResponse.status === "done")
      setMembers(membersResponse.response.members);
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <StaffTemplate>
      <BankTitle>Membres</BankTitle>
      {!loading ? (
        <MembersList list={members} callback={getMembers} />
      ) : (
        <Loader className="my-10" />
      )}
    </StaffTemplate>
  );
}
