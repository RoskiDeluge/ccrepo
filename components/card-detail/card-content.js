import styles from './card-content.module.css';

function CardContent(props) {
  return <section className={styles.content}>{props.children}</section>;
}

export default CardContent;
