import React from 'react';
import { connect } from 'dva';
import { NavBar, InputItem } from 'antd-mobile';
import { Icon, message } from 'antd';
import UserTitle from '@/components/userTitle/userTitle';

import styles from './index.css';

const title = '新用户绑定';

export interface UserLoginProps {
  dispatch: Function
}

interface UserLoginState {
  phone: string | undefined,
  background: string
}

class UserLogin extends React.Component<UserLoginProps, UserLoginState> {

  state = {
    phone: '',
    background: '#E5E5E5'
  }

  componentDidMount() {
  }

  setPhone = (e: string): void => {
    const phone = e;
    let background: string;
    if (e.replace(/\s*/g, '').length === 11) {
      background = '#2C6EFF';
    } else {
      background = '#E5E5E5';
    }
    this.setState({
      phone,
      background
    });
  }

  checkPhoneRegister = () => {
    const { dispatch } = this.props;
    const phone = this.state.phone.replace(/\s*/g, '');
    if (phone.length !== 11) return;
    dispatch({
      type: 'userlogin/checkPhoneRegister',
      payload: {
        phone
      }
    });
  }

  render() {
    const { background, phone } = this.state;
    return (
      <>
        <div className={styles.phoneInput}>
          <span>
            +86
            <Icon type='caret-down' theme='filled' />
          </span>
          <InputItem
            value={phone}
            type='phone'
            placeholder='请输入手机号'
            clear={true}
            style={{width: 'calc(100vw - 11rem)'}}
            onChange={this.setPhone}
          />
        </div>
        <div className={styles.btn}>
          <div onClick={this.checkPhoneRegister} style={{ background }}>下一步</div>
        </div>
        <p className={styles.tips}>点击“下一步”即表示您同意协议</p>
        <div className={styles.agreement}>
          <a>《服务协议》</a>
          <a>《隐私政策》</a>
        </div>
      </>
    )
  }
}

export default connect()(UserTitle(UserLogin, title));
