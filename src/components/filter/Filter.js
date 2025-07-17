import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Select, Input, Button } from '../common';
import { statusOptions, genderOptions, speciesLoader } from './FilterOptions';
import { useData } from '../providers';

export function Filter() {
  const { info, isError, updateParams, resetParams, params } = useData();

  const [filterName, setFilterName] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSpecies, setFilterSpecies] = useState('');

  useEffect(() => {
    setFilterName(params.get('name') || '');
    setFilterType(params.get('type') || '');
    setFilterGender(params.get('gender') || '');
    setFilterStatus(params.get('status') || '');
    setFilterSpecies(params.get('species') || '');
  }, [params]);

  const [speciesOptions, setSpeciesOptions] = useState();

  const applyFilter = useCallback(() => {
    const result = [];

    if (filterName) {
      result.push({ key: 'name', value: filterName });
    }

    if (filterType) {
      result.push({ key: 'type', value: filterType });
    }

    if (filterGender) {
      result.push({ key: 'gender', value: filterGender });
    }

    if (filterSpecies) {
      result.push({ key: 'species', value: filterSpecies });
    }

    if (filterStatus) {
      result.push({ key: 'status', value: filterStatus });
    }

    result.push({ key: 'page', value: '1' });
    updateParams(result);
  }, [
    filterName,
    filterType,
    filterGender,
    filterStatus,
    filterSpecies,
    updateParams
  ]);

  const resetFilter = useCallback(() => {
    setFilterName('');
    setFilterType('');
    setFilterGender('');
    setFilterStatus('');
    setFilterSpecies('');

    resetParams();
  }, [resetParams]);

  useEffect(() => {
    speciesLoader().then((specieses) => {
      setSpeciesOptions(specieses);
    });
  }, []);

  if (!Object.keys(info).length || isError) {
    return null;
  }

  return (
    <StyledFilter>
      <Select
        placeholder="Status"
        value={filterStatus}
        onChange={setFilterStatus}
        options={statusOptions}
      />

      <Select
        placeholder="Gender"
        value={filterGender}
        onChange={setFilterGender}
        options={genderOptions}
      />

      <Select
        placeholder={speciesOptions ? 'Species' : 'Loading...'}
        value={filterSpecies}
        onChange={setFilterSpecies}
        options={speciesOptions || []}
      />

      <Input value={filterName} onChange={setFilterName} placeholder="Name" />

      <Input value={filterType} onChange={setFilterType} placeholder="Type" />

      <ButtonContainer>
        <StyledButton
          label="Apply"
          onClick={applyFilter}
          color="rgba(131, 191, 70, 0.85)"
        />

        <StyledButton
          label="Reset"
          onClick={resetFilter}
          color="rgba(253, 79, 83, 0.85)"
        />
      </ButtonContainer>
    </StyledFilter>
  );
}

const StyledFilter = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 1fr));
  gap: 16px;

  @media (max-width: 530px) {
    grid-template-columns: 1fr;
  }
`;

const ButtonContainer = styled.div`
  gap: 16px;
  display: flex;

  @media (max-width: 530px) {
    flex-direction: column;
  }
`;

const StyledButton = styled(Button)`
  flex: 1;
`;
