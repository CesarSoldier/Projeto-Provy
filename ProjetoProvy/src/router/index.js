import { createRouter, createWebHistory } from 'vue-router';
import CadastroCliente from '../components/CadastroCliente.vue';
import Login from '../components/Login.vue';
import CadastroPrestadordeServico from '../components/CadastroPrestadordeServico.vue';
import ListadePrestadores from '../components/ListaDePrestadores.vue';  // Importe a nova página

const routes = [
  { path: '/', name: 'Home', component: null }, 
  { path: '/login', name: 'Login', component: Login },
  { path: '/cadastrocliente', name: 'Cadastro de Cliente', component: CadastroCliente },
  { path: '/cadastroprestador', name: 'Cadastro de Prestador de Serviço', component: CadastroPrestadordeServico },
  { path: '/listadeprestadores', name: 'Lista de Prestadores', component: ListadePrestadores },  // Adicione a nova rota
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
