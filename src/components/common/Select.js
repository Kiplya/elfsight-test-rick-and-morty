import { useCallback } from 'react';
import styled from 'styled-components';

export function Select({
  className,
  options,
  value,
  onChange,
  placeholder,
  disabled = false
}) {
  const changeValue = useCallback((e) => onChange(e.currentTarget.value), [
    onChange
  ]);

  return (
    <StyledSelect
      className={className}
      disabled={disabled}
      value={value || ''}
      onChange={changeValue}
    >
      <StyledOption value="" disabled hidden>
        {placeholder}
      </StyledOption>

      {options?.map((opt) => (
        <StyledOption key={opt.value} value={opt.value}>
          {opt.label}
        </StyledOption>
      ))}
    </StyledSelect>
  );
}

const StyledSelect = styled.select``;

const StyledOption = styled.option``;
