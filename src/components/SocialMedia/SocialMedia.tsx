import styles from './SocialMedia.module.scss';
import clsx from 'clsx';

import { ReactComponent as FbIcon } from '../../assets/icons/fb.svg';
import { ReactComponent as IgIcon } from '../../assets/icons/ig.svg';
import { ReactComponent as GitIcon } from '../../assets/icons/github.svg';
import { Link } from 'react-router-dom';

interface SocialMediaProps {
  isDesktop: boolean;
}

interface NavLinkItem {
  asset: JSX.Element;
  link: string;
}

interface ItemComponentProps {
  item: NavLinkItem;
}

const SocialMedia = ({ isDesktop }: SocialMediaProps): JSX.Element => {
  const navLinks = [
    {
      asset: <FbIcon />,
      link: 'fb://profile/bybergstedt',
    },
    {
      asset: <IgIcon />,
      link: 'instagram://user?username=bybergstedt',
    },
    {
      asset: <GitIcon />,
      link: 'shop',
    },
  ];

  const ItemComponent: React.FC<ItemComponentProps> = ({ item }) => {
    return (
      <Link to={item.link} target="_blank" className={styles.link}>
        {item.asset}
      </Link>
    );
  };

  return (
    <div
      className={clsx(styles.socialMedia, {
        [styles.socialMediaMobile]: !isDesktop,
      })}
    >
      {navLinks.map((item, index) => (
        <ItemComponent key={index} item={item} />
      ))}
    </div>
  );
};

export default SocialMedia;
