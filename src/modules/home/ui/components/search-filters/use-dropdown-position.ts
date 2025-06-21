import { RefObject } from "react";

export const useDropdownPostion = (
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>
) => {
  const getDropdownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 };
    const rect = ref.current.getBoundingClientRect();
    const dropdownWidth = 240; // Width of dropdown (w-60 = 15rem =240px)

    //Caculate the initial position
    let left = rect.left + window.scrollX;
    let top = rect.bottom + window.scrollY;

    //Check if dropdown would go off the right edge of the viewport
    if (left + dropdownWidth > window.innerWidth) {
      //Align to right edge of button instead
      left = rect.right + window.scrollX - dropdownWidth;
      //If still off-screen, align to the right edge of wiewport with same padding
      if (left < 0) {
        left = window.innerWidth - dropdownWidth - 16;
      }
    }
    //Ensure dropdown doesn't go off left edge
    if (left < 0) {
      left = 16;
    }
    return { top, left };
  };
  return { getDropdownPosition };
};
