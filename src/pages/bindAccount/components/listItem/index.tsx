import React from 'react';
import moment from 'moment';
import styles from './style.css';

import elc from '@/assets/bill/elc.png';
// import water from '@/assets/bill/water.png';
// import wyf from '@/assets/bill/wyf.png';

interface ListItemProps {
  rowID: number,
  obj: any
}

const ListItem: React.FC<ListItemProps> = (props) => {

  const { project, accountName, amount, createTime } = props.obj;

  return (
    <div className={styles.listItemBody} key={props.rowID}>
      <div className={styles.listItemCon}>
        <div className={styles.listItemImg}>
          <img src={elc} alt='' />
          <div style={{ lineHeight: 1}}>
            <div className={styles.listItemTips}>{project}</div>
            <div>{accountName}</div>
          </div>
        </div>
        <div style={{ lineHeight: 1}}>
          <div style={{textAlign: 'right'}} className={styles.listItemTips}>{amount}</div>
          <div style={{color: '#999999'}}>{moment(createTime).format('MM-DD HH:mm')}</div>
        </div>
      </div>
    </div>
  )
}

export default ListItem;