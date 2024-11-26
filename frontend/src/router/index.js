import { createRouter, createWebHistory } from 'vue-router';
import CadastroCliente from '../components/CadastroCliente.vue';
import Login from '../components/Login.vue';
import CadastroPrestadordeServico from '../components/CadastroPrestadordeServico.vue';
import ListaDePrestadores from '../components/ListaDePrestadores.vue';
import PerfilPrestador from '../components/PerfilPrestador.vue'; // Importe o componente Perfil

const routes = [
  { path: '/', name: 'Home', component: null }, 
  { path: '/login', name: 'Login', component: Login },
  { path: '/cadastrocliente', name: 'Cadastro de Cliente', component: CadastroCliente },
  { path: '/cadastroprestador', name: 'Cadastro de Prestador de Serviço', component: CadastroPrestadordeServico },
  { path: '/listadeprestadores', name: 'Lista de Prestadores', component: ListaDePrestadores },
  {
    path: '/perfil',
    name: 'PerfilPrestador',
    component: PerfilPrestador,
    props: true, // Permite passar dados via `params`
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
