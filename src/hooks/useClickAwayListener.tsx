import { FC, useEffect, useRef } from "react";

export const useClickAwayListener = () => {
  const ref = useRef(null);

  const ClickAwayListener: FC<{
    onClickAway: () => void;
  }> = ({ onClickAway }) => {
    const onClickHandler = (e: MouseEvent) => {
      if (!(ref?.current as any).contains(e.target)) {
        onClickAway();
      }
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

  return [ref, ClickAwayListener] as const;
};
