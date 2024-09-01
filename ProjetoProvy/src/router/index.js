import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Cadastro from '../components/Cadastro.vue';

const routes = [
  { path: '/', name: 'Home', component: null }, // Esta rota pode permanecer sem um componente específico
  { path: '/login', name: 'Login', component: Login },
  { path: '/cadastro', name: 'Cadastro', component: Cadastro },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
