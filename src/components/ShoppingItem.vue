<template>
  <div class="flex items-center gap-2 py-1">
    <input type="checkbox" :checked="item.bought" @change="$emit('toggle')" class="accent-green-600" />
    <span :class="{ 'line-through text-gray-400': item.bought }">
      {{ item.name }}
      <span v-if="item.note" class="text-sm text-gray-500 ml-2">{{ item.note }}</span>
    </span>
    <div class="ml-auto flex items-center gap-2">
      <button @click="$emit('edit', item)" class="p-1 text-gray-500 hover:text-blue-600">
        <PencilIcon class="h-4 w-4" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { PencilIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  item: Object
});

defineEmits(['toggle', 'edit']);
</script>