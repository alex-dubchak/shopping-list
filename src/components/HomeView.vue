<template>
  <div>
    <h1 class="text-2xl font-bold p-4">My Shopping List</h1>
    <FilterBar :filter="store.filter" @update:filter="store.filter = $event" />
    <SearchBar @update:search="store.search = $event" />

    <div v-for="(items, category) in store.filteredList" :key="category">
      <ListSection :title="category" :items="items" @toggle="store.toggleItem(category, $event)" />
    </div>

    <FloatingButton @click="addItem" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useShoppingListStore } from '../store/shoppingListStore';
import { useRouter } from 'vue-router';

import FilterBar from '../components/FilterBar.vue';
import SearchBar from '../components/SearchBar.vue';
import ListSection from '../components/ListSection.vue';
import FloatingButton from '../components/FloatingButton.vue';

const store = useShoppingListStore();
const router = useRouter();

onMounted(async () => {
  await store.fetchList();
  console.table(store.filteredList);
});

function addItem() {
  // For now, show alert or navigate to an 'Add Item' route if needed
  // alert('Add item modal goes here.');
  router.push('/add-item'); // Optional if you plan to make an AddItemView
}
</script>

<style scoped>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
}
</style>