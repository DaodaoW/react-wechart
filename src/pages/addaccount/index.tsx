import React from 'react';
import { connect } from 'dva';
import { InputItem } from 'antd-mobile';
// import { Icon } from 'antd';

import styles from './index.css';

interface AddAccountProps {
  dispatch: Function
}

interface AddAccountState {
  password: string,
  account: string,
  background: string
}

class AddAccount extends React.Component<AddAccountProps, AddAccountState>  {

  state = {
    password: '',
    account: '',
    background: '#E5E5E5'
  }

  setAccount = (e: any): void => {
    const { password } = this.state;
    let background = '#E5E5E5';
    if (password && e) {
      background = '#2C6EFF';
    } else {
      background = '#E5E5E5';
    }
    this.setState({
      account: e,
      background
    });
  }

  setPwd = (e: any): void => {
    const { account } = this.state;
    let background = '#E5E5E5';
    if (e && account) {
      background = '#2C6EFF';
    } else {
      background = '#E5E5E5';
    }
    this.setState({
      password: e,
      background
    });
  }

  submit = (): void => {
    const { password, account } = this.state;
    if (!password || !account) return;
    const { dispatch } = this.props;
    const params = new FormData();
    params.append('account', account);
    params.append('password', password);
    dispatch({
      type: 'addaccount/bandingUser',
      payload: params
    });
  }

  render() {
    const { background } = this.state;
    return (
      <div className={styles.addmain}>
        <InputItem
          type='number'
          placeholder='请输入账号'
          maxLength={15}
          onChange={(e) => this.setAccount(e)}
        >
          <span style={{color: '#EB646A '}}>*</span> 账号
        </InputItem>
        <InputItem
          type='password'
          placeholder='请输入账号密码'
          onChange={(e) => this.setPwd(e)}
        >
          <span style={{color: '#EB646A '}}>*</span> 账号密码
        </InputItem>
        <p>
          <span>点击“下一步”即表示您同意</span>
          <a>《布兰图自助缴费协议》</a>
        </p>
        <div className={styles.btn}>
          <div onClick={this.submit} style={{ background }}>下一步</div>
        </div>
      </div>
    )
  }
}

export default connect()(AddAccount);