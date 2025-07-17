import { useCallback } from 'react';
import styled from 'styled-components';

export function Input({ className, value, placeholder, onChange }) {
  const onInputChange = useCallback((e) => onChange(e.currentTarget.value), [
    onChange
  ]);

  return (
    <StyledInput
      className={className}
      value={value}
      placeholder={placeholder}
      onChange={onInputChange}
    />
  );
}

const StyledInput = styled.input``;
