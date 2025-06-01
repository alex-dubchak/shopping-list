import { defineStore } from 'pinia';
import shoppingListService from '../services/shoppingListService';

export const useShoppingListStore = defineStore('shoppingList', {
  state: () => ({
    itemsByCategory: {},
    filter: 'all',
    search: ''
  }),

  getters: {
    filteredList(state) {
      const result = {};
      for (const [category, items] of Object.entries(state.itemsByCategory)) {
        let filtered = items;
        if (state.filter === 'missing') {
          filtered = items.filter(i => !i.bought);
        } else if (state.filter === 'bought') {
          filtered = items.filter(i => i.bought);
        }
        if (state.search) {
          filtered = filtered.filter(i => i.name.toLowerCase().includes(state.search.toLowerCase()));
        }
        if (filtered.length > 0) result[category] = filtered;
      }
      return result;
    }
  },

  actions: {
    async fetchList() {
      this.itemsByCategory = await shoppingListService.fetchList();
    },
    toggleItem(category, item) {
      item.bought = !item.bought;
      shoppingListService.updateItem(category, item);
    },
    addItem(category, item) {
      if (!this.itemsByCategory[category]) {
        this.itemsByCategory[category] = [];
      }
      this.itemsByCategory[category].push(item);
      shoppingListService.addItem(category, item);
    }
  }
});