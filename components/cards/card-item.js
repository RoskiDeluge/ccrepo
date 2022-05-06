import Image from 'next/image';
import Button from '../ui/button';
import React from 'react';
import styles from './card-item.module.css';
import DateIcon from '../icons/date-icon';
import DescriptionIcon from '../icons/description-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';

export default function CardItem(props) {
  const { title, image, startdate, enddate, description, id } = props;

  const humanReadableStartDate = new Date(startdate).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  const humanReadableEndDate = new Date(enddate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  //   const formattedAddress = location.replace(',', '\n');

  const infoLink = `/cards/${id}`;

  return (
    <li className={styles.item}>
      <Image src={'/' + image} alt={title} width={250} height={160} />
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
          <div className={styles.date}>
            <DateIcon />
            <time>
              Start: {humanReadableStartDate} | End: {humanReadableEndDate}
            </time>
          </div>
        </div>
        <div className={styles.description}>
          <DescriptionIcon />
          <p>{description}</p>
        </div>
        <div className={styles.actions}>
          <Button link={infoLink}>
            <span>info</span>
            <span className={styles.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}
