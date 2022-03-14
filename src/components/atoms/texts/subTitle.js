export const SubTitle = ({ children, className = "", ...props }) => {
  return (
    <h2
      className={`text-[32px] font-bold text-primary ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
};
