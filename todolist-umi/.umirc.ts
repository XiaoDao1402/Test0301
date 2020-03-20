import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    { path: '/', component: '@/pages/index' },
    { path:'/todolist-js/App',component:'@/pages/todolist-js/App'},
    { path:'/todolist-ts/App',component:'@/pages/todolist-ts/App'},
    { path:'/todolist-js/detail/:id',component:'@/pages/todolist-js/TodoItemDetail'},
    { path:'/todolist-ts/detail/:id',component:'@/pages/todolist-ts/TodoItemDetail'}
  ],
});
