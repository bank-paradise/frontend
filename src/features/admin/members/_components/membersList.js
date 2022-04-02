import joinClasses from "helpers/joinClasses";
import MemberItem from "./memberItem";

export default function MembersList({ list = [], callback = () => {} }) {
  return (
    <div>
      <h4 className="text-md font-medium mt-5 mb-2">Liste des membres</h4>
      <ul className="w-full">
        {list.length ? (
          list.map((member, index) => (
            <MemberItem
              key={index}
              member={member}
              index={index}
              callback={callback}
            />
          ))
        ) : (
          <p className="text-center text-sm font-medium py-5 ">Aucune membre</p>
        )}
      </ul>
    </div>
  );
}
