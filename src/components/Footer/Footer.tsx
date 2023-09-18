import styles from './Footer.module.scss';

const MyFooter = (): JSX.Element => {
  return (
    <div className={styles.footer}>
      <p>Copyright © Hamster Association of The Earth, 2022</p>
    </div>
  );
};

export default MyFooter;
