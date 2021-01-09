import { FC, useEffect } from "react";

/**
 * on mount adds mouse down event listener to document body with onClick callback function
 * on unmount remove event listener
 */

const ClickOutsideOverlay: FC<{
  onClickAway: () => void;
}> = ({ onClickAway }) => {
  useEffect(() => {
    document.body.addEventListener("mousedown", onClickAway);
    return () => {
      document.body.removeEventListener("mousedown", onClickAway);
    };
    //eslint-disable-next-line
  }, []);

  return <></>;
};

export default ClickOutsideOverlay;
