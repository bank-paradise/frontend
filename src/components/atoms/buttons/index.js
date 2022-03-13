import joinClasses from "helpers/joinClasses";

export const Button = ({ children, className, size = "", ...props }) => {
  const getSizeClass = (size) => {
    switch (size) {
      case "small":
        return "px-[15px] py-[5px] text-[10px]";
      case "large":
        return "px-[42px] py-[14px] text-[14px]";
      default:
        return "px-[31px] py-[8px] text-[14px]";
    }
  };
  return (
    <button
      className={joinClasses(
        "rounded-[8px] font-mediumx shadow-lg",
        getSizeClass(size),
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
