import React from 'react';
import { router as Router, connect } from 'dva';
import { Icon } from 'antd';

import styles from './index.css';
import account from '@/assets/bindAccount/account.png';

export const NoBinding: React.FC = () => {
  return (
    <div className={styles.nobinding}>
      <img src={account} alt='account' />
      <div className={styles.newBtn}>
        <Icon style={{color: '#2C6EFF'}} type='plus-circle' />
        <Router.Link to='/addAccount'>
          <span>新增缴费账户</span>
        </Router.Link>
      </div>
    </div>
  )
}