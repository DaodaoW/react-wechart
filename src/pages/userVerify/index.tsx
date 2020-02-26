import React from 'react';
import { InputItem, ActivityIndicator } from 'antd-mobile';
import { connect } from 'dva';
import SendVerifyCode from './components/sendVerifyCode/index';
import UserTitle from '@/components/userTitle/userTitle';

import styles from './index.css';

const title = '请输入验证码';

interface UserVerifyState {
  verifyCode: Array<string>
}

interface UserVerifyProps {
  dispatch: Function,
  title: string,
  location: any,
  loading: boolean
}

class UserVerify extends React.Component<UserVerifyProps, UserVerifyState> {

  state = {
    verifyCode: ['', '', '', '']
  }

  // 输入并显示验证码
  setVerifyCode = (e: string): void => {
    const getData = e.split('');
    const length = getData.length;
    const data = this.state.verifyCode;
    length > 0 ? data[length - 1] = getData[length - 1] : null;
    if (length <= 4) {
      for (let i = length; i < 4; i++) {
        data[i] = '';
      }
      length === 4 ? this.inputVCode(e) : null;
      this.setState({
        verifyCode: data
      });
    }
  }

  // 验证码校验
  inputVCode = (verificationCode: string): void => {
    const { dispatch } = this.props;
    const params = new FormData();
    params.append('verificationCode', verificationCode);
    dispatch({
      type: 'userverify/inputVCode',
      payload: params
    });
  }

  render() {
    const { verifyCode } = this.state;
    const { loading } = this.props;
    const phone = this.props.location.query.phone;
    return (
      <>
        <p className={styles.tips}>验证码已发送至手机：+86 {phone}</p>
        <div className={styles.verifyCode}>
          {
            verifyCode.map((item: string, index: number) => {
              return <div className={styles.verifyItem} key={index}>{item}</div>
            })
          }
          <div className={styles.verifyInput}>
            <InputItem
              type='number'
              onChange={this.setVerifyCode}
              maxLength={4}
            />
          </div>
        </div>
        <SendVerifyCode phone={phone} />
        <ActivityIndicator toast text='' animating={loading || false} />
      </>
    )
  }
}

export default connect(({loading}: any) => ({
  loading: loading.effects['userverify/inputVCode']
}))(UserTitle(UserVerify, title));