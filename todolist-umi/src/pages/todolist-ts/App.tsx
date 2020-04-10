import React from 'react';
import {Link} from 'react-router-dom';
import TodoList  from './Todolist';
import TodoHeader from './TodoHeader';

export interface TodoItem{
  id:number,
  title:string,
  finished:boolean
}

export interface State{
  todolist:TodoItem[]
}


export default class App extends React.Component<{},State>{

  constructor(props:any,state:State){
    super(props);
    this.initData();
    this.state={
      todolist:[]
    }
    this.deleteTodo = this.deleteTodo.bind(this);
    this.changeTodoStatus = this.changeTodoStatus.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  initData(){
    fetch("/api/todolist")
    .then(res=>res.json())
    .then(res=>
        this.setState({
          todolist:res
      })
    )
  }

  deleteTodo(id:number){
    var arr = this.state.todolist.slice();
    var deleteItem = arr.findIndex(function(value,index,arr){
        return value.id===id;
    })
    arr.splice(deleteItem,1);
    this.setState({
      todolist:arr
    })
  }

  changeTodoStatus(item:TodoItem){
    var arr = this.state.todolist.slice();
    var updateItem = arr.find(function(value,index,arr){
        return value.id=== item.id;
    });
    if(updateItem){
      updateItem.finished = item.finished; 
      this.setState({
        todolist:arr
      })
    }
    
  }


  addTodo(item:TodoItem){
    var arr = this.state.todolist.slice();
    arr.push(item);
    arr.sort((a, b)=> a.title.localeCompare(b.title, 'zh'));
    this.setState({
      todolist:arr
    })
  }

  render(){
    return(
      <div>
        <h1>TodoList ts 写法</h1>

        <TodoHeader 
          todolist = {this.state.todolist}
          onAddTodo = {this.addTodo}
        />

        <TodoList 
          todolist={this.state.todolist}
          onDeleteTodo = {this.deleteTodo}
          onChangeTodoStatus = {this.changeTodoStatus}
        />
      

      </div>
    )
  }

}