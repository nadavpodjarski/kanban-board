import { FC } from "react";
import styled from "styled-components";

/**
 * Returns transparent fullscreen overlay with default z-index 1 and onClick callback.
 * @param callback {funcion}
 * @param zIndex {number}
 * @returns overlay { HTMLDivElement }
 */

const ClickOutsideOverlay: FC<{
  onClickOutside: () => void;
  zIndex?: number;
}> = ({ onClickOutside, zIndex = 1 }) => {
  return <Overlay onClick={onClickOutside} zIndex={zIndex} />;
};

export default ClickOutsideOverlay;

type OverlayType = {
  zIndex: number;
};

const Overlay = styled.div<OverlayType>`
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: ${({ zIndex }) => zIndex};
`;
