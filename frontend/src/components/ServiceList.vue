<template>
  <section id="servicos">
    <h2 class="section-title">Para que posso usar o Provy?</h2>
    <div class="carousel">
      <div class="services" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div class="service" v-for="(service, index) in services" :key="index">
          <h3 class="service-title">{{ service.title }}</h3>
          <p class="service-description">{{ service.description }}</p>
        </div>
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
      currentIndex: 0, // Índice da caixa atual
    };
  },
  mounted() {
    this.startCarousel(); // Inicia o carrossel
  },
  methods: {
    startCarousel() {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.services.length; // Avança para o próximo índice
      }, 5000); 
    },
  },
};
</script>


<style scoped>
.carousel {
  width: 100%;
  overflow: hidden; /* Oculta as partes que saem do carrossel */
  height: 350px; /* Altura fixa que corresponde às caixas de serviço */
  display: flex; /* Para garantir que os serviços sejam exibidos em linha */
  align-items: center; /* Centraliza verticalmente o conteúdo */
}

.services {
  display: flex;
  transition: transform 0.5s ease-in-out; /* Suaviza a transição */
  width: 80%; /* Para garantir que ocupe toda a largura disponível */
}

.service {
  min-width: 100%; /* A caixa ocupa 100% do contêiner do carrossel */
  height: 250px; /* Altura fixa para as caixas */
  background: #1565c0;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 10px; /* Espaçamento lateral entre as caixas */
}


.service:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.service-title {
  font-size: 1.8rem;
  color: #ffffff;
  margin-bottom: 15px;
  text-align: center;
}

.service-description {
  font-size: 1rem;
  color: #f1f1f1;
  line-height: 1.6;
  text-align: center;
}


</style>
