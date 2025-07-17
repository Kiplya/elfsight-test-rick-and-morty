import styled from 'styled-components';
import { useCallback } from 'react';
import { useData } from './providers';

export function Pagination() {
  const { params, updateParams, info } = useData();
  const currentPage = parseInt(params.get('page'));
  const totalPages = info.pages;

  const pageClickHandler = useCallback(
    (e) => {
      const page = e.currentTarget.getAttribute('data-page');
      if (!page) {
        return;
      }

      updateParams([{ key: 'page', value: parseInt(page) }]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [updateParams]
  );

  if (totalPages <= 1) {
    return null;
  }

  return (
    <StyledPagination>
      {currentPage > 2 && (
        <>
          <Page data-page={1} onClick={pageClickHandler}>
            « First
          </Page>
          <Ellipsis>...</Ellipsis>
        </>
      )}

      {currentPage > 1 && (
        <Page data-page={currentPage - 1} onClick={pageClickHandler}>
          {currentPage - 1}
        </Page>
      )}

      <Page active>{currentPage}</Page>

      {currentPage < totalPages && (
        <Page data-page={currentPage + 1} onClick={pageClickHandler}>
          {currentPage + 1}
        </Page>
      )}

      {currentPage < totalPages - 1 && (
        <>
          <Ellipsis>...</Ellipsis>
          <Page data-page={totalPages} onClick={pageClickHandler}>
            Last »
          </Page>
        </>
      )}
    </StyledPagination>
  );
}

const StyledPagination = styled.div`
  margin-top: auto;
  width: 100%;
  text-align: center;
`;

const Page = styled.span`
  color: #fff;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  transition: color 0.2s;
  ${({ active }) => active && 'color: #83bf46'};

  &:hover {
    color: #83bf46;
  }
`;

const Ellipsis = styled(Page)`
  cursor: default;

  &:hover {
    color: #fff;
  }
`;
