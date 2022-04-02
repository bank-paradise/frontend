import { fetchEditRole, fetchKickMember } from "api/community";
import joinClasses from "helpers/joinClasses";
import { useState } from "react";
import { toast } from "react-toastify";

export default function MemberItem({
  member = {},
  index = 0,
  callback = () => {},
}) {
  const [role, setRole] = useState(member.role);
  const [loading, setLoading] = useState(false);

  const changeRole = async (e) => {
    if (loading) return;
    setLoading(true);
    const memberUpdated = await fetchEditRole({
      user_id: member.id,
      role: e.target.value,
    });
    if (memberUpdated.status === "done") {
      toast.success("Rôle mis à jour");
    } else {
      toast.error(memberUpdated.response);
    }
    setLoading(false);
    setRole(e.target.value);

    callback();
  };

  const kickMember = async () => {
    if (loading) return;
    setLoading(true);
    const memberKicked = await fetchKickMember({
      user_id: member.id,
    });
    if (memberKicked.status === "done") {
      toast.success("Member exclu avec succès");
    } else {
      toast.error(memberKicked.response);
    }
    setLoading(false);
    callback();
  };

  return (
    <li
      key={member.id}
      className={joinClasses(
        "flex flex-col md:grid grid-cols-4 gap-5 px-5 py-3 justify-between",
        index % 2 ? "bg-white" : "bg-gray-100"
      )}
    >
      <p className="font-medium">
        <select
          placeholder="Rôle"
          onChange={changeRole}
          name="role"
          defaultValue={role}
          className="bg-transparent"
          required
        >
          <option value="owner">fondateur</option>
          <option value="admin">admin</option>
          <option value="moderator">modérateur</option>
          <option value="member">membre</option>
        </select>
      </p>
      <div className="col-span-3 flex justify-between">
        <p className="font-medium flex gap-2 items-center">{member.name}</p>
        <button
          className="text-right text-red-500 flex justify-end"
          onClick={kickMember}
        >
          <svg width="1.3em" height="1.3em" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M10.09 15.59L11.5 17l5-5l-5-5l-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM21 3H3v6h2V5h14v14H5v-4H3v6h18V3z"
            ></path>
          </svg>
        </button>
      </div>
    </li>
  );
}
