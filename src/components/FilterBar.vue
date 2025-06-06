<template>
  <div class="flex gap-2 justify-center py-2">
    <button v-for="option in options" :key="option.value" @click="$emit('update:filter', option.value)" :class="['w-full rounded-lg py-2.5 text-sm font-medium leading-5',
      'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
      filter === option.value ? 'bg-gray-900 text-white' : 'bg-gray-200']">
      {{ option.label }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  filter: String
})
const options = [  
  { label: 'To Buy', value: 'missing' },
  { label: 'Bought', value: 'bought' },
  { label: 'All', value: 'all' },
];
</script>