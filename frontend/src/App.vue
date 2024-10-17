<template>
  <div id="app">
    <header-component />

    <header>
      <div class="header-left">
      <router-link to="/">
        <button class="btnLogo"><h1>Provy</h1></button>
      </router-link>
        <p>Plataforma para solução<br> do seus problemas</p>
      </div>
      <div class="header-right">
        <router-link to="/cadastrocliente">
          <button class="btn">Cadastro de Cliente</button>
        </router-link>
        <router-link to="/cadastroprestador">
          <button class="btn">Cadastro de Prestador de Serviço</button>
        </router-link>
        <router-link to="/login">
          <button class="btn">Faça o login</button>
        </router-link>
        <router-link to="/listadeprestadores">
          <button class="btn list-prestadores-btn">Lista de Prestadores</button>
        </router-link>
      </div>
    </header>

    <main class="main-content">
      <div v-if="$route.path === '/'">
        <service-list />
        <testimonials />
        <provedor-list /> <!-- Aqui você inclui a lista de provedores -->
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
import ProvedorList from './components/ListaDePrestadores.vue'; // Importa o novo componente

export default {
  name: 'App',
  components: {
    HeaderComponent,
    ServiceList,
    Testimonials,
    FooterComponent,
    ProvedorList 
  },
  data() {
    return {
      showHighlightBox: true
    };
  },
  methods: {
    hideHighlightBox() {
      this.showHighlightBox = false;
    }
  }
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column; 
  min-height: 100vh; 
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin: 0;
  background-image: 
    linear-gradient(rgba(15, 70, 126, 0.815), rgba(0, 0, 97, 0.712)), /* Gradiente azul com mais transparência */
    url("../Imagens/fundo.png"); /* Imagem de fundo */
  background-size: cover; 
  background-repeat: no-repeat; 
  background-position: center; 
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  width: 100%;
  background-color: #001357;  
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
}

.header-left {
  display: flex;
  flex-direction: row; 
  align-items: center;
  margin: 0px;
  gap: 15px;

  
}

.logo {
 
  height: 50px; 
  margin-right: 10px; 
  
}

.btnLogo{
  background-color: #001357;
  border: white;
  margin-left: 15px;
}

header h1 {
  font-size: 1.75rem;
  color: white;
  margin: 0;
  margin-left: -15px
}


header p {
  font-size: 1.10rem;
  color: white;
  margin: 0;
  margin-left: 10px;
}

.header-right {
  display: flex;
  gap: 15px;
  margin-right: 40px;
}

.btn {

  background-color: white;
  color: blue;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.btn:hover {
  background-color: #2980b9;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.list-prestadores-btn {
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  
  
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

.highlight-box {
  background-color: #eaf2f8;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  margin: 20px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

p {
  color: blue;
  font-weight: bold;
}

footer-component {
  width: 100%;
}


@media (max-width: 768px) {
  header {
    flex-direction: column;
    text-align: center;
  }

  .header-right {
    justify-content: center;
    margin-top: 10px;
  }

  .header-left {
    text-align: center;
    align-items: center;
  }
}

</style>


