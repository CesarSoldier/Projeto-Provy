import { createRouter, createWebHistory } from 'vue-router';
import CadastroCliente from '../components/CadastroCliente.vue';
import Login from '../components/Login.vue';
import CadastroPrestadordeServico from '../components/CadastroPrestadordeServico.vue';
import ListadePrestadores from '../components/ListaDePrestadores.vue';
 // Importe a página QRCode
import PaginaPrestador from '../components/PaginaPrestador.vue';

import PaginaCliente from '../components/PaginaCliente.vue';

const routes = [
  { path: '/', name: 'Home', component: null },
  { path: '/login', name: 'Login', component: Login },
  { path: '/cadastrocliente', name: 'Cadastro de Cliente', component: CadastroCliente },
  { path: '/cadastroprestador', name: 'Cadastro de Prestador de Serviço', component: CadastroPrestadordeServico },
  {path: '/pagina-cliente', name: 'Pagina de CLiente', component: PaginaCliente },
  { path: '/listadeprestadores', name: 'Lista de Prestadores', component: ListadePrestadores },
  { 
    path: '/pagina-prestador',
    name: 'Pagina de Prestador',
    component: PaginaPrestador,
    beforeEnter: (to, from, next) => {
      const tipoUsuario = localStorage.getItem('tipoUsuario');
      if (tipoUsuario === 'prestador') {
        next();  // Permite o acesso se for prestador
      } else {
        next('/pagina-cliente');  // Redireciona para a lista de prestadores se não for prestador
      }
    }
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Lógica global de redirecionamento, caso o usuário já esteja logado
router.beforeEach((to, from, next) => {
  const tipoUsuario = localStorage.getItem('tipoUsuario');
  if (to.path === '/login' && tipoUsuario) {
    if (tipoUsuario === 'prestador') {
      next('/pagina-prestador');
    } else {
      next('/pagina-cliente');
    }
  } else {
    next();
  }
});

export default router;
