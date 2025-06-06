export default {

  categories: localStorage.getItem('categories')
    ? JSON.parse(localStorage.getItem('categories'))
    : [],

  items: localStorage.getItem('items')
    ? JSON.parse(localStorage.getItem('items'))
    : [],

  async fetchCategories() {
    return this.categories;
  },

  async fetchList() {
    const list = [];
    for (const { id, name } of this.categories) {
      const categoryItems = this.items.filter(item => item.categoryId === id);
      list.push({
        name,
        id,
        items: categoryItems,
      })
    }
    return list;
  },

  async updateItem(category, item) {
    // TODO: Update item in Google Sheets
    console.log(`Updating item in category '${category}':`, item);
  },
  async addCategory(category) {
    if (category.id == null) {
      this.categories.push(category);
      category.id = this.categories.length - 1;
      localStorage.setItem('categories', JSON.stringify(this.categories));
    }
  },
  async addItem(category, item) {
    await this.addCategory(category);

    this.items.push({
      id: this.items.length,
      ...item,
      categoryId: category.id,
      bought: false
    });
    localStorage.setItem('items', JSON.stringify(this.items));
  },
  async updateItem(category, item) {
    const index = this.items.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.items[index] = { ...this.items[index], ...item };
      await this.addCategory(category);
      this.items[index].categoryId = category.id;
      localStorage.setItem('items', JSON.stringify(this.items));
    }
  },
  async getItem(id) {
    const foundItem = this.items.find(i => i.id === id);
    return foundItem;
  },
  async getCategory(id) {
    const foundItem = this.categories.find(c => c.id === id);
    return foundItem;
  },
  async deleteItem(category, item) {
    this.items = this.items.filter(i => i.id !== item.id);
    localStorage.setItem('items', JSON.stringify(this.items));
  },
};
