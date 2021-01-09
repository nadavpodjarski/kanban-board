import { FC, useEffect } from "react";

/**
 * on mount adds mouse down event listener to document body with onClick callback function
 * on unmount remove event listener
 */

const ClickOutsideOverlay: FC<{
  onClickOutside: () => void;
}> = ({ onClickOutside }) => {
  useEffect(() => {
    document.body.addEventListener("mousedown", onClickOutside);
    return () => {
      document.body.removeEventListener("mousedown", onClickOutside);
    };
    //eslint-disable-next-line
  }, []);

  return <></>;
};

export default ClickOutsideOverlay;
