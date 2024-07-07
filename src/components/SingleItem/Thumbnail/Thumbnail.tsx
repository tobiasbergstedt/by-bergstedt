import styles from './Thumbnail.module.scss';
import clsx from 'clsx';

interface ThumbnailProps {
  imageUrl: string;
  onThumbnailClick: () => void;
  isSelected: boolean;
}

const Thumbnail = ({
  imageUrl,
  onThumbnailClick,
  isSelected,
}: ThumbnailProps): JSX.Element => {
  return (
    <img
      src={imageUrl}
      alt="Thumbnail"
      onClick={onThumbnailClick}
      className={clsx(styles.thumbnailImg, {
        [styles.isSelected]: isSelected,
      })}
    />
  );
};

export default Thumbnail;
