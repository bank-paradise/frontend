export const Select = ({
  className = "",
  name = "",
  required = false,
  children,
  register = () => {},
  ...props
}) => {
  return (
    <select
      className={`appearance-none focus:border-primary border-b w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-400 dark:bg-slate-800 dark:text-white ${className}`}
      name={name}
      required={required}
      {...register(name, { required })}
      {...props}
    >
      {children}
    </select>
  );
};
