import styles from './AppText.module.css';
function AppText({text = '', classes = ''}) {
  return <p className={`${styles.text} ${classes}`}>{text}</p>;
}

export default AppText;
