import CardItem from '../cards/card-item';
import styles from './card-list.module.css';
import React from 'react';

export default function CardList(props) {
  const { items } = props;
  return (
    <ul className={styles.list}>
      {items.map((card) => (
        <CardItem
          key={card.id}
          id={card.id}
          title={card.title}
          description={card.description}
          startdate={card.startdate}
          enddate={card.enddate}
          image={card.image}
        />
      ))}
    </ul>
  );
}
