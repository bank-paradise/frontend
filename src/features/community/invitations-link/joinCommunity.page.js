import { fetchInvitationsLink, sendInvitationsLink } from "api/community";
import {
  Loader,
  PrimaryButton,
  PrimaryCard,
  SubParagraph,
  SubTitle,
} from "components/atoms";
import { Button } from "components/atoms/buttons";
import { DefaultTemplate } from "components/templates";
import { getBank } from "features/bank/bank.model";
import { axiosRequest } from "helpers/axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCommunity, joinCommunity } from "../community.model";

export default function JoinCommunityWithLink() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [invitation, setInvitation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  const getInvitation = async (code) => {
    setLoading(true);
    setError(null);
    const invit = await fetchInvitationsLink(code);
    if (invit.status === "error") {
      setError(invit.response);
    } else {
      setInvitation(invit.response);
    }
    setLoading(false);
  };

  const handleAccept = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const invit = await sendInvitationsLink(params.code);

    if (invit.status === "error") {
      setError(invit.response);
      setLoading(false);
    } else {
      await dispatch(
        joinCommunity({ ...invit.response.invitation, accept: true })
      );
      await dispatch(getCommunity());
      await dispatch(getBank());
      setLoading(false);
      navigate("/");
    }
  };

  useEffect(() => {
    const code = params.code;
    if (!code || invitation) return;
    getInvitation(code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <DefaultTemplate>
      <div className="h-[calc(100vh-73px)] w-full flex jusitfy-center items-center">
        <PrimaryCard className="max-w-lg relative m-auto w-full flex flex-col items-center h-max justify-center py-10 px-5 bg-gray-100 dark:bg-slate-800 rounded-md">
          <SubTitle className="mt-5 text-center">Invitation</SubTitle>
          <SubParagraph className="text-center dark:text-white">
            Voulez-vous rejoindre cette communauté ?
          </SubParagraph>
          {!loading ? (
            <div>
              <div className="my-10">
                {invitation && (
                  <div className="flex gap-3 items-center dark:text-white">
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
                      {invitation.community.name}
                    </p>

                    <div className="flex gap-3">
                      <Button size="small" onClick={(e) => navigate("/")}>
                        <svg width="2em" height="2em" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
                          ></path>
                        </svg>
                      </Button>
                      <PrimaryButton size="small" onClick={handleAccept}>
                        <svg width="2em" height="2em" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z"
                          ></path>
                        </svg>
                      </PrimaryButton>
                    </div>
                  </div>
                )}
              </div>
              {error && (
                <p className="text-center text-primary my-5 underline">
                  {error}
                </p>
              )}
            </div>
          ) : (
            <div>
              <Loader />
            </div>
          )}
        </PrimaryCard>
      </div>
    </DefaultTemplate>
  );
}
