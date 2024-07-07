import clsx from 'clsx';

import {
  ReactComponent as PrevArrowIcon,
  ReactComponent as NextArrowIcon,
} from '@assets/icons/arrow-left.svg';

import styles from './Pagination.module.scss';

interface PaginationProps {
  pagination:
    | {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      }
    | undefined;
  onPageChange: (value: number) => void;
}

const Pagination = ({
  pagination,
  onPageChange,
}: PaginationProps): JSX.Element => {
  if (pagination === undefined) {
    return null; // Or some other fallback UI
  }

  const { page, pageCount } = pagination;

  const handleChangePage = (newPage: number): void => {
    if (newPage > 0 && newPage <= pageCount) {
      onPageChange(newPage);
    }
  };

  const renderPageNumbers = (): JSX.Element[] => {
    const pageNumbers = [];
    const visiblePages = 1; // Number of pages to display around the current page
    const startPage = Math.max(2, page - visiblePages);
    const endPage = Math.min(pageCount - 1, page + visiblePages);

    // Always include the first page
    pageNumbers.push(
      <button
        key={1}
        className={clsx(styles.button, { [styles.active]: page === 1 })}
        onClick={() => {
          handleChangePage(1);
        }}
      >
        1
      </button>,
    );

    // Ellipsis for leading pages if needed
    if (startPage > 2) {
      pageNumbers.push(
        <span key="ellipsis-start" className={styles.ellipsis}>
          ...
        </span>,
      );
    }

    // Current, previous, and next pages
    for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
      pageNumbers.push(
        <button
          key={pageNum}
          className={clsx(styles.button, { [styles.active]: pageNum === page })}
          onClick={() => {
            handleChangePage(pageNum);
          }}
        >
          {pageNum}
        </button>,
      );
    }

    // Ellipsis for trailing pages if needed
    if (endPage < pageCount - 1) {
      pageNumbers.push(
        <span key="ellipsis-end" className={styles.ellipsis}>
          ...
        </span>,
      );
    }

    // Always include the last page if pageCount is greater than 1
    if (pageCount > 1) {
      pageNumbers.push(
        <button
          key={pageCount}
          className={clsx(styles.button, {
            [styles.active]: page === pageCount,
          })}
          onClick={() => {
            handleChangePage(pageCount);
          }}
        >
          {pageCount}
        </button>,
      );
    }

    return pageNumbers;
  };

  return (
    <div className={styles.paginationWrapper}>
      <div className={styles.pagination}>
        <button
          onClick={() => {
            handleChangePage(page - 1);
          }}
          disabled={page <= 1}
          className={styles.button}
        >
          <PrevArrowIcon className={styles.arrowIcon} />
        </button>

        {renderPageNumbers()}

        <button
          onClick={() => {
            handleChangePage(page + 1);
          }}
          disabled={page >= pageCount}
          className={styles.button}
        >
          <NextArrowIcon
            className={clsx(styles.arrowIcon, styles.rightArrow)}
          />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
