import styled from "styled-components";

import LogoIcon from "../resources/logo-white.svg";

export default function Header() {
  return (
    <HeaderContainer>
      <Logo src={LogoIcon} />
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

const Logo = styled.img`
  width: 150px;
`;
