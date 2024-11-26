import { reactive } from "vue";

export const todoState = reactive({
    todos: [],
    selectedTodo: null,

    addTodo(todo) {
        this.todos.push(todo); // Yeni todo'yu ekle
    },

    editTodo(todo){
        this.selectedTodo = todo; // Seçili todo'yu güncelle
    },

    deleteTodo(id){
        this.todos = this.todos.filter(todo => todo.id !== id); // id'ye göre todo'yu sil
    }
})

export default todoState;