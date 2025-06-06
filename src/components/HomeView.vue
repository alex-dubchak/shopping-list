<template>
  <div class="min-h-screen flex justify-center bg-gray-100">
    <div class="flex flex-col gap-2 w-full max-w-xl p-4 bg-white rounded-2xl shadow">
      <h1 class="text-2xl font-bold p-4">My Shopping List</h1>
      <FilterBar :filter="store.filter" @update:filter="store.filter = $event" />
      <SearchBar @update:search="store.search = $event" />

      <div v-for="section in store.filteredList" :key="section.id">
        <ListSection 
          :id="section.id"
          :title="section.name" 
          :items="section.items"
          @toggle="store.toggleItem($event)"
          @edit="editItem" 
          @add="addItem"
          @uncheckAll="store.unsetCategory($event)"
        />
      </div>

      <FloatingButton @click="addItem" />
    </div>
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
});

function addItem(categoryId) {
  router.push(categoryId != null ? `/add-item/category/${categoryId}` : `/add-item`);
}

function editItem(item) {
  router.push(`/edit-item/${item.id}`);
}
</script>

<style scoped>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
}
</style>