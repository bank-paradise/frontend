import { fetchInvitations } from "api/community";
import { StaffTemplate } from "components/templates";
import BankTitle from "features/bank/account/_components/bankTitle";
import { useEffect, useState } from "react";
import InvitationsList from "./_components/invitationsList";
import SendInvitation from "./_components/sendInvitation";

export default function CommunityInvitations() {
  const [invitations, setInvitations] = useState([]);

  const getInvitations = async () => {
    const invitResponse = await fetchInvitations();
    if (invitResponse.status === "done")
      setInvitations(invitResponse.response.invitations);
  };

  useEffect(() => {
    getInvitations();
  }, []);

  return (
    <StaffTemplate>
      <BankTitle>Invitations</BankTitle>
      <SendInvitation callback={getInvitations} />
      <hr className="my-10" />
      <InvitationsList list={invitations} />
    </StaffTemplate>
  );
}
