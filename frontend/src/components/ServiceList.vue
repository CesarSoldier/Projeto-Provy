<template>
  <section id="servicos">
    <h2 class="section-title">Para que posso usar o Provy?</h2>
    <div class="services">
      <div class="service" v-for="(service, index) in services" :key="index">
        <h3 class="service-title">{{ service.title }}</h3>
        <p class="service-description">{{ service.description }}</p>
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
#servicos {
  padding: 50px 20px;
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  text-align: center;
  border-radius: 20px;
}

.section-title {
  font-size: 2.5rem;
  color: #0d47a1;
  margin-bottom: 40px;
  font-weight: bold;
}

.services {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
}

.service {
  max-width: 300px;
  background: #1565c0;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  color: #ffffff;
}

.service:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.service-title {
  font-size: 1.8rem;
  color: #ffffff;
  margin-bottom: 15px;
}

.service-description {
  font-size: 1rem;
  color: #f1f1f1;
  line-height: 1.6;
}
</style>