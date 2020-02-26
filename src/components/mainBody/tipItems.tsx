import React from 'react';
import styles from './tipItems.css';

interface TopItemsProps {
  img: string,
  tips: string
}
export const TipItems: React.FC<TopItemsProps> = (props) => {
  return (
    <div className={styles.tipsitem}>
      <img className={styles.image} src={props.img} alt={props.img} />
      <span className={styles.tipsColor}>{props.tips}</span>
    </div>
  )
}