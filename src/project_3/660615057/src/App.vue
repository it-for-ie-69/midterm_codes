<script setup lang="ts">
import { ref } from "vue";

const data = [
  { id: 1, title: "Weighing scale", type: "tool", done: false },
  { id: 2, title: "Mixing bowl", type: "tool", done: false },
  { id: 3, title: "Oven", type: "tool", done: false },
  { id: 4, title: "Flour", type: "ingredient", done: true },
  { id: 5, title: "Sugar", type: "ingredient", done: false },
  { id: 6, title: "Butter", type: "ingredient", done: false },
];

const steps = ref(data);
const stepText = ref("");
const stepType = ref("tool"); // for the "Add" form dropdown
const searchText = ref("");
const activeType = ref("all"); // "all" | "tool" | "ingredient"

// เพิ่ม a new item to the list
function handleAddClick() {
  if (stepText.value === "") return;
  const length = steps.value.length;
  const lastId = steps.value[length - 1].id;
  const newStep = {
    id: lastId + 1,
    title: stepText.value,
    type: stepType.value,
    done: false,
  };
  steps.value.push(newStep);
  stepText.value = "";
}

function handleToggleClick(id: number) {
  const step = steps.value.find((s) => s.id === id);
  if (step) step.done = !step.done;
}

// remove
function handleRemoveClick(id: number) {
  steps.value = steps.value.filter((s) => s.id !== id);
}

// change which type is shown (all / tool / ingredient)
function setActiveType(type: string) {
  activeType.value = type;
}

// combines the search box + the tool/ingredient filter
function filteredSteps() {
  let result = steps.value;

  if (activeType.value !== "all") {
    result = result.filter((s) => s.type === activeType.value);
  }

  if (searchText.value !== "") {
    result = result.filter((s) =>
      s.title.toLowerCase().includes(searchText.value.toLowerCase()),
    );
  }

  return result;
}
</script>

<template>
  <div class="eyes">
    <div class="eye">
      <div class="pupil"></div>
    </div>

    <div class="eye">
      <div class="pupil"></div>
    </div>
  </div>

  <h1>🎂 Cake Prep Checklist 🎂</h1>

  <!-- add a new items -->
  <input v-model="stepText" placeholder="Add a tool or ingredient" />
  <select v-model="stepType">
    <option value="tool">Tool</option>
    <option value="ingredient">Ingredient</option>
  </select>
  <button @click="handleAddClick">Add</button>

  <br /><br />

  <!-- typing here filters the list live -->
  <input v-model="searchText" placeholder="Search..." />

  <br /><br />

  <!-- click a button to filter by type -->
  <button @click="setActiveType('all')">All</button>
  <button @click="setActiveType('tool')">Tools</button>
  <button @click="setActiveType('ingredient')">Ingredients</button>

  <ul>
    <li v-for="item in filteredSteps()" :key="item.id">
      <!-- click the text itself to toggle done, it fades when done -->
      <span
        @click="handleToggleClick(item.id)"
        :class="{ done: item.done }"
        class="step-text"
      >
        ({{ item.type }}) {{ item.title }}
      </span>

      <button @click="handleRemoveClick(item.id)">Remove</button>
    </li>
  </ul>

  <p v-if="filteredSteps().length === 0">
    Nothing find your menu to start !!!.
  </p>
</template>
