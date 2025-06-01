<template>
  <div class="flex gap-2 justify-center py-2">
    <button v-for="option in options" :key="option.value" @click="$emit('update:filter', option.value)"
      :class="['px-3 py-1 rounded-full', filter === option.value ? 'bg-gray-900 text-white' : 'bg-gray-200']">
      {{ option.label }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  filter: String
})
const options = [
  { label: 'All', value: 'all' },
  { label: 'Only Missing', value: 'missing' },
  { label: 'Only Bought', value: 'bought' }
];
</script>