export const SubParagraph = ({ children, className = "", ...props }) => {
  return (
    <p
      className={`text-[14px] text-secondary font-medium ${className}`}
      {...props}
    >
      {children}
    </p>
  );
};
