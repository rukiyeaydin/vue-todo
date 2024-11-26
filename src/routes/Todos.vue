<script>
import AddTodo from '../components/AddTodo.vue';
import { ref } from 'vue';
import todoState from '../state/todoState'

const modalActive = ref(false)

const toggleModal = () => {
    modalActive.value = !modalActive.value
}


export default{
    components: {
        AddTodo
    },
    setup(){
        return {
            modalActive,
            toggleModal,
            todos: todoState.todos
        }
    }
}

</script>

<template>
    <div class="h-full my-10 flex flex-col items-center justify-center mx-3">
        <h1 class="font-bold text-4xl mb-8">My ToDo's</h1>

        <p v-if="todos.length===0">You don't have any ToDo right now. Click "Add new todo" to create.</p>

        <!-- Todo List -->
        <div class="w-full flex flex-col items-center">
            <div 
                v-for="(todo, index) in todos" 
                :key="index" 
                class="flex bg-white shadow-md p-4 rounded-md w-full sm:w-1/2 items-center justify-between my-2 mx-4">
                
                <div>
                    <h2 class="text-xl font-semibold">{{ todo.title }}</h2>
                    <div class="flex text-gray-500 font-semibold text-sm">
                        <p>{{ todo.startTime }}&nbsp;-</p>
                        <p>&nbsp;{{ todo.endTime }}</p>
                    </div>

                </div>

                <div class="flex items-center justify-center">
                    <div class="text-2xl mr-5">
                        <i v-if="todo.process" class="fa-solid fa-check text-green-500"></i>
                        <i v-else class="fa-solid fa-xmark text-red-600"></i>
                    </div>
                    <router-link :to="{name: 'details', params: {id: todo.id}}">
                        <i class="fa-solid fa-right-to-bracket cursor-pointer text-xl text-blue-500 hover:text-blue-400 duration-150"></i>
                    </router-link>
                </div>
            </div>
        </div>


        <div class="w-full sm:w-1/2 justify-center flex mt-5">
            <button class="bg-blue-500 hover:bg-blue-400 duration-150 text-white px-4 py-1 rounded-md shadow-xl" @click="toggleModal">Add new todo</button>
        </div>

        <AddTodo :modalActive="modalActive" @close-modal="toggleModal" />


    </div>
</template>
