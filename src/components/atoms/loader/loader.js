import joinClasses from "helpers/joinClasses";
import UseAnimation from "react-useanimations";
import loader from "react-useanimations/lib/loading";

export function Loader({
  className = "",
  strokeColor = "currentColor",
  ...props
}) {
  return (
    <div className="w-full flex justify-center">
      <UseAnimation
        className={joinClasses("text-black dark:text-white", className)}
        strokeColor={strokeColor}
        size={30}
        animation={loader}
        autoplay={true}
        loop={true}
        {...props}
      />
    </div>
  );
}
