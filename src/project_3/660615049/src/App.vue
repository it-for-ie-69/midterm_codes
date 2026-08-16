<script setup lang="ts">
import { ref, computed } from "vue";

const tasks = ref([
  { id: 1, text: "Read chapter 3 for Chemistry", done: false },
  { id: 2, text: "Submit Math homework", done: false },
  { id: 3, text: "Rehearse English presentation", done: true },
]);

const newTask = ref("");
const searchQuery = ref("");
const errorMsg = ref("");
let nextId = 3;

const filteredTasks = computed(() => {
  return tasks.value.filter((t) =>
    t.text.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

function addTask() {
  if (!newTask.value.trim()) {
    errorMsg.value = "Please type a task first";
    return;
  }
  errorMsg.value = "";
  tasks.value.push({ id: nextId++, text: newTask.value.trim(), done: false });
  newTask.value = "";
}

function removeTask(id: number) {
  tasks.value = tasks.value.filter((t) => t.id !== id);
}
</script>

<template>
  <div>
    <h1>Study Planner</h1>
    <input type="text" v-model="searchQuery" placeholder="Search tasks..." />
    <input type="text" v-model="newTask" placeholder="Add a new task..." />
    <button @click="addTask">Add</button>

    <p v-if="errorMsg" style="color: red">{{ errorMsg }}</p>

    <ul>
      <li
        v-for="task in filteredTasks"
        :key="task.id"
        :class="{ done: task.done }"
      >
        <input
          type="checkbox"
          :checked="task.done"
          @click="task.done = !task.done"
        />
        {{ task.text }}
        <button @click="removeTask(task.id)">✕</button>
      </li>
    </ul>

    <p
      v-if="filteredTasks.length === 0"
      style="text-align: center; color: gray"
    >
      No tasks found.
    </p>
  </div>
</template>

<style scoped>
.done {
  text-decoration: line-through;
  color: gray;
}
div {
  max-width: 480px;
  margin: 40px auto;
  font-family: sans-serif;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
}

input[type="text"] {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

button {
  padding: 8px 12px;
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.done {
  text-decoration: line-through;
  color: gray;
}
</style>
