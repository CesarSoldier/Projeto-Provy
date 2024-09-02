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

<style>
/* Removido o `scoped` para permitir estilos globais */

#servicos {
  background-color: #42b983;
  width: 100vw; /* Usa toda a largura da viewport */
  margin-top: 50px;
  margin-bottom: 50px;
  padding: 40px 0; /* Adiciona espaçamento vertical */
}

.services {
  display: flex;
  justify-content: space-around;
  max-width: 1200px; /* Limita a largura máxima dos serviços */
  margin: 0 auto; /* Centraliza o conteúdo */
}

.service {
  max-width: 300px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: white; /* Fundo branco para contraste */
}

.service h3 {
  margin-bottom: 10px;
}
</style>
