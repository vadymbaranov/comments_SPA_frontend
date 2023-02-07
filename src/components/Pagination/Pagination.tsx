/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo } from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils/getNumber';

type Props = {
  numberOfComments: number;
  currentPage: number;
  onPageChange: (currentPage: number) => void;
};

export const Pagination: React.FC<Props> = ({
  numberOfComments,
  currentPage,
  onPageChange,
}) => {
  const amountOfPages = Math.ceil(numberOfComments / 25);
  const pages = getNumbers(1, amountOfPages);
  const isFirstPage = useMemo(() => currentPage === 1, [currentPage]);
  const isLastPage = useMemo(
    () => currentPage === amountOfPages,
    [currentPage, amountOfPages],
  );

  const handleClick = (event: React.MouseEvent, page: number) => {
    event.preventDefault();
    onPageChange(page);
    window.scrollTo({ top: 0 });
  };

  const handleKeyDown = (event: React.KeyboardEvent, page: number) => {
    event.preventDefault();
    onPageChange(page);
    window.scrollTo({ top: 0 });
  };

  return (
    <nav className="pagination is-centered" role="navigation" aria-label="pagination">
      <a
        role="button"
        tabIndex={0}
        className={classNames('pagination-previous', {
          'is-disabled': isFirstPage,
        })}
        title="This is the first page"
        onClick={(event) => handleClick(event, currentPage - 1)}
        onKeyDown={(event) => handleKeyDown(event, currentPage - 1)}
      >
        Previous
      </a>
      <a
        role="button"
        tabIndex={0}
        className={classNames('pagination-next', {
          'is-disabled': isLastPage,
        })}
        onClick={(event) => handleClick(event, currentPage + 1)}
        onKeyDown={(event) => handleKeyDown(event, currentPage + 1)}
      >
        Next page
      </a>
      <ul className="pagination-list">
        <li>
          {pages.map((pageNumber) => (
            <a
              key={pageNumber}
              href="/"
              className={classNames('pagination-link', {
                'is-current': currentPage === pageNumber,
              })}
              aria-label={`Goto page ${pageNumber}`}
              aria-current="page"
              onClick={(event) => handleClick(event, pageNumber)}
              onKeyDown={(event) => handleKeyDown(event, pageNumber)}
            >
              {pageNumber}
            </a>
          ))}
        </li>
      </ul>
    </nav>
  );
};
