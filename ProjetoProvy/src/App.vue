<template>
  <div id="app">
    <header-component />
    <main>
      <service-list />
      <testimonials />
    </main>
    <footer-component />
  </div>
</template>

<script>
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>
