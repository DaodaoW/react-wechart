import React from 'react';
import { Icon } from 'antd';

import styles from './index.css';

interface MainBodyProps {
  img: string,
  title: string,
  account: string,
  adminName: string
}
export const MainBodyItem: React.FC<MainBodyProps> = (props) => {
  return (
    <div className={styles.mainitem}>
      <div className={styles.mainitemleft}>
        <img src={props.img} />
        <div className={styles.maintips}>
          <p>{props.title}</p>
          <p>{props.account} | {props.adminName}</p>
        </div>
      </div>
      <Icon style={{fontSize: '1rem'}} type='right' />
    </div>
  )
}