import Image from 'next/image';
// import AddressIcon from '../icons/address-icon';
import DescriptionIcon from '../icons/description-icon';
import DateIcon from '../icons/date-icon';
import LogisticsItem from './logistics-item';
import styles from './card-logistics.module.css';

function CardLogistics(props) {
  const { startdate, enddate, description, image, imageAlt } = props;

  const humanReadableStartDate = new Date(startdate).toLocaleDateString(
    'en-US',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  );
  const humanReadableEndDate = new Date(enddate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  // const addressText = address.replace(', ', '\n');

  return (
    <section className={styles.logistics}>
      <div className={styles.image}>
        <Image src={`/${image}`} alt={imageAlt} width="300" height="300" />
      </div>
      <ul className={styles.list}>
        <LogisticsItem icon={DateIcon}>
          <time>Start: {humanReadableStartDate}</time>
          <br />
          <time>End: {humanReadableEndDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={DescriptionIcon}>
          <address>{description}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default CardLogistics;
