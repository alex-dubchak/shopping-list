import { defineStore } from 'pinia';
import shoppingListService from '../services/shoppingListService';

export const useShoppingListStore = defineStore('shoppingList', {
  state: () => ({
    itemsByCategory: [],
    categories: [],
    filter: 'missing',
    search: '',
    categoryFilter: ''
  }),

  getters: {
    filteredList(state) {
      const result = [];
      var input = state.itemsByCategory;
      for (const category of input) {
        const { items } = category;
        let filtered = items;
        if (state.filter === 'missing') {
          filtered = items.filter(i => !i.bought);
        } else if (state.filter === 'bought') {
          filtered = items.filter(i => i.bought);
        }
        if (state.search) {
          filtered = filtered.filter(i => i.name.toLowerCase().includes(state.search.toLowerCase()));
        }
        if (filtered.length > 0) result.push({
         ...category,
         items: filtered,
        });
      }
      return result;
    },
    filteredCategories(state) {
      var input = state.categories.filter(c => {
        return c.name.toLowerCase().includes(state.categoryFilter.toLowerCase());
      });
      console.log('filteredCategories', input);
      return input;
    },
    queryCategory(state) {
      console.log('queryCategory', state.categoryFilter);
      return (state.categoryFilter === '' || this.filteredCategories.length) ? null : {id: null, name: state.categoryFilter}
    }
  },

  actions: {
    async fetchList() {
      this.itemsByCategory = await shoppingListService.fetchList();
    },
    async fetchCategories() {
      this.categories = await shoppingListService.fetchCategories();
    },
    toggleItem(category, item) {
      item.bought = !item.bought;
      shoppingListService.updateItem(category, item);
    },
    async addItem(category, item) {
      shoppingListService.addItem(category, item);
      this.itemsByCategory = await shoppingListService.fetchList();
    },
    async getItem(id) {
      return await shoppingListService.getItem(id);
    },
    async getCategory(id) {
      return await shoppingListService.getCategory(id);
    },
    async updateItem(category, item) {
      await shoppingListService.updateItem(category, item);
      this.itemsByCategory = await shoppingListService.fetchList();
    },
  }
});