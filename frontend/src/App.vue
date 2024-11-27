<template>
  <div id="app">
    <header-component v-if="!escondeComponente" />
    
    <main class="main-content">
      <div v-if="$route.path === '/'">
        <hero-section />
        <service-list />
        <info-banner />
        <FaqAccordion />
      </div>
      <router-view v-else />
    </main>

    <footer-component />
  </div>
</template>


<script>
document.title = 'Provy';

import HeaderComponent from './components/HeaderComponent.vue';
import HeroSection from './components/HeroSection.vue';
import ServiceList from './components/ServiceList.vue';
import InfoBanner from './components/InfoBanner.vue';
import FaqAccordion from './components/FaqAccordion.vue'; 
import FooterComponent from './components/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    HeroSection,
    ServiceList,
    InfoBanner,
    FaqAccordion,
    FooterComponent,
  },
  computed: {
    escondeComponente() {
      return this.$route.path === '/listadeprestadores' && '/cadastrocliente';
    }
  }
};
</script>


<style>
body {
  font-family: 'Mulish', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8f8f8;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  margin: 0;
  background-image: linear-gradient(#f8f8f8, #eaf2f8);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 69px 20px 20px;
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


footer-component {
  width: 100%;
}
</style>