export const Title = ({ children, className = "", ...props }) => {
  return (
    <h1
      className={`text-[53px] font-bold text-primary shadow-sm ${className}`}
      {...props}
    >
      {children}
    </h1>
  );
};
