<script>
import { useRoute } from 'vue-router';
import todoState from '../state/todoState';

export default{
    data(){
        return{
            isTodoDone: todoState.selectedTodo.process,
        }

    },
    methods: {
        handleDone(){
            this.isTodoDone = true
            todoState.selectedTodo.process = true;
            
        },
        handleNotDone(){
            this.isTodoDone = false
            todoState.selectedTodo.process = false;
            
        },
        editTodo(){
            todoState.editTodo({
                id: this.todo.id,
                title: this.todo.title,
                category: this.todo.category,
                date: this.todo.date,
                startTime: this.todo.startTime,
                endTime: this.todo.endTime,
                description: this.todo.description,
                process: this.isTodoDone
            })
            console.log(todoState.selectedTodo);
            alert("Todo updated successfully")
            
        },
        handleDeleteTodo() {
            // Onay penceresi göster
            const confirmation = window.confirm("Are you sure you want to delete this todo?");
            if (confirmation) {
                todoState.deleteTodo(this.todo.id); // Todo'yu sil
                alert("Todo deleted successfully");
                // Silindikten sonra başka bir sayfaya yönlendirme yapmak isterseniz
                this.$router.push('/todos'); // Örneğin, tüm todo'ları listeleyen sayfaya yönlendirme
            }
        }
    },

    setup(){
        const route = useRoute();
        const todoId = route.params.id;

        const todo = todoState.todos.find(todo => todo.id === Number(todoId));
        console.log(todo);

        todoState.selectedTodo = todo;
        console.log(todoState.selectedTodo.process);
        
        return {todo}
    }

}

</script>

<template>
    <div class=" h-max lg:h-screen flex flex-col items-center justify-center my-10 mx-3">
        <div v-if="todo" class="w-full min-[730px]:w-1/2 flex flex-col items-start justify-center p-6 rounded-lg bg-white">
            <input type="text" v-model="todo.title" class="font-semibold text-2xl outline-none border-b pb-2 border-black mb-10 w-full">

            <div class="category w-full mb-5">
                <h2 class="text-lg font-semibold mb-2">Category</h2>
                <div class="flex flex-wrap items-center gap-2">
                    <p 
                    v-for="kategori in todo.category"
                    :key="kategori.id"
                    class="px-4 py-1 mb-1 rounded-lg cursor-pointer bg-blue-500 text-white"
                    >
                        {{ kategori }}
                    </p>

                </div>
            </div>


            <div class="w-full mb-5">
                <h2 class="text-lg font-semibold mb-2">Date</h2>
                <input type="date" v-model="todo.date" class="border border-gray-300 shadow-md rounded-md p-2 w-full outline-none">
            </div>

            <div class="w-full flex items-center justify-between gap-4 mb-5">
                <div class="flex flex-col w-1/2">
                    <h2 class="text-lg font-semibold mb-2">Start Time</h2>
                    <input type="time" v-model="todo.startTime" name="" id="" class="border border-gray-300 shadow-md rounded-md px-2 py-1 w-full outline-none">
                </div>
                <div class="flex flex-col w-1/2">
                    <h2 class="text-lg font-semibold mb-2">End Time</h2>
                    <input type="time" v-model="todo.endTime" name="" id="" class="border border-gray-300 shadow-md rounded-md px-2 py-1 w-full outline-none">
                </div>
            </div>

            <div class="mb-5 w-full">
                <h2 class="text-lg font-semibold mb-2">Description</h2>
                <textarea v-model="todo.description" name="" id="" class="border border-gray-300 rounded-md px-2 py-1 w-full outline-none shadow-md resize-none h-36"></textarea>
            </div>

            <div class="mb-5">
                <div>
                    <button class="bg-green-500 hover:bg-green-400 duration-150 px-2 py-1 rounded-md mr-2 text-white" @click="handleDone">Done</button>
                    <button class="bg-red-600 hover:bg-red-400 duration-150 text-white px-2 py-1 rounded-md" @click="handleNotDone">Not done</button>
                </div>
                
                <div class="mt-2">
                    <div v-if="isTodoDone" class="flex items-start justify-start">
                        <i class="fa-solid fa-check text-green-500 text-xl font-bold mr-2"></i>
                        <p class="text-green-600">You have done it!</p>
                    </div>
                    <div v-if="!isTodoDone" class="flex items-start justify-start">
                        <i class="fa-solid fa-xmark text-red-600 text-xl font-bold mr-2"></i>
                        <p class="text-red-600">Not done yet!</p>
                    </div>
                    
                </div>
                
            </div>

            <div>
                <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 duration-150 mr-3" @click="editTodo">Edit Todo</button>
                <button class="text-xl text-red-600" @click="handleDeleteTodo">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>

        </div>
    </div>
</template>
