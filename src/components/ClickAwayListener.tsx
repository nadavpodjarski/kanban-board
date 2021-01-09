import { FC, useEffect } from "react";

/**
 * on mount adds click event listener to document body with onClick callback function
 * and  on unmount remove event listener
 */

const ClickAwayListener: FC<{
  onClickAway: (e: MouseEvent) => void;
}> = ({ onClickAway }) => {
  const onClickHandler = (e: MouseEvent) => {
    onClickAway(e);
  };
  useEffect(() => {
    document.body.addEventListener("click", onClickHandler);
    return () => {
      document.body.removeEventListener("click", onClickHandler);
    };
    //eslint-disable-next-line
  }, []);

  return <></>;
};

export default ClickAwayListener;
