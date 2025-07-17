import styled from 'styled-components';

export function Button({ className, onClick, label }) {
  return (
    <StyledButton className={className} onClick={onClick}>
      {label}
    </StyledButton>
  );
}

const StyledButton = styled.button``;
