<template>
  <section id="servicos">
    <div class="image-list">
      <div class="image-content">
        <img src="../assets/prestadordeserviço.png" alt="prestadordeserviço">
      </div>
      <h2 class="section-title">Para que posso usar o Provy?</h2>
      <p class="section-description">
        Nós oferecemos as melhores escolhas para você. Com o Provy, você pode ajustar os serviços às suas necessidades e
        contar com o auxílio dos melhores prestadores.
      </p>
    </div>

    <p class="section-advantage">
      Vantagens de você usar o Provy
    </p>
    <div class="service-grid">
      <div class="service-card" v-for="(service, index) in services" :key="index">
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
        { title: 'Informações detalhadas', description: 'Consulta gratuita com os nossos prestadores de confiança para melhor recomendações.' },
        { title: 'Atendimento de emergência', description: 'Você pode obter atendimento urgente para você e sua família a qualquer momento.' },
        { title: 'Rastreamento', description: 'Acompanhe e salve seu histórico de serviços com o Provy.' }
      ]
    };
  }
};
</script>

<style scoped>
#servicos {
  text-align: center;
  padding: 80px 150px;
}

.content-container {
  display: flex;
  align-items: center;
  /* Alinha verticalmente ao centro */
  justify-content: center;
  /* Alinha horizontalmente ao centro */
  gap: 40px;
  /* Espaço entre a imagem e o conteúdo */
}

.text-content {
  text-align: left;
}

.section-title {
  display: flex;
  justify-content: right;
  font-size: 1.5em;
  color: #2c3e50;
  margin-bottom: 0.5em;
  margin-top: 0.5em;
  font-family: 'Mulish', sans-serif;

}

.section-advantage {
  font-size: 1.5em;
  color: #2c3e50;
  margin-bottom: 0.5em;
  margin-top: 0.5em;
  font-family: 'Mulish', sans-serif;
}

.section-description {
  font-size: 1em;
  color: #666;
  margin-bottom: 2em;
  line-height: 1.5;
  font-family: 'Mulish', sans-serif;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  font-family: 'Mulish', sans-serif;
}

.service-card {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  text-align: left;
  transition: transform 0.3s, box-shadow 0.3s;
  font-family: 'Mulish', sans-serif;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.service-title {
  font-size: 1.2em;
  color: #075dad;
  margin-bottom: 0.5em;
}


.service-description {
  font-size: 0.9em;
  color: #666;
  line-height: 1.8;
}

.image-content {
  max-width: 100%;
  margin-right: auto;
  margin-left: 0.2px;
}

.image-content img {
  max-width: 100%;
  width: 1600px;
  height: auto;
  border-radius: 50px;
}

.image-list {
  display: flex;
  margin-bottom: 150px;
}
</style>
