import { useCallback, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Text } from './Text';

export function Input({ value, placeholder, onChange }) {
  const onInputChange = useCallback((e) => onChange(e.currentTarget.value), [
    onChange
  ]);

  const [inFocus, setInFocus] = useState(false);
  const containerRef = useRef(null);
  const toggleFocus = useCallback(() => setInFocus((prev) => !prev), []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setInFocus(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <InputContainer ref={containerRef} inFocus={inFocus} onClick={toggleFocus}>
      {!value && <PlaceholderText>{placeholder}</PlaceholderText>}
      {value && <InputText>{value}</InputText>}
      <StyledInput value={value} onChange={onInputChange} />
    </InputContainer>
  );
}

const InputContainer = styled.div`
  position: relative;
  border: 1px solid #83bf46;
  transition: background-color 0.3s ease;
  border-radius: 8px;
  cursor: text;

  background-color: ${({ inFocus }) =>
    inFocus ? `rgba(255, 255, 255, 0.15);` : `transparent;`};

  @media (hover: hover) {
    &:hover {
      background-color: rgba(255, 255, 255, 0.15);
    }
  }
`;

const InputText = styled(Text)`
  width: calc(100% - 16px);
  position: absolute;
  top: 8px;
  left: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #ccc;
`;

const PlaceholderText = styled(InputText)`
  color: rgb(150, 150, 150);
`;

const StyledInput = styled.input`
  opacity: 0;
  padding: 8px;
  border-radius: 8px;
`;
