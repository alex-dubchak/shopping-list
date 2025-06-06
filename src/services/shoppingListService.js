export default {
  async fetchList() {
    // TODO: Fetch data from Google Sheets
    return {
      Fruits: [
        { name: 'Apple', bought: false },
        { name: 'Banana', bought: true }
      ],
      Dairy: [
        { name: 'Milk', bought: false }
      ]
    };
  },

  async updateItem(category, item) {
    // TODO: Update item in Google Sheets
    console.log(`Updating item in category '${category}':`, item);
  },

  async addItem(category, item) {
    // TODO: Add item to Google Sheets
    console.log(`Adding item to category '${category}':`, item);
  }
};
