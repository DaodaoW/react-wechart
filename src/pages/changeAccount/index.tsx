import React from 'react';
import { router as Router, connect } from 'dva';
import withRouter from 'umi/withRouter';
import { MainBodyItem } from './components/mainBodyItem';
import { Icon } from 'antd';
import { ActivityIndicator } from 'antd-mobile';

import account from '@/assets/changeAccount/account.png';
import styles from './index.css';

interface ChangeAccountProps {
  dispatch: Function,
  accountList: Array<any>,
  loading: boolean
}

class ChangeAccount extends React.Component<ChangeAccountProps> {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'changeaccount/getList'
    });
  }

  // 点击切换账户
  checkoutAccount = (accountId: string): void => {
    const { dispatch } = this.props;
    const params = new FormData();
    params.append('accountId', accountId);
    dispatch({
      type: 'changeaccount/switchAccount',
      payload: params
    });
  }

  render() {
    const { accountList, loading } = this.props;
    return (
      <div className={styles.changemain}>
        {
          accountList && accountList.map((item) => (
            <div
              onClick={() => this.checkoutAccount(item.id)}
              style={{paddingBottom: '1rem'}}
              key={item.id}
            >
              <MainBodyItem
                title={item.accountName}
                account={item.account}
                adminName={item.adminName}
                img={account}
              />
            </div>
          ))
        }
        <div className={styles.newBtn}>
          <Icon style={{color: '#2C6EFF'}} type='plus-circle' />
          <Router.Link to='/addAccount'>
            <span>新增缴费账户</span>
          </Router.Link>
        </div>
        <ActivityIndicator toast text='' animating={loading || false} />
      </div>
    )
  }
}

export default withRouter(connect(({changeaccount, loading}: any) => ({
  accountList: changeaccount.accountList,
  loading: loading.effects['changeaccount/getList']
}))(ChangeAccount));