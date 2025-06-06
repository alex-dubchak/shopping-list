<template>
  <form @submit.prevent="$emit('submit')" class="space-y-4">
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
    <slot name="buttons"></slot>
  </form>
</template>

<script setup>
import { ref, defineEmits, defineExpose } from 'vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption, TransitionRoot, ComboboxLabel } from '@headlessui/vue'
import { useShoppingListStore } from '../store/shoppingListStore';

const store = useShoppingListStore();
const category = ref('');
const itemName = ref('');
const note = ref('');

defineEmits(['submit']);

defineExpose({
  category,
  itemName,
  note,
  setValues(values) {
    category.value = values.category ?? '';
    itemName.value = values.name ?? '';
    note.value = values.note ?? '';
  }
});
</script>
