import joinClasses from "helpers/joinClasses";
import { getSizeClass } from "themes/size";

export const Input = ({
  className = "",
  name = "",
  required = false,
  register = () => {},
  size = "",
  ...props
}) => {
  return (
    <input
      className={joinClasses(
        "appearance-none focus:border-primary border-b w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-400 dark:bg-slate-800 dark:text-white text-[16px] md:text-sm",
        className,
        getSizeClass(size)
      )}
      name={name}
      required={required}
      {...register(name, { required })}
      {...props}
    />
  );
};
