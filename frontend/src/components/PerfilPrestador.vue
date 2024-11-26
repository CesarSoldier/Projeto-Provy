<template>
  <section class="perfil-container">
    <h1>Bem-vindo, {{ prestador.name }}!</h1>
    <div class="perfil-info">
      <p><strong>Nome:</strong> {{ prestador.name }}</p>
      <p><strong>Email:</strong> {{ prestador.email }}</p>
      <p><strong>Especialidade:</strong> {{ prestador.especialidade }}</p>
      <p><strong>Telefone:</strong> {{ prestador.telefone }}</p>
      <p><strong>Endereço:</strong> {{ prestador.endereco }}, {{ prestador.bairro }}, {{ prestador.cidade }} - {{ prestador.estado }}</p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      prestador: {}, // Dados do prestador de serviço
    };
  },
  mounted() {
    // Obtendo os dados passados via router
    if (this.$route.params.prestador) {
      this.prestador = this.$route.params.prestador;
    } else {
      // Redirecionar para login caso os dados não estejam disponíveis
      this.$router.push('/login');
    }
  },
};
</script>

<style scoped>
.perfil-container {
  font-family: 'Mulish', sans-serif;
  padding: 2rem;
  background-color: #f4f4f4;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.perfil-info {
  text-align: left;
  margin-top: 1.5rem;
}

.perfil-info p {
  margin: 0.5rem 0;
  font-size: 1rem;
}

h1 {
  color: #2980b9;
}
</style>
