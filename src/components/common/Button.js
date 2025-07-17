import styled from 'styled-components';

export function Button({ className, onClick, label, color }) {
  return (
    <StyledButton className={className} onClick={onClick} _color={color}>
      {label}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  font-family: 'Roboto';
  font-size: 16px;
  cursor: pointer;
  border: 1px solid ${({ _color }) => _color};
  padding: 8px;
  border-radius: 8px;
  color: ${({ _color }) => _color};
  background-color: transparent;

  @media (hover: hover) {
    &:hover {
      background-color: ${({ _color }) => _color};
      color: rgb(225, 225, 225);
    }
  }
`;
