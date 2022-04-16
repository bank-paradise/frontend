import formatDate from "helpers/formatDate";
import joinClasses from "helpers/joinClasses";

export default function InvitationsList({ list = [] }) {
  return (
    <div>
      <h4 className="text-md font-medium mt-5 mb-2 dark:text-white">
        Invitations en attente
      </h4>
      <ul className="w-full">
        {list.length ? (
          list.map((invitation, index) => (
            <li
              key={invitation.id}
              className={joinClasses(
                "flex gap-10 px-5 py-3 dark:text-white",
                index % 2
                  ? "bg-white  dark:bg-slate-600"
                  : "bg-gray-100  dark:bg-slate-700"
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
          <p className="text-center text-sm font-medium py-5 dark:text-white">
            Aucune invitation
          </p>
        )}
      </ul>
    </div>
  );
}
