import styles from './comment-list.module.css';

export default function CommentList() {
  return (
    <ul className={styles.comments}>
      {/* Render list of comments - fetched from API */}
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Roberto</address>
        </div>
      </li>
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Roberto</address>
        </div>
      </li>
    </ul>
  );
}
