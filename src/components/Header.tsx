import styled from "styled-components";

import { circle, innerCircle, name } from "../resources/logopath";
import { motion } from "framer-motion";

const pathVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)",
    strokeWidth: 1,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "rgba(255, 255, 255, 1)",
    strokeWidth: 0,
    transition: {
      fill: { duration: 3, ease: "easeInOut" },
      pathLength: { duration: 5, ease: "linear" },
      strokeWidth: { duration: 3, ease: "linear" },
    },
  },
};

export default function Header() {
  return (
    <HeaderContainer>
      <LogoSVG viewBox="0 0 350 92">
        <g transform="matrix(2.8125,0,0,2.8125,0,0)">
          <LogoPath
            d={innerCircle}
            variants={pathVariants}
            initial="hidden"
            animate="visible"
          />
          <LogoPath
            d={circle}
            variants={pathVariants}
            initial="hidden"
            animate="visible"
          />
        </g>
        <g transform="matrix(5.591798782348633,0,0,5.591798782348633,103.51351165771484,-5.577820301055908)">
          <LogoPath
            d={name}
            variants={pathVariants}
            initial="hidden"
            animate="visible"
          />
        </g>
      </LogoSVG>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  height: 80px;
  padding: 16px;
  box-sizing: border-box;
  color: white;
  display: flex;
  align-items: center;
`;

const LogoSVG = styled(motion.svg)`
  height: 100%;
  width: 200px;
  stroke: #fff;
  overflow: visible;
  stroke-linejoin: round;
  stroke-linecap: round;
`;

const LogoPath = styled(motion.path)``;
