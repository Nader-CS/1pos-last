import styles from './CheckBox.module.css';

function CheckBox({selected = false}) {
  return (
    <div className={styles.container}>
      {selected && <div className={styles.selected} />}
    </div>
  );
}

export default CheckBox;
