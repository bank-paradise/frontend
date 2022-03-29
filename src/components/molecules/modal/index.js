import { Paragraph } from "components/atoms";
import joinClasses from "helpers/joinClasses";

export const Modal = ({
  isOpen = false,
  setIsOpen = () => {},
  title = "",
  children,
  ...props
}) => {
  return (
    <div
      className={joinClasses(
        "w-screen h-screen fixed top-0 left-0 flex items-center justify-center",
        isOpen ? "" : "hidden"
      )}
      {...props}
    >
      <div className="bg-white max-w-xl z-10 h-min w-11/12 md:w-full rounded-lg px-5 pt-14 pb-4 relative">
        <div className="absolute top-0 left-0 w-full flex justify-between px-5 py-3">
          <Paragraph className="font-bold !text-[18px]">{title}</Paragraph>
          <button className=" text-primary" onClick={() => setIsOpen(false)}>
            <svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"
              ></path>
            </svg>
          </button>
        </div>

        <div>{children}</div>
      </div>
      <div
        className="w-full h-full bg-primary opacity-50 absolute top-0 left-0"
        onClick={() => setIsOpen(false)}
      />
    </div>
  );
};
