import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd';
import { TodoItem } from './App';

interface TodoItemState {
    item: {};
    id: TodoItem['id'];
    title: TodoItem['title'];
    finished: TodoItem['finished'];
}

export default class TodoItemDetail extends React.Component<any, TodoItemState> {

    constructor(props: any) {
        super(props);
        this.initUpdateData();
        this.state = {
            item: {},
            id: 0,
            title: '',
            finished: false,
        };
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                    item: item,
                    id: item.id,
                    title: item.title,
                    finished: item.finished,
                });
            });
    }

    handleChangeText(e: any) {
        this.setState({
            title: e.target.value,
        });
    }

    handleUpdate(value: string) {
        if (!value) {
            return;
        } else {
            this.setState({
                title: value,
            });
        }
    }

    handleSubmit(e: any) {
        
        
        this.setState({
            title:e
        })

    }

    handleSubmitFail(e: any) {
        alert("提交错误");
    }

    render() {
        const { id, title, finished } = this.state;

        const layout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 10 },
        };

        const tailLayout = {
            wrapperCol: { offset: 2, span: 10 },
        };

        return (
            <div>
                <h1>修改事项——————标题：{title}</h1>

                <Link to="/todolist-ts/App">
                    <h3 style={{color:'#2c81ea'}}>返回首页</h3>
                </Link>
                
                <Form {...layout}
                    name="basic"
                    onFinish={this.handleSubmit}
                    onFinishFailed={this.handleSubmitFail}
                    initialValues={{ remember: true }}>
                    <Form.Item
                        label="事项编号"
                        name="id"
                        rules={[{ required: true, message: '输入事项不能为空' }]}
                    >
                        <Input value={id} />
                    </Form.Item>

                    <Form.Item
                        label="事项内容"
                        name="title"
                        rules={[{ required: true, message: '输入事项不能为空' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="完成状态"
                        name="finished"
                        rules={[{ required: true, message: '输入事项不能为空' }]}
                    >
                        <Input />
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
