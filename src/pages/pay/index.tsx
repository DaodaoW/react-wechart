import React from 'react';
import { connect } from 'dva';
import { Icon, message } from 'antd';
import { ActivityIndicator } from 'antd-mobile';
import { DivRadio } from './styled';
import { PayItem } from './components/payItem/payItem';
import styles from './index.css';
import router from 'umi/router';

interface PayProps {
  dispatch: Function,
  location: any,
  loading: boolean
}
class Pay extends React.Component<PayProps> {

  unifiedOrder = (): void => {
    const { orderFee, orderId } = this.props.location.query;
    const { dispatch } = this.props;
    const params = new FormData();
    params.append('rechargeWay', '6');
    params.append('orderId', orderId);
    params.append('request', orderFee);
    dispatch({
      type: 'pay/unifiedOrder',
      payload: params
    }).then((res: any) => {
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          ...res.entity.order,
          package: res.entity.order.packageValue
        },
        function(result: any) {
          switch (result.err_msg) {
            case 'get_brand_wcpay_request:ok':
              router.push('/');
              break;
            case 'get_brand_wcpay_request:cancel':
              message.warning('充值取消');
              break;
            case 'get_brand_wcpay_request:fail':
              message.error('充值失败');
              break;
            default:
              router.push('/');
              break;
          }
        }
      );
    })
  }

  /**
   * 选择支付方式
   * @param {number} type 支付类型
   */
  choose = (type: number): void => {
    type === 2 ? message.warn('暂不支持支付宝充值') : null;
  }

  render() {
    const { orderFee, orderNo } = this.props.location.query;
    const { loading } = this.props;
    return (
      <div className={styles.payMain}>
        <div className={styles.payChoose}>
          <div className={styles.payAccount}>
            <p>充值金额</p>
            <p>￥{parseFloat(orderFee).toFixed(2)}</p>
          </div>
          <div className={styles.orderNo}>
            订单号：{orderNo}
          </div>
          <div className={styles.oneItem} style={{borderBottom: '1px solid #E5E5E5'}}>
            <PayItem title='微信支付' tips='推荐使用微信支付' iconName='wechat' bgColor='rgb(80, 186, 112)' />
            <DivRadio onClick={() => this.choose(1)} bgColor='#006CFF' color='#FFFFFF'>
              <Icon type='check' />
            </DivRadio>
          </div>
          <div className={styles.oneItem}>
            <PayItem title='支付宝支付' iconName='alipay' bgColor='rgb(6, 180, 253)' />
            <DivRadio onClick={() => this.choose(2)} bgColor='#FFFFFF' color='#FFFFFF'>
              <Icon type='check' />
            </DivRadio>
          </div>
        </div>
        <div className={styles.btn}>
          <div onClick={this.unifiedOrder}>确认支付</div>
        </div>
        <ActivityIndicator toast text='' animating={loading || false} />
      </div>
    )
  }
}

export default connect(({loading}: any) => ({
  loading: loading.effects['pay/unifiedOrder']
}))(Pay);