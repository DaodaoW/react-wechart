import React from 'react';
import styles from './index.css';

interface UserTitleRepos {
  title: string
}

const UserTitle = (WrapperComponent: any, title: string) => {
  return class extends React.Component<UserTitleRepos> {
    render() {
      return (
        <>
          <p className={styles.title}>{title}</p>
          <WrapperComponent {...this.props} />
        </>
      )
    }
  };
};

export default UserTitle;