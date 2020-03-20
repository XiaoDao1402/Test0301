import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Table,Popconfirm,Button,Radio} from 'antd'
import { TodoItem } from './App';


export interface Props{
    todolist:TodoItem[],
    onDeleteTodo:(id:number)=>void,
    onChangeTodoStatus:(todoItem:TodoItem)=>void
}

interface State{
    todolist:TodoItem[],
    onStatus:string
}

export default class Todolist extends Component<Props,State>{

    constructor(props:Props,state:State){
        super(props);
        this.state={
            todolist:this.props.todolist,
            onStatus:"1"
        }
        this.handleTodoListChange = this.handleTodoListChange.bind(this);
    }

    UNSAFE_componentWillReceiveProps(props:Props){
        this.setState({
            todolist:props.todolist,
            onStatus:"1"
        })
    }

    handleDelete(e:number){
        this.props.onDeleteTodo(e);
    }

    handleFinished(e:TodoItem){
        e.finished=!e.finished;
        this.props.onChangeTodoStatus(e);
    }

    handleTodoListChange(e:any){
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
            todolist:arr,
            onStatus:status
        })
    }

    render(){
        const data = this.state.todolist;
    
        const columns = [
            {
                title: "编号",
                dataIndex: "id",
            },
            {
                title: "待办事项",
                dataIndex: "title",
                render:(text:any,record:TodoItem)=> 
                <h4 className={record.finished?"finished":""}>{record.title}</h4>
            },
            {
                title: "操作",
                dataIndex: "Action",
                render:(text:any,record:TodoItem)=> data.length >= 1 ? (
                    <div>
                        <Popconfirm  title="确定删除吗?" onConfirm={() => this.handleDelete(record.id)}>
                            <a>删除</a>
                        </Popconfirm>
                        <span style={{ marginRight: 16 }}></span>
                        <Popconfirm title={!record.finished?"确认完成吗":"确定取消完成吗"} onConfirm={() => this.handleFinished(record)}>
                            
                            <a>{!record.finished?"完成":"取消完成"}</a>
                        </Popconfirm>
                        <span style={{ marginRight: 16 }}></span>
                        <Link to={'/todolist-ts/detail/'+record.id}>
                            <Button type="link" size="large" >
                                详情
                            </Button>
                        </Link>
                      
                    </div>
            ) : null,
            }
        ];

        return(
            <div style={{marginTop:'10px'}}>
                <Radio.Group value={this.state.onStatus} buttonStyle="solid" onChange={this.handleTodoListChange}>
                    <Radio.Button value="1">全部事项</Radio.Button>
                    <Radio.Button value="2">未完成事项</Radio.Button>
                    <Radio.Button value="3">已完成事项</Radio.Button>
                </Radio.Group>
                <Table dataSource={data} columns={columns} rowKey={data=>data.id}  bordered={true}></Table>
            </div>            
        )
    }
}