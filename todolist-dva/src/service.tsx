import reqeust from './utils/utils';

export function getTodos(){
    return reqeust("/api/todolist",{});
}