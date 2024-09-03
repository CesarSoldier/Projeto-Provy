import { createRouter, createWebHistory } from 'vue-router';
import CadastroCliente from '../components/CadastroCliente.vue';
import Login from '../components/Login.vue';
import CadastroPrestadordeServico from '../components/CadastroPrestadordeServico.vue';

const routes = [
  { path: '/', name: 'Home', component: null }, 
  { path: '/login', name: 'Login', component: Login },
  { path: '/cadastrocliente', name: 'Cadastro de Cliente', component: CadastroCliente},
  { path: '/cadastroprestador', name: 'Cadastro de Prestador de Serviço', component: CadastroPrestadordeServico},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;