import React from 'react';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import moment from 'moment';
import ListItem from './index';
import { ListView, DatePicker, List, PullToRefresh } from 'antd-mobile';
import { Icon } from 'antd';

import styles from './style.css';

interface DataListState {
  dataSource: any,
  height: number | string,
  date: string,
  total: number,
  page: number,
  billData: any,
  refreshing: boolean
}

interface DataListProps {
  dispatch: Function,
  loading: boolean
}

let row: any;
const getSectionData = (dataBlob: any, sectionID: any) => dataBlob[sectionID];
const getRowData = (dataBlob: any, sectionID: any, rowID: any) => dataBlob[rowID];
const dataSources = new ListView.DataSource({
  getRowData,
  getSectionHeaderData: getSectionData,
  rowHasChanged: (row1: any, row2: any) => row1 !== row2,
  sectionHeaderHasChanged: (s1: any, s2: any) => s1 !== s2,
});

class DataList extends React.Component<DataListProps, DataListState> {
  constructor(props: DataListProps) {
    super(props);
    this.state = {
      dataSource: dataSources,
      height: 'calc(100vh - 3rem)',
      date: '',
      total: 0,
      page: 0,
      billData: [],
      refreshing: true
    };
  }

  componentDidMount() {
    this.getBillDetails();
  }

  // 获取充值记录
  getBillDetails = (): void => {
    const { dispatch } = this.props;
    const { page, billData, date } = this.state;
    dispatch({
      type: 'bill/getTransactionFlow',
      payload: {
        startTime: date && moment(date).startOf('month').format('YYYY-MM-DD'),
        endTime: date && moment(date).endOf('month').format('YYYY-MM-DD'),
        page: page + 1,
        pageSize: 20
      }
    }).then((res: any) => {
      if (!res) return;
      const { data, current_page, total } = res.entity;
      const datas = billData.concat(data);
      this.setRow(datas);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(datas),
        total,
        page: current_page,
        billData: datas,
        refreshing: false
      });
    });
  }


  setDate = (date: any): void => {
    this.setState({
      date,
      billData: [],
      total: 0,
      page: 0,
    });
    setTimeout(() => {
      this.getBillDetails();
    });
  }

  setRow = (data: any): void => {
    let index = data.length - 1;
    row = (rowData: any, sectionID: any, rowID: number) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (<ListItem rowID={rowID} obj={obj || {}} />);
    };
  }

  onEndReached = (event: any) => {
    const { billData, total } = this.state;
    if (billData.length === total) {
      return;
    }
    this.getBillDetails();
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.setDate(this.state.date);
  };

  render() {
    const { loading } = this.props;
    const { dataSource, height, date, total, billData, refreshing } = this.state;
    const separator = (sectionID: any, rowID: any) => (
      <div key={`${sectionID}-${rowID}`} style={{ backgroundColor: '#F5F5F9' }} />
    );
    return (
      <>
        <div className={styles.title}>
          <span>充值记录</span>
          <div className={styles.choosedate}>
            <div className={styles.choosecom}>
              <DatePicker
                mode='month'
                title='选择日期'
                extra='请选择'
                onChange={e => this.setDate(e)}
              >
                <List.Item arrow='horizontal' />
              </DatePicker>
            </div>
            <div className={styles.choosebtn}>
              <span>{date ? `${moment(date).format('MM')}月` : '全部'}</span>
              <Icon type='caret-down' />
            </div>
          </div>
        </div>
        <ListView
          dataSource={dataSource}
          renderFooter={() => (
            <div style={{ padding: 10, textAlign: 'center' }}>
              {loading ? '加载中...' :  billData.length === total ? '没有更多了' : null}
            </div>
          )}
          renderRow={row || (() => {})}
          renderSeparator={separator}
          style={{ height, overflow: 'auto' }}
          scrollRenderAheadDistance={10}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={20}
          initialListSize={20}
          pullToRefresh={
            <PullToRefresh
              refreshing={refreshing}
              onRefresh={this.onRefresh}
              indicator={{activate: '松开刷新', finish: '刷新完成', deactivate: '下拉刷新'}}
            />
          }
        />
      </>
    );
  }
};

export default withRouter(connect(({loading}: any) => ({
  loading: loading.effects['bill/getTransactionFlow']
}))(DataList));