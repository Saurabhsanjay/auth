
import styles from "../styles/Loader.module.css";

const Loader:React.FC = () => (
  <div className={styles.loaderContainer}>
    <div className={styles.loader} />
  </div>
);

export default Loader;
