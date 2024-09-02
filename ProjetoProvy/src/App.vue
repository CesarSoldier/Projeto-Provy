<template>
  <div id="app">
    <header-component />

    <!-- Caixa estilizada para os botões -->
    <div class="button-container">
      <h2>Bem-vindo ao Provy</h2>
      <p>Faça login ou cadastre-se para começar</p>
      <div class="navigation-buttons">
        <router-link to="/login">
          <button class="btn">Login</button>
        </router-link>
        <router-link to="/cadastro">
          <button class="btn">Cadastro</button>
        </router-link>
      </div>
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
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

/* Caixa estilizada para os botões */
.button-container {
  background-color: #ffffff; /* Fundo branco */
  border: 1px solid #ddd; /* Borda leve */
  border-radius: 10px; /* Cantos arredondados */
  padding: 30px; /* Espaçamento interno */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra para destaque */
  text-align: center; /* Centraliza o texto */
  max-width: 400px; /* Largura máxima */
  margin: 20px auto; /* Centraliza na página */
}

.navigation-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px; /* Espaçamento acima dos botões */
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

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;
}

header-component,
footer-component {
  width: 100%;
}
</style>
