<script setup>
import { ref } from "vue";

const newDrama = ref("");
const dramas = ref([]);

function addDrama() {
  if (newDrama.value.trim() !== "") {
    dramas.value.push(newDrama.value);
    newDrama.value = "";
  }
}

function removeDrama(index) {
  dramas.value.splice(index, 1);
}
</script>

<template>
  <div class="page">
    <div class="card">
      <p class="small-title">DRAMA NOTES</p>
      <h1>My Drama Watchlist</h1>
      <p class="subtitle">What should I watch next?</p>

      <div class="input-row">
        <input
          v-model="newDrama"
          type="text"
          placeholder="Type a drama title"
        />

        <button class="add-btn" @click="addDrama">
          <span>+</span>
          Add
        </button>
      </div>

      <div class="typing-box">Currently typing: {{ newDrama }}</div>

      <div class="watchlist-header">
        <h2>Watchlist</h2>
      </div>

      <p v-if="dramas.length === 0" class="empty-message">
        Nothing here yet. Add your first drama!
      </p>

      <div v-for="(drama, index) in dramas" :key="index" class="drama-item">
        <span>{{ drama }}</span>

        <button class="delete-btn" @click="removeDrama(index)">Delete</button>
      </div>
    </div>
  </div>
</template>
