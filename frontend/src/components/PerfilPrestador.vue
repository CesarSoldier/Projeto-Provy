<script>
import axios from 'axios';

export default {
  data() {
    return {
      prestador: null, // Inicializa como nulo
    };
  },
  created() {
    this.carregarPerfil();
  },
  methods: {
    async carregarPerfil() {
      try {
        const response = await axios.get(`/provedores/${this.$route.params.id}`);
        this.prestador = response.data; // Define os dados do prestador
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
      }
    },
  },
};
</script>

<template>
  <div v-if="prestador" class="perfil-prestador">
    <h1>Perfil do Prestador</h1>
    <p><strong>Nome:</strong> {{ prestador.name }}</p>
    <p><strong>Email:</strong> {{ prestador.email }}</p>
    <p><strong>Especialidade:</strong> {{ prestador.especialidade }}</p>
    <p><strong>Telefone:</strong> {{ prestador.telefone }}</p>
    <p><strong>Endereço:</strong> {{ prestador.endereco }}, {{ prestador.bairro }}, {{ prestador.cidade }} - {{ prestador.estado }}, CEP: {{ prestador.cep }}</p>
    <div class="descricao">
      <label>Descrição dos Serviços:</label>
      <textarea v-model="prestador.descricaoServicos"></textarea>
    </div>
    <button @click="atualizarDescricao">Salvar Descrição</button>
  </div>
  <div v-else>
    <p>Carregando...</p>
  </div>
</template>
