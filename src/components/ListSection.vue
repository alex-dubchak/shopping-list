<template>
  <div class="px-4 py-2">
    <div class="flex items-center justify-between mb-2">
      <h2 class="font-bold text-lg">
        {{ title }} 
        <span class="text-gray-500">({{ boughtCount }}/{{ items.length }})</span>
      </h2>
      <div class="flex gap-2">
        <button @click="$emit('add', props.id)" class="p-1 hover:bg-gray-100 rounded">
          <PlusCircleIcon class="h-4 w-4" />
        </button>
        <button @click="$emit('uncheckAll', props.id)" class="p-1 hover:bg-gray-100 rounded">
          <ArrowPathIcon class="h-4 w-4" />
        </button>
      </div>
    </div>
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
import { PlusCircleIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue';
import ShoppingItem from './ShoppingItem.vue';
const props = defineProps({
  title: String,
  items: Array,
  id: Number
});
const emit = defineEmits(['toggle', 'edit', 'add', 'uncheckAll']);
const boughtCount = computed(() => props.items.filter(i => i.bought).length);
</script>