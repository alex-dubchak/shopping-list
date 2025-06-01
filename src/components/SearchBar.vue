<template>
  <div class="px-4 py-2">
    <input v-model="search" @input="$emit('update:search', search)" placeholder="Search" class="w-full border px-3 py-2 rounded" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const search = ref('');
</script>