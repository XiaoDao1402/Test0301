import React, { Component } from 'react';
import {Input} from 'antd';


export default class TodoItemDetail extends Component{

    constructor(props){
        super(props);
    }


    render(){
        return(
            <div>
               <h1>{this.props.id}</h1>
            </div>
        )

    }
}