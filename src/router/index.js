import { createRouter, createWebHashHistory  } from 'vue-router';
import HomeView from '../components/HomeView.vue';
import AddItemView from '../components/AddItemView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/add-item', name: 'AddItem', component: AddItemView }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
