import { useCallback, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Text } from './Text';

export function Select({ value, onChange, options, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);
  const onOptionClick = useCallback(
    (e) => {
      const value = e.currentTarget.getAttribute('data-value');
      e.stopPropagation();

      onChange(value);
      setIsOpen(false);
    },
    [onChange]
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <SelectContainer ref={selectRef}>
      <SelectBox isOpen={isOpen} onClick={toggleOpen}>
        {!value && <PlaceholderText>{placeholder}</PlaceholderText>}
        {value && <Text>{value.charAt(0).toUpperCase() + value.slice(1)}</Text>}

        {value && !isOpen && (
          <CloseButton data-value="" onClick={onOptionClick}>
            &#215;
          </CloseButton>
        )}
        {(!value || (value && isOpen)) && (
          <Chevron isOpen={isOpen}>&or;</Chevron>
        )}
      </SelectBox>

      {isOpen && (
        <OptionsContainer>
          {options?.map((option) => (
            <StyledOption
              key={option.value}
              data-value={option.value}
              onClick={onOptionClick}
            >
              <OptionText>
                {option.value === value ? <b>{option.label}</b> : option.label}
              </OptionText>
            </StyledOption>
          ))}
        </OptionsContainer>
      )}
    </SelectContainer>
  );
}

const SelectContainer = styled.div`
  position: relative;
  cursor: pointer;
  user-select: none;
`;

const SelectBox = styled.div`
  position: relative;
  padding: 8px;

  border-radius: 8px;
  border: 1px solid #83bf46;
  transition: background-color 0.3s ease;

  ${({ isOpen }) => {
    if (isOpen) return 'background-color: rgba(255, 255, 255, 0.15);';
  }}

  @media (hover: hover) {
    &:hover {
      background-color: rgba(255, 255, 255, 0.15);
    }
  }
`;

const PlaceholderText = styled(Text)`
  color: rgb(150, 150, 150);
`;

const Chevron = styled(Text)`
  transform: ${({ isOpen }) =>
    isOpen ? 'rotate(180deg) scaleY(0.5);' : 'scaleY(0.5);'};

  position: absolute;
  right: 8px;
`;

const CloseButton = styled.span`
  color: #ccc;
  position: absolute;
  right: 4px;
  transform: translateY(-4px);
  transition: color 0.3s ease;
  padding: 4px;

  @media (hover: hover) {
    &:hover {
      color: #83bf46;
    }
  }
`;

const OptionsContainer = styled.div`
  z-index: 1;
  min-width: 100%;
  position: absolute;
  top: calc(100% + 8px);
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5);
  max-height: calc(35px * 5);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
    border: 3px solid transparent;
    background-clip: content-box;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const StyledOption = styled.div`
  padding: 8px;

  :first-child {
    border-radius: 8px 8px 0 0;
  }

  :last-child {
    border-radius: 0 0 8px 8px;
  }

  @media (hover: hover) {
    &:hover {
      background-color: rgba(131, 191, 70, 0.25);
    }
  }
`;

const OptionText = styled.span`
  color: rgb(30, 30, 30);
`;
