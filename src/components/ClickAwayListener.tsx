import { FC, useEffect } from "react";

const ClickAwayListener: FC<{ onClickAway: (e: MouseEvent) => void }> = ({
  onClickAway,
  children,
}) => {
  const onClickAwayHandler = (e: MouseEvent) => {
    onClickAway(e);
  };

  useEffect(() => {
    document.body.addEventListener("click", onClickAwayHandler);
    return () => {
      document.body.removeEventListener("click", onClickAwayHandler);
    };
    //eslint-disable-next-line
  }, []);

  return <>{children}</>;
};

export default ClickAwayListener;
