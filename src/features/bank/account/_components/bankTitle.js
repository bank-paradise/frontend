export default function BankTitle({ children, className, ...props }) {
  return (
    <div className={className}>
      <h2 className="font-medium text-lg text-black">{children}</h2>
      <div className="h-[3px] w-[33px] bg-primary" />
    </div>
  );
}
