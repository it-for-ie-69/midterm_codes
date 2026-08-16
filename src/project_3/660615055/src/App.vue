<script setup lang="ts">
import { ref } from "vue";

const newTodo = ref("");
const todos = ref<string[]>([]);

function addTodo() {
  if (newTodo.value !== "") {
    todos.value.push(newTodo.value);
    newTodo.value = "";
  }
}
</script>

<template>
  <div class="app">
    <h1>Todo List</h1>

    <input v-model="newTodo" placeholder="Type a task" />

    <p v-if="newTodo">You are typing: {{ newTodo }}</p>

    <p v-else>Please type a task.</p>

    <button @click="addTodo">Add</button>

    <p v-if="todos.length === 0">No tasks yet.</p>

    <ul v-else>
      <li v-for="(todo, index) in todos" :key="index">
        {{ index + 1 }}. {{ todo }}
      </li>
    </ul>
  </div>
</template>
