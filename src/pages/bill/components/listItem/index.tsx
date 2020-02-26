import React from 'react';
import moment from 'moment';
import styles from './style.css';

import wechart from '@/assets/bindAccount/wechart.png';

interface ListItemProps {
  rowID: number,
  obj: any
}

const ListItem: React.FC<ListItemProps> = (props) => {

  const { adminPhone, orderFee, createTime, accountName } = props.obj;

  return (
    <div className={styles.listItemBody} key={props.rowID}>
      <div className={styles.listItemCon}>
        <div className={styles.listItemImg}>
          <img src={wechart} alt='' />
          <div style={{ lineHeight: 1}}>
            <div className={styles.listItemTips}>{accountName}</div>
            <div>{adminPhone}</div>
          </div>
        </div>
        <div style={{ lineHeight: 1}}>
          <div style={{textAlign: 'right'}} className={styles.listItemTips}>+{orderFee}</div>
          <div style={{color: '#999999'}}>{moment(createTime).format('MM-DD HH:mm')}</div>
        </div>
      </div>
    </div>
  )
}

export default ListItem;