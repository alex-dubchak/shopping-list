<template>
  <div class="min-h-screen flex justify-center bg-gray-100">
    <div class="flex flex-col gap-2 w-full max-w-xl p-4 bg-white rounded-2xl shadow">
    <h2 class="text-xl font-semibold mb-4">Add New Item</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <Combobox v-model="category" >
          <ComboboxLabel class="block font-medium">Category</ComboboxLabel>
          <div class="relative mt-1">
            <div
              class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">

              <ComboboxInput class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                @change="store.categoryFilter = $event.target.value" @click="" :display-value="(cat) => cat?.name ?? ''"/>
              
                <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </ComboboxButton>
            </div>
            <TransitionRoot leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0"
              @after-leave="query = ''">
              <ComboboxOptions
                class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                <ComboboxOption v-if="store.queryCategory" :value="store.queryCategory" v-slot="{ selected, active }">
                  <li class="relative cursor-default select-none py-2 pl-10 pr-4" :class="{
                    'bg-teal-600 text-white': active,
                    'text-gray-900': !active,
                  }">
                    <span class="block truncate" :class="{ 'font-medium': selected, 'font-normal': !selected }">
                      Create {{ store.queryCategory.name }}
                    </span>
                    <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3"
                      :class="{ 'text-white': active, 'text-teal-600': !active }">
                      <CheckIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </li>
                </ComboboxOption>
               
                <ComboboxOption v-for="cat in store.filteredCategories" :key="cat.id" :value="cat"
                  v-slot="{ selected, active }">
                  <li class="relative cursor-default select-none py-2 pl-10 pr-4" :class="{
                    'bg-teal-600 text-white': active,
                    'text-gray-900': !active,
                  }">
                    <span class="block truncate" :class="{ 'font-medium': selected, 'font-normal': !selected }">
                      {{ cat.name }}
                    </span>
                    <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3"
                      :class="{ 'text-white': active, 'text-teal-600': !active }">
                      <CheckIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </li>
                </ComboboxOption>
              </ComboboxOptions>
            </TransitionRoot>
          </div>
        </Combobox>

      </div>
      <div>
        <label class="block font-medium">Item Name</label>
        <input v-model="itemName" class="w-full border rounded p-2" required />
      </div>
      <div>
        <label class="block font-medium">Note (optional)</label>
        <textarea v-model="note" class="w-full border rounded p-2" rows="2" placeholder="Add any additional details"></textarea>
      </div>
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      <button type="button" @click="router.back()" class="bg-gray-300 text-black px-4 py-2 rounded">Cancel</button>
    </form>
   </div>
  </div>
</template>

<script setup>
import { ref, onMounted,} from 'vue';
import { useRouter , useRoute} from 'vue-router';
import { useShoppingListStore } from '../store/shoppingListStore';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
  ComboboxLabel,
} from '@headlessui/vue'

const store = useShoppingListStore();
const router = useRouter();
const route = useRoute();

const category = ref('');
const itemName = ref('');
const note = ref('');

const handleSubmit = async () => {
  const item = { 
    name: itemName.value, 
    bought: false,
    note: note.value || null
  };
  console.log('Adding item:', item, 'to category:', category.value);
  await store.addItem(category.value, item);
  router.back();
};


onMounted(async () => {
  const categoryId = +route.params.id;
  category.value = await store.getCategory(categoryId)
  console.log('Selected category:', route.params.id, categoryId, category.value);
  await store.fetchCategories();
  store.categoryFilter = '';
});
</script>

<style scoped>
input {
  outline: none;
  border: 1px solid #ccc;
}
</style>