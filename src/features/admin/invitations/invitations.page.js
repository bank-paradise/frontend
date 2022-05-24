import { fetchGetInvitationsLink, fetchInvitations } from "api/community";
import { Input, PrimaryButton } from "components/atoms";
import { StaffTemplate } from "components/templates";
import BankTitle from "features/bank/account/_components/bankTitle";
import { useEffect, useState } from "react";
import InvitationsList from "./_components/invitationsList";
import SendInvitation from "./_components/sendInvitation";

export default function CommunityInvitations() {
  const [invitations, setInvitations] = useState([]);
  const [invitationsLink, setInvitationsLink] = useState(null);
  const [copyMessage, setCopyMessage] = useState("Copier");

  const copyToClipboard = (e) => {
    e.preventDefault();
    document.getElementById("invitations-link").select();
    document.execCommand("copy");
    setCopyMessage("Copié");
    setTimeout(() => {
      setCopyMessage("Copier");
    }, 2000);
  };

  const getInvitations = async () => {
    const invitResponse = await fetchInvitations();
    if (invitResponse.status === "done")
      setInvitations(invitResponse.response.invitations);
  };

  const getInvitationsLink = async () => {
    const invitResponse = await fetchGetInvitationsLink();
    console.log(invitResponse.response.invitation_link);
    if (invitResponse.status === "done") {
      const domain = window.location.hostname;
      const invitationLink = invitResponse.response.invitation_link.code;
      const invitationLinkUrl = `https://${domain}/invitations/${invitationLink}`;
      setInvitationsLink(invitationLinkUrl);
    }
  };

  useEffect(() => {
    getInvitations();
    getInvitationsLink();
  }, []);

  return (
    <StaffTemplate>
      <BankTitle>Invitations</BankTitle>
      <SendInvitation callback={getInvitations} />
      <hr className="my-10" />
      <InvitationsList list={invitations} />
      <hr className="my-10" />
      <BankTitle className="mt-5">Lien d'invitations</BankTitle>
      <div className="flex items-center mt-5">
        <Input
          className="rounded-l-[8px] !border-0"
          value={invitationsLink}
          id="invitations-link"
        />
        <PrimaryButton
          className="!rounded-l-none rounded-r-[8px]"
          onClick={copyToClipboard}
        >
          {copyMessage}
        </PrimaryButton>
      </div>
    </StaffTemplate>
  );
}
