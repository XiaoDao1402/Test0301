import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd';
import { TodoItem } from './App';
import initialState from 'F:/git/Test0301/todolist-umi/src/.umi/plugin-initial-state/models/initialState';



interface TodoItemState {
    item:TodoItem,
}

export default class TodoItemDetail extends React.Component<any, TodoItemState> {

    constructor(props: any) {
        super(props);
     
        this.state = {
            item:{
                id:0,
                title:'',
                finished:false
            },
         
        };
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount(){
        this.initUpdateData();
    }

    initUpdateData() {
        const id = this.props.match.params.id;

        fetch('/api/todolist')
        .then(res => res.json())
        .then(data => {
            var arr = data.slice();
            var item = arr.find(function (value: any, index: number, arr: any) {
                return value.id === Number(id);
            });
           
            this.setState({            
                item:item
            });
          
        });
    }

    handleChangeText(e: any) {
       
    }

    handleUpdate(value: string) {
        if (!value) {
            return;
        } else {
            
        }
    }

    handleSubmit(e: any) {
       

    }

    handleSubmitFail(e: any) {
        alert("提交错误");
    }


    render() {
        const { item } = this.state;

        console.info(item);

        const layout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 10 },
        };

        const tailLayout = {
            wrapperCol: { offset: 2, span: 10 },
        };

        return (
            <div>
                <h1>修改事项——————标题：{item.title}</h1>

                <Link to="/todolist-ts/App">
                    <h3 style={{color:'#2c81ea'}}>返回首页</h3>
                </Link>
                
                <Form {...layout}
                    name="basic"
                    initialValues={{item}}
                    onFinish={this.handleSubmit}
                    onFinishFailed={this.handleSubmitFail}
                >
                    <Form.Item
                        label="事项编号"
                        name='id'
                        rules={[{ required: true, message: '输入事项不能为空' }]}
                    >
                        <Input defaultValue={item.id} disabled={true} />
                    </Form.Item>

                    <Form.Item
                        label="事项内容"
                        name='title'
                        rules={[{ required: true, message: '输入事项不能为空' }]}
                    >
                        <Input defaultValue={item.title}   onChange={this.handleChangeText} />
                    </Form.Item>

                    <Form.Item
                        label="完成状态"
                        name='finished'
                        rules={[{ required: true, message: '输入事项不能为空' }]}
                    >
                        <Input  defaultValue={item.finished?'已完成':'未完成'} disabled={true}/>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            修改
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
