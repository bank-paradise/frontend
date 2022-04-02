import formatDate from "helpers/formatDate";
import joinClasses from "helpers/joinClasses";

export default function InvitationsList({ list = [] }) {
  return (
    <div>
      <h4 className="text-md font-medium mt-5 mb-2">Invitations en attente</h4>
      <ul className="w-full">
        {list.length ? (
          list.map((invitation, index) => (
            <li
              key={invitation.id}
              className={joinClasses(
                "flex gap-10 px-5 py-3",
                index % 2 ? "bg-white" : "bg-gray-100"
              )}
            >
              <p className="font-medium">{formatDate(invitation.created_at)}</p>
              <div>
                <p className="font-medium">{invitation.name}</p>
                <p className="text-sm">{invitation.email}</p>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-sm font-medium py-5">
            Aucune invitation
          </p>
        )}
      </ul>
    </div>
  );
}
