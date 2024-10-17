<template>
  <section id="servicos">
    <h2 class="section-title">Para que posso usar o Provy?</h2>

    <!-- Carrossel -->
    <div class="carousel">
      <div class="services" :style="{ transform: `translateX(-${activeSlide * 100}%)` }">
        <div class="service" v-for="(service, index) in services" :key="index">
          <h3 class="service-title">{{ service.title }}</h3>
          <p class="service-description">{{ service.description }}</p>
        </div>
      </div>
    </div>

    <!-- Indicadores de progresso -->
    <div class="carousel-indicators">
      <span 
        v-for="(service, index) in services" 
        :key="index" 
        class="indicator" 
        :class="{ active: index === activeSlide }"
        @click="goToSlide(index)"
      ></span>
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
      activeSlide: 0, // Slide ativo
    };
  },
  mounted() {
    this.startAutoSlide();
  },
  methods: {
    goToSlide(index) {
      this.activeSlide = index; // Define o slide ativo com base no indicador clicado
    },
    startAutoSlide() {
      setInterval(() => {
        this.activeSlide = (this.activeSlide + 1) % this.services.length; // Avança automaticamente para o próximo slide
      }, 3000); // Troca de slide a cada 3 segundos
    }
  }
};
</script>

<style scoped>
#servicos {
  padding: 50px 20px;
  background: linear-gradient(135deg, #e1f2ffee, #bbdefb);
  text-align: center;
  border-radius: 20px;
}

.section-title {
  font-size: 2.5rem;
  color: #0d47a1;
  margin-bottom: 40px;
  font-weight: bold;
}

.carousel {
  width: 100%;
  overflow: hidden;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.services {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.service {
  flex: 0 0 100%;
  height: 250px;
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
  text-align: center;
  margin: 0;
  box-sizing: border-box;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.indicator {
  width: 12px;
  height: 12px;
  background-color: #726d6d;
  border-radius: 50%;
  margin: 0 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.indicator.active {
  background-color: #1565c0;
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
