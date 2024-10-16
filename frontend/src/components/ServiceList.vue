<template>
  <section id="servicos">
    <h2 class="section-title">Para que posso usar o Provy?</h2>
    <div class="carousel">
      <div class="services" :style="carouselStyle">
        <div class="service" 
          v-for="(service, index) in services" 
          :key="index" 
          :class="{ active: currentIndex === index }">
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
      currentIndex: 0,
      interval: null,
    };
  },
  computed: {
    carouselStyle() {
      return {
        transform: `translateX(-${this.currentIndex * 100}%)`,
        transition: 'transform 0.5s ease-in-out',
      };
    }
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.services.length;
    },
    startCarousel() {
      this.interval = setInterval(this.nextSlide, 3000); // Altera a cada 3 segundos
    },
    stopCarousel() {
      clearInterval(this.interval);
    }
  },
  mounted() {
    this.startCarousel();
  },
  beforeDestroy() {
    this.stopCarousel();
  }
};
</script>

<style scoped>
#servicos {
  padding: 50px 20px;
  background: linear-gradient(135deg, #e1f2ffee, #bbdefb);
  text-align: center;
  border-radius: 20px;
  overflow: hidden; /* Oculta as caixas que estão fora do contêiner */
}

.section-title {
  font-size: 2.5rem;
  color: #0d47a1;
  margin-bottom: 40px;
  font-weight: bold;
}

.carousel {
  width: 100%;
  overflow: hidden; /* Oculta partes que saem do carrossel */
}

.services {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.service {
  min-width: 100%; /* Cada serviço ocupa 100% da largura do contêiner */
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
