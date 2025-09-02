import styles from "./Container.module.css";

function Container({ children }) {
  return <main className={`${styles.container} flex-1`}>{children}</main>;
}

export default Container;
