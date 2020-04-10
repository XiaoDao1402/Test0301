import * as usersService from './../service';

export default {
  namespace: 'todos',  //命名空间
  state: {            //
    todolist: [],
  },
  reducers: {
    getTodos(state:any, { payload: { data: todolist} }) {
      return { ...state, todolist };
    },
  },
  effects: {
    
  },
  subscriptions: {

  }
};