import { createRouter, createWebHashHistory  } from 'vue-router';
import HomeView from '../components/HomeView.vue';
import AddItemView from '../components/AddItemView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/add-item', name: 'AddItem', component: AddItemView },
  {
      path: '/edit-item/:id',
      name: 'edit-item',
      component: () => import('../components/EditItemView.vue')
    },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
