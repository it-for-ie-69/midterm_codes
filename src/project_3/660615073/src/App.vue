<script setup lang="ts">
import { ref } from "vue";

// 1. Reactive States
const searchQuery = ref("");
const newSongTitle = ref("");
const newArtist = ref("");

const songs = ref([
  { id: 1, title: "ฟ้า", artist: "Tattoo Colour" },
  { id: 2, title: "ขาหมู", artist: "Tattoo Colour" },
  { id: 3, title: "Cinderella", artist: "Tattoo Colour" },
]);

// 2. Event Handlers
function addSong() {
  if (newSongTitle.value.trim() === "") return;

  songs.value.push({
    id: Date.now(),
    title: newSongTitle.value,
    artist: newArtist.value || "ไม่ระบุศิลปิน",
  });

  newSongTitle.value = "";
  newArtist.value = "";
}

function deleteSong(id: number) {
  songs.value = songs.value.filter((song) => song.id !== id);
}
</script>

<template>
  <div class="container">
    <h1>🎵 Song Wishlist App</h1>

    <!-- ค้นหาเพลง -->
    <div class="card">
      <h3>🔍 ค้นหาเพลงใน List</h3>
      <input
        v-model="searchQuery"
        placeholder="พิมพ์ชื่อเพลงหรือศิลปินเพื่อค้นหา..."
        class="input-box"
      />
    </div>

    <!-- เพิ่มเพลง -->
    <div class="card">
      <h3>➕ เพิ่มเพลงที่อยากฟัง</h3>
      <input
        v-model="newSongTitle"
        placeholder="ชื่อเพลง *"
        class="input-box"
      />
      <input
        v-model="newArtist"
        placeholder="ชื่อศิลปิน"
        class="input-box"
        @keyup.enter="addSong"
      />
      <button @click="addSong" class="btn-add">เพิ่มลง Wishlist</button>
    </div>

    <!-- รายการเพลง -->
    <div class="card">
      <h3>📋 รายการเพลงทั้งหมด</h3>

      <div v-if="songs.length === 0" class="empty">
        ไม่มีเพลงในรายการ กรุณาเพิ่มเพลงใหม่
      </div>

      <ul v-else class="song-list">
        <template v-for="song in songs" :key="song.id">
          <li
            v-if="
              song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              song.artist.toLowerCase().includes(searchQuery.toLowerCase())
            "
          >
            <span
              ><strong>{{ song.title }}</strong> - {{ song.artist }}</span
            >
            <button @click="deleteSong(song.id)" class="btn-delete">
              ❌ ลบ
            </button>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 500px;
  margin: 20px auto;
  font-family: sans-serif;
  padding: 10px;
}
.card {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  color: #333;
}
.input-box {
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
  box-sizing: border-box;
}
.btn-add {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  width: 100%;
}
.btn-delete {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 4px;
}
.song-list {
  list-style: none;
  padding: 0;
}
.song-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}
.empty {
  color: #888;
  text-align: center;
}
</style>
