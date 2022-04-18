import joinClasses from "helpers/joinClasses";
import { useState } from "react";
import { Input, SecondaryButton } from "..";

export const Search = ({
  array = [],
  searchedKey = "",
  className = "",
  name = "",
  required = false,
  register = () => {},
  select = () => {},
  emptyMessage = "Aucun membre dans la communauté.",
  callback = () => {},
  placeholder = "",
  ...props
}) => {
  const [results, setResults] = useState(array);
  const [selected, setSelected] = useState(null);
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setSelected(null);
    select(null);
    setValue(event.target.value);
    if (event.target.value.length === 0) {
      setResults([]);
      return;
    }
    setResults(
      array.filter((item) =>
        item[searchedKey]
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      )
    );
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const selected = array.filter((item) =>
        item[searchedKey]
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      );

      if (selected.length) {
        setSelected(selected[0]);
        select(selected[0]);
      }
    }
  };

  return (
    <div className={joinClasses("relative w-full", className)}>
      {array.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-black z-[1] flex gap-2 items-center text-red-400 font-medium text-sm">
            <svg width="1em" height="1em" viewBox="0 0 24 24">
              <path
                d="M12.884 2.532c-.346-.654-1.422-.654-1.768 0l-9 17A.999.999 0 0 0 3 21h18a.998.998 0 0 0 .883-1.467L12.884 2.532zM13 18h-2v-2h2v2zm-2-4V9h2l.001 5H11z"
                fill="currentColor"
              ></path>
            </svg>
            {emptyMessage}
            <SecondaryButton
              size="small"
              className="shadow-none flex items-center gap-2"
              onClick={() => window.location.reload()}
            >
              <svg width="1.4em" height="1.4em" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
                ></path>
              </svg>
              Actualiser
            </SecondaryButton>
          </p>
          <div className="absolute w-full h-full bg-gray-100 opacity-75"></div>
        </div>
      )}
      <Input
        type="text"
        value={selected ? selected[searchedKey] : value}
        onChange={handleChange}
        name={name}
        required={required}
        className="border py-3 px-4 shadow-md rounded-md !text-lg"
        onKeyDown={handleKeyDown}
        {...register(name, { required })}
        placeholder={array.length ? placeholder : ""}
        {...props}
      />
      <ul className="bg-gray-50 shadow-lg absolute bottom-0 w-full translate-y-full max-h-[150px] overflow-y-auto z-[2]">
        {!selected &&
          value.length > 0 &&
          (results.length ? (
            results.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  select(item);
                  setSelected(item);
                }}
                className="px-5 py-2 hover:bg-gray-200 cursor-pointer"
              >
                {item[searchedKey]}
              </li>
            ))
          ) : (
            <li className="px-5 py-2">Aucun résultat</li>
          ))}
      </ul>
    </div>
  );
};
