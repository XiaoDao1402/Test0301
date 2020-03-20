import React,{Component} from 'react'
import TodoList from './TodoList'
import TodoHeader from './TodoHeader';

export default class App extends Component{

    constructor(props){
        super(props);
        this.initData();
        this.state={
            todolist:[],
            status:1

        }
        this.delTodo = this.delTodo.bind(this);
        this.changeFinishedStatus = this.changeFinishedStatus.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.changeTodolist = this.changeTodolist.bind(this);
    }
    
    initData(){
        fetch("/api/todolist")
        .then(res=>res.json())
        .then(res=>this.setState({
            todolist:res
        }))
    }

    delTodo(id){
        var arr = this.state.todolist.slice();
        var  delItem = arr.findIndex(function(value,index,arr){
            return value.id === id;
        })
        arr.splice(delItem,1);
        this.setState({
            todolist:arr
        })
    }

    changeFinishedStatus(item){
        var arr = this.state.todolist.slice();
        var updateItem = arr.find(function(value,index,arr){
            return value.id === item.id;
        })
        updateItem.finished = item.finished;
        this.setState({
            todolist:arr,
            status:1
        });
    }

    addTodo(item){
        var arr = this.state.todolist.slice();
        arr.push(item);
        arr.sort((a, b)=> a.title.localeCompare(b.title, 'zh'));
        this.setState({
            todolist : arr
        })
    }

    changeTodolist(status){
       

    }

    render(){
        return(       
            <div>
                <h1>Todolist JS写法</h1>

                <TodoHeader onAddTodo={this.addTodo} todolist={this.state.todolist}></TodoHeader>

                <TodoList 
                todolist={this.state.todolist}
                status={this.state.state}
                onDelTodo={this.delTodo}
                onChangeFinishedStatus = {this.changeFinishedStatus}
                onChangeTodoList={this.changeTodolist}
                ></TodoList>
            
            </div>
        )
    }

}