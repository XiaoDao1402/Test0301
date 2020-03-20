import React, { Component } from 'react';
import {Link} from 'react-router-dom' 
import { Table, Button, Radio, Switch ,Popconfirm, Form } from 'antd';


export default class TodoList extends Component {

    constructor(props) {
        super();
        this.state = {
            editingKey: '',
            onTodoList:[],
            onStatus:"1"
        }
        this.handleTodoListChange = this.handleTodoListChange.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState({
            onTodoList : nextProps.todolist,
            onStatus:"1"
        })
    }

    handleDelete(id) {
        this.props.onDelTodo(id);
    }

    handleFinished(item){
       item.finished = !item.finished; 
       this.props.onChangeFinishedStatus(item);
    }

    handleUpdate(value){
        console.info(value);
    }

    handleTodoListChange(e){
        var arr =this.props.todolist;    
        status = e.target.value;
        if(status === "1"){
            arr = arr;
        }else if(status === "2"){
            arr =  arr.filter(function(value,index,arr){
                return value.finished === false;
            })
        }else if(status === "3"){
           arr = arr.filter(function(value,index,arr){
                return value.finished === true;
            })
        }
        this.setState({
            onTodoList : arr,
            onStatus:status
        })
    }

    render() {
        const data = this.state.onTodoList;

        const columns = [
            {
                title: "编号",
                dataIndex: "id",
                key: 'id'
            },
            {
                title: "待办事项",
                dataIndex: "title",
              
                render:(text,record)=> 
                    <h4 className={record.finished?"finished":""}>{record.title}</h4>
            },
            {
                title: "操作",
                dataIndex: "Action",
                render: (text, record) =>
                    data.length >= 1 ? (
                        <div>
                            <Popconfirm  title="确定删除吗?" onConfirm={() => this.handleDelete(record.id)}>
                                <a>删除</a>
                            </Popconfirm>
                            <span style={{ marginRight: 16 }}></span>
                            <Popconfirm title={!record.finished?"确认完成吗":"确定取消完成吗"} onConfirm={() => this.handleFinished(record)}>
                                
                                <a>{!record.finished?"完成":"取消完成"}</a>
                            </Popconfirm>
                            <span style={{ marginRight: 16 }}></span>
                            <Link to={'/todolist-js/detail/'+record.id}>
                                <Button type="link" size="large" >
                                    编辑
                                </Button>
                            </Link>
                          
                        </div>
                ) : null,

            }
        ];

        return (
            <div style={{marginTop:'10px'}}>
                <Radio.Group value={this.state.onStatus} buttonStyle="solid" onChange={this.handleTodoListChange}>
                    <Radio.Button value="1">全部事项</Radio.Button>
                    <Radio.Button value="2">未完成事项</Radio.Button>
                    <Radio.Button value="3">已完成事项</Radio.Button>
                </Radio.Group>
                <Table dataSource={data} columns={columns} rowKey={data => data.id} bordered={true}></Table>
            </div>
        )
    }

}
