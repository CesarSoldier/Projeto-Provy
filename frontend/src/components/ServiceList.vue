<template>
  <section id="servicos">
    <div class="image-list">
      <div class="image-content">
        <img src="../assets/prestadordeserviço.png" alt="prestadordeserviço">
      </div>
      <div class="text-content">
        <h2 class="section-title">Seu negócio pede visibilidade para vender mais</h2>
        <p class="section-description">
          Com o Provy, você conecta sua loja a milhões de novos clientes, expande sua área de serviço e muito mais. Utilize nossas ferramentas de marketing para aumentar a visibilidade e alcançar pessoas que necessitam dos seus serviços.
        </p>
      </div>
    </div>

    <p class="section-advantage">
      Vantagens de usar o Provy
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
        { title: 'Histórico de serviços', description: 'Acompanhe e salve seu histórico de serviços com o Provy.' }
      ]
    };
  }
};
</script>

<style>


#servicos {
  padding: 80px 150px;
  font-family: 'Mulish', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.image-list {
  display: flex;
  align-items: center; /* Centraliza verticalmente */
  justify-content: center; /* Centraliza horizontalmente */
  gap: 40px;
  margin-bottom: 50px;
  text-align: left;
}

.image-content {
  max-width: 400px;
  display: flex;
  justify-content: center; /* Centraliza horizontalmente a imagem */
}

.image-content img {
  width: 100%;
  height: auto;
  border-radius: 50px; /* Bordas arredondadas */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Sombra suave */
}

.text-content {
  max-width: 500px;
}

.section-title {
  font-size: 2em;
  color: #2c3e50;
  font-weight: bold;
  margin-bottom: 0.5em;
}

.section-description {
  
  font-size: 1em;
  color: #666;
  line-height: 1.6;
  margin-bottom: 2em;
}

.section-advantage {
  font-size: 1.5em;
  color: #2c3e50;
  margin: 1.5em 0;
  text-align: center;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  justify-items: center;
  justify-content: center;
  width: 80%;
}

.service-card {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
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

</style>