<template>
  <div class="px-4 py-2">
    <h2 class="font-bold text-lg mb-2">{{ title }} <span class="text-gray-500">({{ boughtCount }}/{{ items.length }})</span></h2>
    <ShoppingItem 
      v-for="item in items" 
      :key="item.name" 
      :item="item" 
      @toggle="$emit('toggle', item)"
      @edit="$emit('edit', item)" 
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import ShoppingItem from './ShoppingItem.vue';
const props = defineProps({
  title: String,
  items: Array
});
const emit = defineEmits(['toggle', 'edit']);
const boughtCount = computed(() => props.items.filter(i => i.bought).length);
</script>