import React, { Component } from 'react'
import { Input } from 'antd'
import { TodoItem } from './App';


export interface Props{
    todolist:TodoItem[],
    onAddTodo:(e:TodoItem)=>void
}

export default class TodoHeader extends Component<any,Props> {

    constructor(props:Props) {
        super(props);
        this.handleChangeText = this.handleChangeText.bind(this);
    }

    handleChangeText(value:string) {
        if(!value){
            return;
        }
        var data = this.props.todolist.sort((a:TodoItem,b:TodoItem)=>a.id-b.id);
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