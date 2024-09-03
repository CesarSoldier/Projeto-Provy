<template>
  <section id="servicos">
    <h2>Para que posso usar o Provy?</h2>
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
        { title: 'Otimização da busca', description: 'Te ajudamos na procura de um prestador de serviço gerais mais próximo da sua casa.' },
        { title: 'Serviços de qualidade', description: 'Filtraremos pra você os serviços mais bem avaliados para melhor desempenho.' },
        { title: 'Visibilidade Maior', description: 'Mostraremos os prestadores de serviços que são especialistas no serviço em que você precisa.' },
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
