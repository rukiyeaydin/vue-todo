import { createRouter, createWebHashHistory } from "vue-router";
import Entry from "../routes/Entry.vue";
import Todos from "../routes/Todos.vue";
import TodoDetails from "../routes/TodoDetails.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: Entry,
    },
    {
        path: '/todos',
        name: 'todos',
        component: Todos,
    },
    {
        path: '/details/:id',
        name: 'details',
        component: TodoDetails,
        params: true,
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory(),
})

export default router;