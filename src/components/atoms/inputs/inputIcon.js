import joinClasses from "helpers/joinClasses";
import { getSizeClass, getSizeClassY } from "themes/size";
import { Input } from "./input";

export const InputIcon = ({
  className = "",
  name = "",
  required = false,
  register = () => {},
  size = "",
  children,
  ...props
}) => {
  return (
    <div className="flex items-center">
      <Input
        className={joinClasses("border", className, getSizeClass(size))}
        name={name}
        required={required}
        {...register(name, { required })}
        {...props}
      />
      <p
        className={joinClasses(
          "h-full py-2 px-3 bg-gray-200",
          className,
          getSizeClassY(size)
        )}
      >
        {children}
      </p>
    </div>
  );
};
