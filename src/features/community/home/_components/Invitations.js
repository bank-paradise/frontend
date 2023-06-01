import { PrimaryButton, SubParagraph } from "components/atoms";
import { Button } from "components/atoms/buttons";
import { getBank } from "features/bank/bank.model";
import {
  getCommunity,
  joinCommunity,
} from "features/community/community.model";
import joinClasses from "helpers/joinClasses";
import { useDispatch } from "react-redux";

export default function Invitations({ invitations = [] }) {
  const dispatch = useDispatch();

  const handleInvitation = async (e, invitation, accept) => {
    e.preventDefault();
    await dispatch(joinCommunity({ ...invitation, accept }));
    await dispatch(getCommunity());
    await dispatch(getBank());
  };

  return (
    <div className="mt-5">
      <SubParagraph className="text-center dark:text-white">
        Retrouvez ici toutes vos invitations à des communautées.
      </SubParagraph>
      <ul>
        {invitations.length ? (
          invitations.map((invitation, index) => (
            <li
              key={index}
              className={joinClasses(
                "flex gap-5 items-center justify-between py-5 border-b border-primary",
                invitations.length === index + 1 && "border-b-0"
              )}
            >
              <div className="flex gap-3 items-center">
                <svg
                  width="2.8em"
                  height="2.8em"
                  viewBox="0 0 20 20"
                  className="text-gray-50 bg-gray-300 p-1 rounded-full hidden md:block"
                >
                  <path
                    fill="currentColor"
                    d="M7.879 7.5c.504-.61 1.267-1 2.121-1c.854 0 1.617.39 2.121 1a2.75 2.75 0 1 1-4.243 0Zm5.871 1.75c0-.632-.156-1.228-.432-1.75H17.5A1.5 1.5 0 0 1 19 9v.5c0 1.587-1.206 3.212-3.315 3.784A2.5 2.5 0 0 0 13.5 12h-.95a3.74 3.74 0 0 0 1.2-2.75ZM13.5 13a1.496 1.496 0 0 1 1.5 1.5v.5c0 1.971-1.86 4-5 4c-3.14 0-5-2.029-5-4v-.5A1.496 1.496 0 0 1 6.5 13h7ZM1 9.5c0 1.587 1.206 3.212 3.315 3.784A2.5 2.5 0 0 1 6.5 12h.95a3.74 3.74 0 0 1-1.2-2.75c0-.632.156-1.228.433-1.75H2.5A1.5 1.5 0 0 0 1 9v.5Zm7.75-5.75a2.75 2.75 0 1 0-5.5 0a2.75 2.75 0 0 0 5.5 0Zm8 0a2.75 2.75 0 1 0-5.5 0a2.75 2.75 0 0 0 5.5 0Z"
                  ></path>
                </svg>

                <p className="font-medium text-sm capitalize">
                  {invitation.name}
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  size="small"
                  onClick={(e) => handleInvitation(e, invitation.info, false)}
                >
                  <svg width="2em" height="2em" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
                    ></path>
                  </svg>
                </Button>
                <PrimaryButton
                  size="small"
                  onClick={(e) => handleInvitation(e, invitation.info, true)}
                >
                  <svg width="2em" height="2em" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z"
                    ></path>
                  </svg>
                </PrimaryButton>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-sm pt-4">
            Vous n'avez reçu invitation :(
          </p>
        )}
      </ul>
    </div>
  );
}
