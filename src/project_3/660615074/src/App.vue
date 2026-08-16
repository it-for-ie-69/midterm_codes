<script setup>
import { ref, computed } from "vue";

// 1. Reactive State (v-model)
const newTask = ref("");
const category = ref("Study");
const searchQuery = ref("");
const filterStatus = ref("all");

// Initial Mock Data
const tasks = ref([
  {
    id: 1,
    text: "Review Industrial Engineering notes",
    category: "Study",
    done: false,
  },
  {
    id: 2,
    text: "Submit Vue.js SPA Assignment",
    category: "Study",
    done: true,
  },
  { id: 3, text: "Buy iced matcha coffee", category: "Personal", done: false },
]);

// 2. Methods / Event Handlers (@click, @submit)
const addTask = () => {
  if (!newTask.value.trim()) return;
  tasks.value.push({
    id: Date.now(),
    text: newTask.value.trim(),
    category: category.value,
    done: false,
  });
  newTask.value = "";
};

const toggleTask = (id) => {
  const task = tasks.value.find((t) => t.id === id);
  if (task) task.done = !task.done;
};

const deleteTask = (id) => {
  tasks.value = tasks.value.filter((t) => t.id !== id);
};

// 3. Computed Properties (Live Filtering as user types)
const filteredTasks = computed(() => {
  return tasks.value.filter((task) => {
    const matchesSearch = task.text
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    if (filterStatus.value === "active") return matchesSearch && !task.done;
    if (filterStatus.value === "completed") return matchesSearch && task.done;
    return matchesSearch;
  });
});

const completedCount = computed(() => tasks.value.filter((t) => t.done).length);
</script>

<template>
  <div class="app-container">
    <header>
      <h1>📝 Task & Study Tracker</h1>
      <p>Simple Vue 3 Single Page Application</p>
    </header>

    <!-- Section 1: Add New Task Form -->
    <section class="card">
      <h2>Add New Task</h2>
      <form @submit.prevent="addTask" class="input-form">
        <input
          v-model="newTask"
          type="text"
          placeholder="What needs to be done?"
          maxlength="60"
        />
        <select v-model="category">
          <option value="Study">Study</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
        </select>
        <button type="submit" :disabled="!newTask.trim()">Add Task</button>
      </form>
      <small class="char-count" v-if="newTask"
        >Character length: {{ newTask.length }}/60</small
      >
    </section>

    <!-- Section 2: Search & Filter (Live Typing Interaction) -->
    <section class="card">
      <div class="filter-bar">
        <div class="search-box">
          <label>🔍 Live Search: </label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Type to filter tasks in real-time..."
          />
        </div>

        <div class="status-filters">
          <button
            :class="{ active: filterStatus === 'all' }"
            @click="filterStatus = 'all'"
          >
            All
          </button>
          <button
            :class="{ active: filterStatus === 'active' }"
            @click="filterStatus = 'active'"
          >
            Active
          </button>
          <button
            :class="{ active: filterStatus === 'completed' }"
            @click="filterStatus = 'completed'"
          >
            Completed
          </button>
        </div>
      </div>
    </section>

    <!-- Section 3: Task List Display -->
    <section class="card">
      <div class="stats">
        <span>Total: {{ tasks.length }}</span> |
        <span>Completed: {{ completedCount }}</span>
      </div>

      <ul v-if="filteredTasks.length > 0" class="task-list">
        <li
          v-for="item in filteredTasks"
          :key="item.id"
          :class="{ completed: item.done }"
        >
          <div class="task-info">
            <input
              type="checkbox"
              :checked="item.done"
              @change="toggleTask(item.id)"
            />
            <span class="badge">{{ item.category }}</span>
            <span class="task-text">{{ item.text }}</span>
          </div>
          <button class="btn-delete" @click="deleteTask(item.id)">
            Delete
          </button>
        </li>
      </ul>

      <p v-else class="empty-msg">No tasks found matching your criteria.</p>
    </section>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 650px;
  margin: 30px auto;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  padding: 0 20px;
  color: #2c3e50;
}

header {
  text-align: center;
  margin-bottom: 24px;
}

.card {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.input-form {
  display: flex;
  gap: 10px;
}

input[type="text"],
select {
  padding: 10px 14px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  font-size: 14px;
}

.input-form input[type="text"] {
  flex: 1;
}

button {
  padding: 10px 16px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: opacity 0.2s;
}

button:disabled {
  background-color: #a8d8c0;
  cursor: not-allowed;
}

.char-count {
  display: block;
  margin-top: 6px;
  color: #888;
}

.filter-bar {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.search-box input {
  width: 100%;
  margin-top: 6px;
  box-sizing: border-box;
}

.status-filters {
  display: flex;
  gap: 8px;
}

.status-filters button {
  background-color: #f0f2f5;
  color: #475569;
}

.status-filters button.active {
  background-color: #35495e;
  color: white;
}

.stats {
  font-weight: 600;
  margin-bottom: 15px;
  color: #64748b;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #f1f5f9;
}

.task-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.badge {
  background: #e2e8f0;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.completed .task-text {
  text-decoration: line-through;
  color: #94a3b8;
}

.btn-delete {
  background-color: #ef4444;
  padding: 6px 12px;
  font-size: 12px;
}
</style>
