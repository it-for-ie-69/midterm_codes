<script setup lang="ts">
import { ref } from "vue";

// =========================================
// ---------- MOOD TRACKER SECTION ----------
// =========================================

const moods = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😌", label: "Okay" },
  { emoji: "😢", label: "Sad" },
  { emoji: "😡", label: "Angry" },
  { emoji: "😴", label: "Tired" },
];

const selectedMood = ref(null);
const moodNote = ref("");
const moodLog = ref([]);

function saveMood() {
  if (!selectedMood.value) {
    alert("Please pick a mood first! 🌸");
    return;
  }
  if (moodNote.value.trim() === "") {
    alert("Please write a short note about your day! 📝");
    return;
  }

  moodLog.value.unshift({
    emoji: selectedMood.value.emoji,
    label: selectedMood.value.label,
    note: moodNote.value.trim(),
    date: new Date().toLocaleDateString(),
  });

  selectedMood.value = null;
  moodNote.value = "";
}

function removeMoodEntry(index) {
  moodLog.value.splice(index, 1);
}

// =========================================
// ---------- PLANNER / TASK SECTION --------
// =========================================

const todayDate = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const newTask = ref("");
const tasks = ref([
  { text: "Review capstone literature notes", done: false },
  { text: "Water the plants", done: true },
]);

function addTask() {
  if (newTask.value.trim() === "") {
    alert("Please type a task first! ✏️");
    return;
  }
  tasks.value.push({ text: newTask.value.trim(), done: false });
  newTask.value = "";
}

function toggleTask(index) {
  tasks.value[index].done = !tasks.value[index].done;
}

function removeTask(index) {
  tasks.value.splice(index, 1);
}
</script>

<template>
  <div class="page">
    <div class="wrapper">
      <h1>🌷 Daily Mood &amp; Planner</h1>
      <p class="subtitle">a soft little space for your day ✨</p>
      <p class="today-date">📅 {{ todayDate }}</p>

      <!-- ============ CARDS ROW ============ -->
      <div class="cards-row">
        <!-- ============ MOOD SECTION ============ -->
        <div class="card">
          <h2>How are you feeling today? 💭</h2>

          <div class="mood-picker">
            <button
              v-for="mood in moods"
              :key="mood.label"
              class="mood-btn"
              :class="{
                selected: selectedMood && selectedMood.label === mood.label,
              }"
              @click="selectedMood = mood"
            >
              <span class="mood-emoji">{{ mood.emoji }}</span>
              <span class="mood-label">{{ mood.label }}</span>
            </button>
          </div>

          <input
            v-model="moodNote"
            class="text-input"
            placeholder="📝 Write a short note about today..."
          />

          <button class="save-btn" @click="saveMood">💌 Save Mood</button>

          <h3>Mood History</h3>
          <ul v-if="moodLog.length > 0" class="mood-log">
            <li
              v-for="(entry, index) in moodLog"
              :key="index"
              class="mood-log-item"
            >
              <span class="log-emoji">{{ entry.emoji }}</span>
              <div class="log-info">
                <p class="log-title">
                  {{ entry.label }}
                  <span class="log-date">{{ entry.date }}</span>
                </p>
                <p class="log-note">{{ entry.note }}</p>
              </div>
              <button class="remove-btn" @click="removeMoodEntry(index)">
                ✕
              </button>
            </li>
          </ul>
          <p v-else class="empty-message">
            No mood entries yet 🌸 add one above!
          </p>
        </div>

        <!-- ============ PLANNER SECTION ============ -->
        <div class="card">
          <h2>Today's Tasks 🍡</h2>

          <div class="task-row">
            <input
              v-model="newTask"
              class="text-input"
              placeholder="✏️ Add a new task..."
              @keyup.enter="addTask"
            />
            <button class="add-btn" @click="addTask">Add</button>
          </div>

          <ul v-if="tasks.length > 0" class="task-list">
            <li v-for="(task, index) in tasks" :key="index" class="task-item">
              <label class="task-label">
                <input
                  type="checkbox"
                  :checked="task.done"
                  @change="toggleTask(index)"
                />
                <span :class="{ done: task.done }">{{ task.text }}</span>
              </label>
              <button class="remove-btn" @click="removeTask(index)">✕</button>
            </li>
          </ul>
          <p v-else class="empty-message">No tasks yet 🌸 add one above!</p>
        </div>
      </div>
      <!-- end cards-row -->
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.page {
  min-height: 100vh;
  padding: 2em 1em;
  background: linear-gradient(135deg, #fdeef7 0%, #fff0f5 50%, #f4ecff 100%);
  font-family: "Segoe UI", "Helvetica Neue", sans-serif;
}

.wrapper {
  max-width: 480px;
  margin: 0 auto;
}

.today-date {
  text-align: center;
  color: #a37fa8;
  font-size: 0.9em;
  margin-top: -0.5em;
  margin-bottom: 1.5em;
}

.cards-row {
  display: flex;
  flex-direction: column;
}

h1 {
  text-align: center;
  color: #b565a7;
  font-size: 1.8em;
  margin-bottom: 0.1em;
}

.subtitle {
  text-align: center;
  color: #b599c2;
  margin-top: 0;
  margin-bottom: 1.5em;
  font-style: italic;
}

.card {
  background: #ffffffcc;
  border-radius: 22px;
  padding: 1.4em;
  margin-bottom: 1.2em;
  box-shadow: 0 6px 16px rgba(181, 101, 167, 0.12);
  backdrop-filter: blur(4px);
}

.card h2 {
  color: #b565a7;
  margin-top: 0;
  font-size: 1.15em;
}

.card h3 {
  color: #b565a7;
  margin-top: 1.2em;
  font-size: 1em;
}

/* ---- mood picker ---- */
.mood-picker {
  display: flex;
  gap: 0.5em;
  flex-wrap: wrap;
  margin-bottom: 0.8em;
}

.mood-btn {
  flex: 1;
  min-width: 60px;
  padding: 0.7em 0.3em;
  border: 2px solid #ffe0ef;
  border-radius: 16px;
  background: #fffafc;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition:
    transform 0.15s,
    border-color 0.15s;
}

.mood-btn .mood-emoji {
  font-size: 1.5em;
}

.mood-btn .mood-label {
  font-size: 0.75em;
  margin-top: 0.3em;
  color: #a37fa8;
}

.mood-btn.selected {
  border-color: #f78fb3;
  background: #ffeef3;
  transform: translateY(-2px);
}

/* ---- inputs & buttons ---- */
.text-input {
  width: 100%;
  padding: 0.7em 1em;
  margin-bottom: 0.7em;
  border: 2px solid #ffd6e5;
  border-radius: 14px;
  background: #fffafc;
  font-size: 0.95em;
  outline: none;
  transition: border-color 0.2s;
}

.text-input:focus {
  border-color: #f78fb3;
}

.save-btn,
.add-btn {
  padding: 0.7em 1em;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #f78fb3, #d9a9f0);
  color: white;
  font-weight: bold;
  cursor: pointer;
  font-size: 0.9em;
  box-shadow: 0 4px 10px rgba(217, 169, 240, 0.4);
  transition: transform 0.15s;
}

.save-btn {
  width: 100%;
}

.save-btn:hover,
.add-btn:hover {
  transform: translateY(-2px);
}

.task-row {
  display: flex;
  gap: 0.5em;
}

.task-row .text-input {
  flex: 1;
  margin-bottom: 0;
}

/* ---- mood history ---- */
.mood-log {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mood-log-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6em;
  padding: 0.6em;
  border-radius: 14px;
  background: #fff0f5;
  margin-bottom: 0.5em;
}

.log-emoji {
  font-size: 1.5em;
}

.log-info {
  flex: 1;
}

.log-title {
  margin: 0;
  font-weight: 600;
  color: #7a4f72;
}

.log-date {
  font-size: 0.75em;
  color: #c48fa3;
  font-weight: normal;
  margin-left: 0.4em;
}

.log-note {
  margin: 0.2em 0 0;
  color: #8a6b83;
  font-size: 0.9em;
}

/* ---- task list ---- */
.task-list {
  list-style: none;
  padding: 0;
  margin-top: 0.8em;
}

.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6em 0.7em;
  border-radius: 14px;
  background: #f4ecff;
  margin-bottom: 0.5em;
}

.task-label {
  display: flex;
  align-items: center;
  gap: 0.6em;
  color: #6d5a7a;
}

.done {
  text-decoration: line-through;
  color: #c2a9cc;
}

/* ---- shared ---- */
.remove-btn {
  border: none;
  background: #f3d6de;
  color: #a13b5c;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 0.75em;
  flex-shrink: 0;
}

.remove-btn:hover {
  background: #f0aec4;
}

.empty-message {
  text-align: center;
  color: #c48fa3;
  font-style: italic;
}
</style>
