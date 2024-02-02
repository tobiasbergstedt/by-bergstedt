import clsx from 'clsx';

import {
  ReactComponent as PrevArrowIcon,
  ReactComponent as NextArrowIcon,
} from '@assets/icons/arrow-left.svg';

import styles from './Pagination.module.scss';

interface PaginationProps {
  pagination: any;
  onPageChange: (value: any) => void;
}

const Pagination = ({
  pagination,
  onPageChange,
}: PaginationProps): JSX.Element => {
  const { page, pageCount } = pagination;

  const handleChangePage = (newPage: number): void => {
    if (newPage > 0 && newPage <= pageCount) {
      onPageChange(newPage);
    }
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
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            className={clsx(styles.button, {
              [styles.active]: pageNum === page,
            })}
            onClick={() => {
              handleChangePage(pageNum);
            }}
          >
            {pageNum}
          </button>
        ))}
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
