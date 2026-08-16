<script setup>
import { ref, computed } from "vue";

const description = ref("");
const amount = ref("");
const type = ref("Income");

const transactions = ref([]);
const editIndex = ref(null);

// Add Transaction
function addTransaction() {
  if (!description.value || !amount.value) {
    alert("Please fill all fields");
    return;
  }

  if (editIndex.value !== null) {
    transactions.value[editIndex.value] = {
      description: description.value,
      amount: Number(amount.value),
      type: type.value,
    };

    editIndex.value = null;
  } else {
    transactions.value.push({
      description: description.value,
      amount: Number(amount.value),
      type: type.value,
    });
  }

  description.value = "";
  amount.value = "";
  type.value = "Income";
}

// Delete Transaction
function deleteTransaction(index) {
  transactions.value.splice(index, 1);
}

// Edit Transaction
function editTransaction(index) {
  description.value = transactions.value[index].description;
  amount.value = transactions.value[index].amount;
  type.value = transactions.value[index].type;
  editIndex.value = index;
}

// Summary
const totalIncome = computed(() => {
  return transactions.value
    .filter((item) => item.type === "Income")
    .reduce((sum, item) => sum + item.amount, 0);
});

const totalExpense = computed(() => {
  return transactions.value
    .filter((item) => item.type === "Expense")
    .reduce((sum, item) => sum + item.amount, 0);
});

const balance = computed(() => {
  return totalIncome.value - totalExpense.value;
});
</script>

<template>
  <div class="container">
    <h1>Student Expense Tracker</h1>

    <!-- Input Form -->

    <input v-model="description" placeholder="Please enter description" />

    <input v-model="amount" type="number" placeholder="Amount" />

    <select v-model="type">
      <option>Income</option>
      <option>Expense</option>
    </select>

    <button @click="addTransaction">
      {{ editIndex !== null ? "Save Changes" : " Add Transaction" }}
    </button>

    <!-- Typing Response -->

    <p class="typing">Typing: {{ description }}</p>

    <!-- Summary -->

    <div class="summary">
      <div class="card income">
        <h3>Income</h3>
        <h2>{{ totalIncome.toLocaleString() }} THB</h2>
      </div>

      <div class="card expense">
        <h3>Expense</h3>
        <h2>{{ totalExpense.toLocaleString() }} THB</h2>
      </div>

      <div class="card balance">
        <h3>Balance</h3>
        <h2>{{ balance.toLocaleString() }} THB</h2>
      </div>
    </div>

    <!-- Transaction List -->

    <h2>Transaction List</h2>

    <p v-if="transactions.length === 0">No transactions yet.</p>

    <table v-else>
      <thead>
        <tr>
          <th>Description</th>
          <th>Amount</th>
          <th>Type</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in transactions" :key="index">
          <td>{{ item.description }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.type }}</td>
          <td class="action-buttons">
            <button class="edit-btn" @click="editTransaction(index)">
              ✏️ Edit
            </button>

            <button class="delete-btn" @click="deleteTransaction(index)">
              🗑️ Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@300;400;500&display=swap");

/* ===== BODY ===== */

body {
  font-family: "Playfair Display", serif;
  background-image: url("/pic1.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.3);
  z-index: -1;
}

/* ===== FONT ===== */

h1,
h2,
h3 {
  font-family: "Playfair Display", serif;
}

/* ===== CONTAINER ===== */

.container {
  max-width: 850px;
  margin: 30px auto;
  padding: 25px;
}

/* ===== TITLE ===== */

h1 {
  text-align: center;
  font-size: 3rem;
}

/* ===== FORM ===== */

input,
select,
button {
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

button {
  cursor: pointer;
}

.typing {
  margin-top: 10px;
}

/* ===== SUMMARY ===== */

.summary {
  display: flex;
  gap: 15px;
  margin: 20px 0;
}

.card {
  flex: 1;
  background: rgba(255, 255, 255, 0.85);
  padding: 20px;
  text-align: center;
  border-radius: 25px;
  box-shadow: 0 4px 15px rgba(242, 225, 225, 0.1);
  backdrop-filter: blur(5px);
}

.income {
  border-left: 6px solid rgb(247, 245, 245);
  background: #ffe8f0;
}

.expense {
  border-left: 6px solid rgb(247, 245, 245);
}

.balance {
  border-left: 6px solid rgb(247, 245, 245);
  background-image: url("/balance.jpg");
}

/* ===== TABLE ===== */
table {
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

th,
td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

/* ===== Edit/DELETE BUTTON ===== */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 6px;
}

.edit-btn,
.delete-btn {
  width: 100px;
  padding: 8px 10px;
  font-size: 12px;
  border: none;
  border-radius: 10px;
  color: white;
  margin: 0;
}
.edit-btn {
  background: rgb(129, 128, 128);
}

.delete-btn {
  background: #ff7fa9;
}
</style>
