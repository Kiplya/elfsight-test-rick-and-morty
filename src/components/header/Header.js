import styled from 'styled-components';
import { Logo } from './Logo';
import { Filter } from '../filter';

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <Filter />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;

  @media (min-width: 1520px) {
    flex-direction: row;
    justify-content: space-between;
    margin-inline: 50px;
  }

  @media (max-width: 930px) {
    margin-bottom: 20px;
  }
`;
