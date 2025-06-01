<template>
  <div class="p-4">
    <h2 class="text-xl font-semibold mb-4">Add New Item</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block font-medium">Category</label>
        <input v-model="category" class="w-full border rounded p-2" required />
      </div>
      <div>
        <label class="block font-medium">Item Name</label>
        <input v-model="itemName" class="w-full border rounded p-2" required />
      </div>
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useShoppingListStore } from '../store/shoppingListStore';

const store = useShoppingListStore();
const router = useRouter();

const category = ref('');
const itemName = ref('');

const handleSubmit = async () => {
  const item = { name: itemName.value, bought: false };
  await store.addItem(category.value, item);
  router.push('/');
};
</script>

<style scoped>
input {
  outline: none;
  border: 1px solid #ccc;
}
</style>