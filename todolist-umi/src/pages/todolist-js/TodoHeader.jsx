import React, { Component } from 'react'
import { Input, Button } from 'antd'

export default class TodoHeader extends Component {

    constructor(props) {
        super(props);
        this.handleChangeText = this.handleChangeText.bind(this);
    }

    handleChangeText(value) {
        if(!value){
            return;
        }
        var data = this.props.todolist.sort((a,b)=>a.id-b.id);
        var lastArr = data.slice(-1);
        this.props.onAddTodo({
            id:lastArr[0].id + 1 ,
            title:value,
            finished:false
        })  
    }

    render() {
        const { Search } = Input;
        return (
            <div style={{ display: 'inline-block' }}>
                <Search
                    placeholder="待办事项"
                    enterButton="添加"
                    size="large"
                    onSearch={this.handleChangeText}
                /> 
            </div>
        )
    }
}