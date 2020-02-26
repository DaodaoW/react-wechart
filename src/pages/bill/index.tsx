import React from 'react';
import DataList from './components/listItem/dataList';

import styles from './index.css';

interface InvestRecordProps {
  dispatch?: Function
}

class Bill extends React.Component<InvestRecordProps> {

  componentDidMount() {
  }

  render() {
    return (
      <div className={styles.billmain}>
        <DataList />
      </div>
    );
  }
}

export default Bill;