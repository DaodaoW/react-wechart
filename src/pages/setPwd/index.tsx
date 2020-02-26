import React from 'react';
import { connect } from 'dva';
import { InputItem } from 'antd-mobile';
// import { Icon, Input } from 'antd';
import UserTitle from '@/components/userTitle/userTitle';

import styles from './index.css';
import { message } from 'antd';

const title = '请设置密码';

interface SetPwdState {
  password: string,
  background: string
}
interface SetPwdProps {
  title: string,
  dispatch: Function
}

class SetPwd extends React.Component<SetPwdProps, SetPwdState> {

  state = {
    password: '',
    background: '#E5E5E5'
  }

  setPwd = (e: any): void => {
    let background: string;
    if (e.length >= 6) {
      background = '#2C6EFF';
    } else {
      background = '#E5E5E5';
    }
    this.setState({
      password: e,
      background
    });
  }

  sendPwd = () => {
    const { dispatch } = this.props;
    const { password } = this.state;
    if (password.length < 6) return;
    const params = new FormData();
    params.append('password', password);
    dispatch({
      type: 'setpwd/setPassword',
      payload: params
    });
  }

  render() {
    const { password, background } = this.state;
    return (
      <>
        <p className={styles.tips}>登录密码用于手机APP与后台登录</p>
        <div className={styles.pwdInput}>
          <div style={{marginLeft: -15}}>
            <InputItem
              value={password}
              type='password'
              placeholder='请输入密码'
              clear={true}
              maxLength={20}
              onChange={this.setPwd}
              style={{width: 'calc(100vw - 6rem)'}}
            />
          </div>
        </div>
        <a className={styles.pwdTips}>密码需要6-20位字符</a>
        <div className={styles.btn}>
          <div onClick={this.sendPwd} style={{ background }}>下一步</div>
        </div>
      </>
    )
  }
}

export default connect()(UserTitle(SetPwd, title));