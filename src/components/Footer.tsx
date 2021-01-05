import styled from "styled-components";

export default function Footer() {
  return <FooterContainer>Made By N@d@v 2020</FooterContainer>;
}

const FooterContainer = styled.footer`
  height: 48px;
  padding: 16px;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;
