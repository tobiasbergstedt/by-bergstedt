import { type MetaData } from '@interfaces/interfaces';
import { useTranslation } from 'react-i18next';

interface Props {
  metaData: MetaData | null;
}

const PaginationInfo = ({ metaData }: Props): JSX.Element => {
  const fallbackMetaData = {
    pagination: {
      page: 1,
      pageSize: 1,
      pageCount: 1,
      total: 1,
    },
  };

  const { page, pageSize, total } =
    metaData !== null ? metaData.pagination : fallbackMetaData.pagination;

  const { t } = useTranslation();

  // Calculate start and end indices
  const startIndex = (page - 1) * pageSize + 1;
  const endIndex = Math.min(startIndex + pageSize - 1, total);

  // Display string
  const displayText = `${t(
    'pagination.displaying',
  )} ${startIndex}-${endIndex} ${t('pagination.of')} ${total}`;

  return <p>{displayText}</p>;
};

export default PaginationInfo;
