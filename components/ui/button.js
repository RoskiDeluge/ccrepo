import Link from 'next/link';
import styles from './button.module.css';
import React from 'react';

export default function Button(props) {
  if (props.link) {
    return (
      <Link href={props.link}>
        <a className={styles.btn}>{props.children}</a>
      </Link>
    );
  }

  return (
    <button className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
