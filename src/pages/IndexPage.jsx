import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';

/**
 * 容器
 */
class IndexPage extends React.Component {
  render() {
    return (
      <div style={{ height: '100%' }}>
        {this.props.children}
      </div>
    );
  }
}

export default connect()(IndexPage);
