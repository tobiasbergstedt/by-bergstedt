import styles from './NotFound.module.scss';

const NotFound = (): JSX.Element => (
  <section className={styles.notFound}>
    <h1>404 - Not found</h1>
    The page you tried to access does not seem to exist. Sorry!
  </section>
);

export default NotFound;
