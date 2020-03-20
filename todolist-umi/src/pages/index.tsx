import React from 'react';
import {Link} from 'react-router-dom';
import './index.less'
import {ConfigProvider} from 'antd'
import zhCN from 'antd/es/locale/zh_CN';

export default () => {


  return (
    <ConfigProvider locale ={zhCN}>
      <Link to="/todolist-js/App">
        <h1>Todolist JSX 写法</h1>
      </Link>

      <Link to="/todolist-ts/App">
        <h1>Todolist TSX 写法</h1>
      </Link>

    </ConfigProvider>
  );
}
