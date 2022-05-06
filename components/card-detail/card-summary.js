import styles from './card-summary.module.css';

function CardSummary({ title }) {
  return (
    <section className={styles.summary}>
      <h1>{title}</h1>
    </section>
  );
}

export default CardSummary;
