export const getSizeClass = (size) => {
  switch (size) {
    case "small":
      return "!px-[15px] !py-[5px] text-[10px]";
    case "large":
      return "!px-[42px] !py-[14px] text-[14px]";
    default:
      return "px-[31px] py-[8px] text-[14px]";
  }
};

export const getSizeClassX = (size) => {
  switch (size) {
    case "small":
      return "!px-[15px] text-[10px]";
    case "large":
      return "!px-[42px] text-[14px]";
    default:
      return "px-[31px] text-[14px]";
  }
};

export const getSizeClassY = (size) => {
  switch (size) {
    case "small":
      return "!py-[5px] text-[10px]";
    case "large":
      return "!py-[14px] text-[14px]";
    default:
      return "py-[8px] text-[14px]";
  }
};
