import React from 'react';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import { ActivityIndicator } from 'antd-mobile';
import { MainBody } from '@/components/mainBody/mainBody';
import { NoBinding } from './components/nobinding/nobinding';
import IsBinding from './components/isbinding/isbinding';
import DataList from './components/listItem/dataList';

interface BindAccountProps {
  dispatch: Function,
  data: Object,
  loading: boolean,
  loadingPay: boolean,
  show: boolean,
  loadingHome: boolean
}


class BindAccount extends React.Component<BindAccountProps> {

  componentDidMount() {
    this.getWeather();
    this.getList();
  }

  getWeather = (): void => {
    const { dispatch } = this.props;
    dispatch({
      type: 'account/getWeather',
      payload: {
        latitude: '29.83',
        longitude: '121.53'
      }
    });
  }

  getList = (): void => {
    const { dispatch } = this.props;
    dispatch({
      type: 'account/getList'
    });
  }

  render() {
    const { data, loading, show, loadingPay, loadingHome } = this.props;
    return (
      <div style={{background: '#EEEEEE'}}>
        <MainBody data={data}>
          { show ? <IsBinding /> : <NoBinding /> }
        </MainBody>
        <div style={{marginTop: '7rem'}}>
          { show ? <DataList /> :  null }
        </div>
        <ActivityIndicator toast text='' animating={loading || loadingPay || loadingHome || false} />
      </div>
    )
  }
}

export default withRouter(connect(({account, loading}: any) => ({
  data: account.data,
  show: account.show,
  loading: loading.effects['account/getOverview'],
  loadingPay: loading.effects['account/createRechargeOrder'],
  loadingHome: loading.effects['account/getList'],
}))(BindAccount));