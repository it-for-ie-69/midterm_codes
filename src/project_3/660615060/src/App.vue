<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import "./style.css";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

// 1. State
const newTodoText = ref("");
const currentFilter = ref<"all" | "active" | "completed">("all");
const lastAddedText = ref("");
const todoList = ref<TodoItem[]>([]);

// 2. LocalStorage Persistence
onMounted(() => {
  const saved = localStorage.getItem("simple_todo_app");
  if (saved) todoList.value = JSON.parse(saved);
});

watch(
  todoList,
  (newList) => {
    localStorage.setItem("simple_todo_app", JSON.stringify(newList));
  },
  { deep: true },
);

// 3. Methods
function addTodo() {
  if (!newTodoText.value.trim()) return;

  lastAddedText.value = newTodoText.value.trim();
  todoList.value.push({
    id: Date.now(),
    text: newTodoText.value.trim(),
    completed: false,
  });

  newTodoText.value = "";
}

function deleteTodo(id: number) {
  todoList.value = todoList.value.filter((item) => item.id !== id);
}

// 4. Computed: Category Status Filter (Replaces Text Search)
const filteredTodos = computed(() => {
  if (currentFilter.value === "active") {
    return todoList.value.filter((item) => !item.completed);
  }
  if (currentFilter.value === "completed") {
    return todoList.value.filter((item) => item.completed);
  }
  return todoList.value;
});
</script>

<template>
  <div class="container">
    <h1>What To-Do Today?</h1>

    <!-- Popup Banner -->
    <h2 v-if="lastAddedText" class="popup-banner">
      Latest Action: {{ lastAddedText }}
    </h2>

    <!-- Add Task Card -->
    <div class="card">
      <div class="input-row">
        <input
          v-model="newTodoText"
          @keyup.enter="addTodo"
          placeholder="What do you need to do?"
          class="input-field"
        />
        <button @click="addTodo" class="btn btn-add">Add Task</button>
      </div>

      <!-- Response to Typing: Live Preview -->
      <p v-if="newTodoText" class="typing-preview">
        Typing: <span>{{ newTodoText }}</span>
      </p>
    </div>

    <!-- Filter Buttons -->
    <div class="filter-bar">
      <button
        :class="{ active: currentFilter === 'all' }"
        @click="currentFilter = 'all'"
        class="filter-btn"
      >
        All ({{ todoList.length }})
      </button>
      <button
        :class="{ active: currentFilter === 'active' }"
        @click="currentFilter = 'active'"
        class="filter-btn"
      >
        Active
      </button>
      <button
        :class="{ active: currentFilter === 'completed' }"
        @click="currentFilter = 'completed'"
        class="filter-btn"
      >
        Completed
      </button>
    </div>

    <!-- Task List Card -->
    <div class="card">
      <p v-if="todoList.length === 0" class="empty-msg">No tasks added yet.</p>
      <p v-else-if="filteredTodos.length === 0" class="empty-msg">
        No tasks in this category.
      </p>

      <ul v-else class="todo-list">
        <li v-for="item in filteredTodos" :key="item.id" class="todo-item">
          <!-- Checkbox Interaction -->
          <input type="checkbox" v-model="item.completed" class="checkbox" />

          <!-- Task Text -->
          <span :class="{ completed: item.completed }" class="task-text">
            {{ item.text }}
          </span>

          <!-- Delete Interaction -->
          <button @click="deleteTodo(item.id)" class="btn btn-delete">
            Delete
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
