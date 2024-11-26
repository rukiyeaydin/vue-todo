<script setup>
import { reactive } from 'vue'
import { todoState } from '../state/todoState'

defineEmits(['close-modal'])

defineProps({
    modalActive: {
        type: Boolean,
        default: false
    }
})

const form = reactive({
    title: '',
    category: [],
    date: '',
    startTime: '',
    endTime: '',
    description: '',
}) 

const categories = reactive([
    { name: 'Personal', active: false },
    { name: 'Work', active: false },
    { name: 'Health', active: false },
    { name: 'Other', active: false },
]);

function toggleCategory(index) {
    categories[index].active = !categories[index].active;

    const categoryName = categories[index].name;
    if (categories[index].active) {
        // Eğer aktifse ekle
        form.category.push(categoryName);
        
    } else {
        // Eğer aktif değilse çıkar
        form.category = form.category.filter(cat => cat !== categoryName);
    }
}

function addTodo(){
    if (form.title.trim() === '' || form.date === '' || form.category.length === 0) {
        alert('Lütfen tüm gerekli alanları doldurun.');
    return }
    todoState.addTodo({
        id: Math.floor(Math.random() * 1000),
        title: form.title,
        category: form.category,
        date: form.date,
        startTime: form.startTime,
        endTime: form.endTime,
        description: form.description,
        process: false
    });

    alert("ToDo added successfully!");

    // Reset form
    Object.assign(form, {
    title: '',
    category: [],
    date: '',
    startTime: '',
    endTime: '',
    description: '',
    });

    // Kategorilerin aktiflik durumunu sıfırla
    categories.forEach(cat => (cat.active = false));

    console.log(todoState.todos);
}

</script>

<template>
    <Teleport to="body">
        <Transition name="modal-outer">
            <div v-show="modalActive" class="absolute w-full bg-black bg-opacity-30 top-0 left-0 flex justify-center px-4">
                <Transition name="modal-inner">
                    <div class="flex flex-col items-start p-4 bg-white h-max w-full md:w-1/2 my-12 max-w-screen-md rounded-lg">
                        <h2 class="text-2xl font-semibold mb-3">Add New ToDo</h2>

                        <div class="flex flex-col w-full mb-5">
                            <h3 class="font-semibold mb-1">Title</h3>
                            <input v-model="form.title" type="text" class="border border-gray-300 rounded-md px-2 py-1 w-full outline-none shadow-md">
                        </div>

                        <div class="flex flex-col w-full mb-5">
                            <h3 class="font-semibold mb-1">Category</h3>
                            <div class="flex flex-wrap items-center gap-2">
                                <p
                                v-for="(category, index) in categories" 
                                :key="index"
                                :class="['px-4 py-1 mb-1 rounded-lg cursor-pointer', 
                                category.active ? 'text-white bg-blue-500' : 'bg-teal-100',]"  
                                @click="toggleCategory(index)"
                                >{{ category.name }}</p>
                            </div>
                        </div>

                        <div class="w-full mb-5">
                            <h3 class="font-semibold mb-1">Date</h3>
                            <input v-model="form.date" type="date" class="border border-gray-300 shadow-md rounded-md px-2 py-1 w-full outline-none">
                        </div>

                        <div class="w-full flex items-center justify-between gap-4 mb-5">
                            <div class="flex flex-col w-1/2">
                                <h3 class="font-semibold mb-1">Start Time</h3>
                                <input v-model="form.startTime" type="time" name="" id="" class="border border-gray-300 shadow-md rounded-md px-2 py-1 w-full outline-none">
                            </div>
                            <div class="flex flex-col w-1/2">
                                <h3 class="font-semibold mb-1">End Time</h3>
                                <input v-model="form.endTime" type="time" name="" id="" class="border border-gray-300 shadow-md rounded-md px-2 py-1 w-full outline-none">
                            </div>
                        </div>

                        <div class="w-full mb-5">
                            <h3 class="font-semibold mb-1">Description</h3>
                            <textarea v-model="form.description" name="" id="" class="border border-gray-300 rounded-md px-2 py-1 w-full outline-none shadow-md resize-none h-36"></textarea>
                        </div>
                        
                        <div>
                            <button @click="addTodo" class="bg-lime-400 px-2 py-1 rounded-lg text-white mr-4">Save</button>
                            <button class="bg-red-600 px-2 py-1 rounded-lg text-white" @click="$emit('close-modal')">Close</button>
                        </div>

                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>


<style scoped>

.modal-outer-enter-active, .modal-outer-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from, .modal-outer-leave-to {
    opacity: 0;
}

.modal-inner-enter-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-leave-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
    transform: scale(0.8);
    opacity: 0;
}

.modal-inner-leave-to{
    transform: scale(0.8);
}

</style>