<template>
  <div id="app">
    <header-component />

    <header>
            <h1>Bem-vindo à Provy</h1>
            <p>Sua plataforma de prestação de serviços.</p>
        </header>

    <div class="navigation-buttons">
      <router-link to="/cadastrocliente">
        <button class="btn">Cadastro de Cliente</button>
      </router-link>
      <router-link to="/cadastroprestador">
        <button class="btn">Cadastro de Prestador de Serviço</button>
      </router-link>
      <p>Já possui uma conta?</p> 
      <div class="button-login">
     <router-link to="/login"> 
      <button class="btn">Faça o login</button>
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


    <!-- Caixa estilizada com o botão de destaque -->
    <div class="highlight-box">
      <p>Veja os melhores prestadores de serviços disponíveis na nossa plataforma!</p>
      <router-link to="/listadeprestadores">
        <button @click="hideHighlightBox" class="btn highlight-btn">Ver Lista de Prestadores</button>
      </router-link>
    </div>


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
  
  data() {
    return {
      showHighlightBox: true, // Controle para mostrar/ocultar a caixa
    };
  },
  methods: {
    hideHighlightBox() {
      this.showHighlightBox = false; // Esconde a caixa ao clicar no botão
    }
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column; 
  align-items: center; 
  justify-content: space-between; 
  min-height: 100vh; 
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin: 0; 
  background-color: #fffafa;

}

.header-component,
.footer-component {
  width: 100%; 
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

.navigation-buttons {
    display: inline-block;
    padding: 15px 30px;
    font-size: 1.2rem;
    color: #fff;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s ease;
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

p{
  color: black;
}

</style>

