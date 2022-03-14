export const Input = ({
  className = "",
  name = "",
  required = false,
  register = () => {},
  ...props
}) => {
  return (
    <input
      className={`appearance-none focus:border-primary border-b w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-400 ${className}`}
      name={name}
      required={required}
      {...register(name, { required })}
      {...props}
    />
  );
};
