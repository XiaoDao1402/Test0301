import React from 'react';
import {Link} from 'react-router-dom';
import './index.less'
import {ConfigProvider} from 'antd'
import zhCN from 'antd/es/locale/zh_CN';
import {createStore} from 'redux';
import {Provider} from 'react-redux'
import Todolist from './todolist-ts/Todolist';

const reducer  = function(state=todoData,action:any){
  return state;
}

const todoData ={
  todolist:[
    {id:1,title:"唱",finished:false},
    {id:2,title:"跳",finished:false},
    {id:3,title:"rap",finished:false},
    {id:4,title:"篮球",finished:false}
  ]
}

let store = createStore(reducer);

export default () => {

  return (
    <Provider store = {store}>
      <ConfigProvider locale ={zhCN}>
            <Link to="/todolist-js/App">
              <h1>Todolist JSX 写法</h1>
            </Link>

            <Link to="/todolist-ts/App">
              <h1>Todolist TSX 写法</h1>
            </Link>

          </ConfigProvider>
    </Provider>
   
  );
}
