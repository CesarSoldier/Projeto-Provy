<template>
    <div class="filtro-quadro">
      <div class="input-group">
        <label>Buscar por especialidade:</label>
        <input type="text" v-model="filtroEspecialidade" @input="atualizarFiltroEspecialidade" placeholder="Busque pela especialidade..." />
      </div>
  
      <div class="input-group">
        <label>Estado:</label>
        <select v-model="filtroEstado" @change="atualizarFiltroEstado">
          <option value="">Todos os estados</option>
          <option v-for="estado in estadosDisponiveis" :key="estado" :value="estado">{{ estado }}</option>
        </select>
      </div>
  
      <div class="input-group">
        <label>Cidade:</label>
        <select v-model="filtroCidade" @change="atualizarFiltroCidade">
          <option value="">Todas as cidades</option>
          <option v-for="cidade in cidadesDisponiveis" :key="cidade" :value="cidade">{{ cidade }}</option>
        </select>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      estadosDisponiveis: Array,
      cidadesDisponiveis: Array,
    },
    data() {
      return {
        filtroEspecialidade: '',
        filtroEstado: '',
        filtroCidade: '',
      };
    },
    methods: {
      atualizarFiltroEspecialidade() {
        this.$emit('filtro-especialidade', this.filtroEspecialidade);
      },
      atualizarFiltroEstado() {
        this.$emit('filtro-estado', this.filtroEstado);
      },
      atualizarFiltroCidade() {
        this.$emit('filtro-cidade', this.filtroCidade);
      },
    },
  };
  </script>
  
  <style scoped>
.filtro-quadro {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 70%; 
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 3vw;
  margin-left: auto; 
  margin-right: auto; 
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: 180px;
  width: 100%;
}

.input-group label {
  font-size: 0.9rem;
  color: #0d47a1;
}

.input-group input,
.input-group select {
  padding: 8px;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-group input::placeholder {
  color: #aaa;
}


@media (max-width: 768px) {
  .filtro-quadro {
    flex-direction: column;
    align-items: stretch;
  }
}

</style>
  