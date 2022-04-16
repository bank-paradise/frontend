import joinClasses from "helpers/joinClasses";
import { useState } from "react";
import { Input } from "..";

export const Search = ({
  array = [],
  searchedKey = "",
  className = "",
  name = "",
  required = false,
  register = () => {},
  select = () => {},
  callback = () => {},
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
      <Input
        type="text"
        value={selected ? selected[searchedKey] : value}
        onChange={handleChange}
        name={name}
        required={required}
        className="border py-3 px-4 shadow-md rounded-md !text-lg"
        onKeyDown={handleKeyDown}
        {...register(name, { required })}
        {...props}
      />
      <ul className="bg-gray-50 shadow-lg absolute bottom-0 w-full translate-y-full max-h-[150px] overflow-y-auto z-[2]">
        {!selected &&
          value.length > 0 &&
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
          ))}
      </ul>
    </div>
  );
};
