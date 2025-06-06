<template>
  <div class="flex items-center gap-2 py-1">
    <input type="checkbox" :checked="item.bought" @change="$emit('toggle')" class="accent-green-600" />
    <span :class="{ 'line-through text-gray-400': item.bought }">{{ item.name }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  item: Object
});
</script>