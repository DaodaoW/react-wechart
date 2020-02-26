import React from 'react';
import { Btn } from './styled';
import { router as Router, connect } from 'dva';
import route from 'umi/router';
import { Modal } from 'antd-mobile';

import styles from './index.css';

import { isBindingState, isBindingProps, ShowAccountProps } from './isbinding.d';

const ShowAccount: React.FC<ShowAccountProps> = (props) => {
  const { wordColor, title, color, money, btntitle } = props;
  return (
    <div className={styles.showaccount}>
      <p style={{color: wordColor, fontSize: '1.3rem'}}>{money}元</p>
      <p style={{color: '#999999'}}>{title}</p>
      <Btn onClick={props.onClick} color={color}>{btntitle}</Btn>
    </div>
  )
}

class IsBinding extends React.Component<isBindingProps, isBindingState> {
  state = {
    visiable: false,
    fee: '0'
  }

  free = (): void => {
    this.setState({
      visiable: true
    });
  }

  record = (): void => {
    route.push('/bill');
  }

  onClose = (): void => {
    this.setState({
      visiable: false
    })
  }

  /**
   * 设置金额
   */
  setValue = (e: any): void => {
    this.setState({
      fee: e.target.value
    });
  }

  /**
   * 创建充值订单
   */
  createRechargeOrder = (): void => {
    const { dispatch } = this.props;
    const { fee } = this.state;
    const params = new FormData();
    params.append('amount', fee);
    this.onClose();
    dispatch({
      type: 'account/createRechargeOrder',
      payload: params
    }).then((res: any) => {
      if (!res) return;
      const { orderFee, orderId, orderNo } = res.entity;
      route.push(`/pay?orderFee=${orderFee}&orderId=${orderId}&orderNo=${orderNo}`);
    });
  }

  render() {
    const { accountInfo } = this.props;
    const { visiable } = this.state;
    return (
      <div className={styles.blockpage}>
        <Modal
          visible={visiable}
          transparent
          title='请输入充值金额'
          footer={[
            {
              text: '取消',
              onPress: () => {
                this.onClose();
              }
            },
            {
              text: '确定充值',
              onPress: () => {
                this.createRechargeOrder();
              }
            }
          ]}
        >
          <input type='number' onChange={this.setValue} className={styles.isbindinput} />
        </Modal>
        <ShowAccount
          money={accountInfo.consumeAmount}
          title='本月已用'
          btntitle='充值记录'
          onClick={this.record}
          color='#FF9900'
          wordColor='#006CFF'
        />
        <div className={styles.line}></div>
        <ShowAccount
          money={accountInfo.balance}
          title='账户余额'
          onClick={this.free}
          btntitle='充值'
          color='#006CFF'
          wordColor='#EB646A'
        />
        <div className={styles.changeBtn}>
          <Btn color='#006CFF'>
            <Router.Link style={{color: '#FFFFFF'}} to='/changeAccount'>切换账户</Router.Link>
          </Btn>
        </div>
      </div>
    )
  }
}

export default connect(({account}: any) => ({
  accountInfo: account.accountInfo,
}))(IsBinding);
