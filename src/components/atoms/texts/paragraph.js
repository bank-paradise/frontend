export const Paragraph = ({ children, className = "", ...props }) => {
  return (
    <p className={`text-[20px] text-secondary ${className}`} {...props}>
      {children}
    </p>
  );
};
