<template>
    <section id="servicos">
      <h2>Nossos Serviços</h2>
      <div class="services">
        <div class="service" v-for="(service, index) in services" :key="index">
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'ServiceList',
    data() {
      return {
        services: [
          { title: 'Consultoria', description: 'Descrição do serviço de consultoria.' },
          { title: 'Desenvolvimento Web', description: 'Descrição do serviço de desenvolvimento web.' },
          { title: 'Suporte Técnico', description: 'Descrição do serviço de suporte técnico.' },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .services {
    display: flex;
    justify-content: space-around;
  }
  
  .service {
    max-width: 300px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
  }
  
  .service h3 {
    margin-bottom: 10px;
  }
  </style>
  