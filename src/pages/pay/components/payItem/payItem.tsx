import React from 'react';
import { Icon } from 'antd';
import styles from './style.css';

interface PayItemProps {
  title: string,
  tips?: string,
  iconName: string,
  bgColor: string
}

export const PayItem: React.FC<PayItemProps> = props => {
  const { title, tips, iconName, bgColor } = props;
  return (
    <div className={styles.payMain}>
      <div className={styles.iconBg} style={{background: bgColor || '#FFFFFF'}}>
        <Icon className={styles.iconstyle} type={iconName} />
      </div>
      <div className={styles.titles}>
        <p>{title}</p>
        <p>{tips || null}</p>
      </div>
    </div>
  )
}