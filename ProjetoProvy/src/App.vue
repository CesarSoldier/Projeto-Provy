<template>
  <div id="app">
    <header-component />

    <div class="navigation-buttons">
      <router-link to="/login">
        <button class="btn">Login</button>
      </router-link>
      <router-link to="/cadastro">
        <button class="btn">Cadastro</button>
      </router-link>
    </div>

    <main class="main-content">
      <div v-if="$route.path === '/'">
        <service-list />
        <testimonials />
      </div>

      <router-view v-else />
    </main>

    <footer-component />
  </div>
</template>

<script>
document.title = 'Provy';

import HeaderComponent from './components/HeaderComponent.vue';
import ServiceList from './components/ServiceList.vue';
import Testimonials from './components/Testimonials.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    ServiceList,
    Testimonials,
    FooterComponent,
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column; /* Flexbox para organizar os elementos verticalmente */
  align-items: center; /* Centraliza os elementos horizontalmente */
  justify-content: space-between; /* Espaçamento entre os elementos */
  min-height: 100vh; /* Faz com que o conteúdo ocupe a tela inteira */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin: 0; /* Remove a margem padrão */
}

.header-component,
.footer-component {
  width: 100%; /* Garante que o cabeçalho e o rodapé ocupem toda a largura */
}

.main-content {
  flex: 1; /* Faz com que o conteúdo principal ocupe o espaço restante */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centraliza o conteúdo principal verticalmente */
  padding: 20px; /* Espaçamento interno */
  width: 100%; /* Ocupa toda a largura disponível */
  max-width: 1200px; /* Limita a largura máxima */
  box-sizing: border-box; /* Inclui padding e border no tamanho total do elemento */
}

.navigation-buttons {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  gap: 20px;
}

.btn {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #2980b9;
}
</style>
