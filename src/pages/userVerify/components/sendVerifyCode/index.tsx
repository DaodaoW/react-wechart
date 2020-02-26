import React from 'react';
import { connect } from 'dva';

import styles from './index.css';

export interface SendVerifyCodeProps {
  dispatch: Function,
  phone: string
}

interface SendVerifyCodeState {
  second: number
}

class SendVerifyCode extends React.Component<SendVerifyCodeProps, SendVerifyCodeState> {

  state = {
    second: parseInt(window.sessionStorage.getItem('second') || '0', 60) || 60
  }

  componentDidMount() {
    const second = window.sessionStorage.getItem('second') || '60';
    this.setSecond(parseInt(second, 10));
    !window.sessionStorage.getItem('second') && this.sendVerifyCode();
  }

  sendVerifyCode = (): void => {
    const { dispatch, phone } = this.props;
    const params = new FormData();
    params.append('phone', phone);
    dispatch({
      type: 'verifycode/sendVCode',
      payload: params
    });
  }

  sendVerifyAgain = (): void => {
    const { second } = this.state;
    if (second > 0) return;
    this.sendVerifyCode();
    this.setSecond(60);
  }

  setSecond = (sec: number): void => {
    for (let i = sec; i >= 0; i--) {
      setTimeout(() => {
        window.sessionStorage.setItem('second', i.toString());
        this.setState({
          second: i
        });
      }, (-i + sec) * 1000);
    }
  }

  render() {
    const { second } = this.state;
    return (
      <div className={styles.tips}>
        {
          second ? <span>{second}秒后</span> : null
        }
        <span
          style={{color: second ? '#999999' : '#006CFF'}}
          onClick={this.sendVerifyAgain}
        >
          重发验证码
        </span>
      </div>
    )
  }
}

export default connect()(SendVerifyCode);