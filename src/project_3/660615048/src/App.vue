<script setup>
import { ref } from "vue";

const newTask = ref("");
const tasks = ref([]);
const showTasks = ref(true);

function addTask() {
  if (newTask.value.trim() === "") {
    return;
  }

  tasks.value.push(newTask.value);
}

function deleteTask(index) {
  tasks.value.splice(index, 1);
}

function toggleTasks() {
  showTasks.value = !showTasks.value;
}
</script>

<template>
  <div class="container">
    <div class="left-panel">
      <h1>🌸 Study Planner 🌸</h1>

      <input v-model="newTask" placeholder="✨ Add your task..." />

      <p class="typing-text">💭 Typing: {{ newTask }}</p>

      <div class="button-group">
        <button class="add-btn" @click="addTask">➕ Add Task</button>

        <button class="toggle-btn" @click="toggleTasks">👀 Show / Hide</button>
      </div>
    </div>

    <div class="right-panel" v-if="showTasks">
      <h2>🩵 My Tasks</h2>

      <p class="task-count">📚 Total Tasks: {{ tasks.length }}</p>

      <ul>
        <li v-for="(task, index) in tasks" :key="index">
          <span>📝 {{ task }}</span>

          <button class="delete-btn" @click="deleteTask(index)">🗑️</button>
        </li>
      </ul>

      <p v-if="tasks.length === 0" class="empty">🌷 No tasks yet</p>
    </div>
  </div>
</template>
