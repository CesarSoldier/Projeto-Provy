<template>
  <div class="barra-de-busca">
    <div class="profissao">
      
      <i class="icone-lupa"></i>
      <input 
        type="text" 
        v-model="filtroEspecialidade" 
        @input="atualizarFiltroEspecialidade" 
        placeholder=' Buscar "Pedreiro"' 
        class="input-busca"
      />
    </div>
    
    <div class="seletor-estado">
      <i class="icone-localizacao"></i>
      <select v-model="filtroEstado" @change="atualizarFiltroEstado" class="estado-seletor">
        <option value="">Todos os estados</option>
        <option v-for="estado in estadosDisponiveis" :key="estado" :value="estado">{{ estado }}</option>  
      </select>
      <i class="icone-seta-baixo"></i>
    </div>

    <button @click="buscar" class="icone-busca">
        <p>Buscar</p>
    </button>
    
    
  </div>
</template>

<script>
export default {
  props: {
    estadosDisponiveis: Array,
  },
  data() {
    return {
      filtroEspecialidade: '',
      filtroEstado: 'MS', // Exemplo de valor padrão
    };
  },
  methods: {
    atualizarFiltroEspecialidade() {
      this.$emit('filtro-especialidade', this.filtroEspecialidade);
    },
    atualizarFiltroEstado() {
      this.$emit('filtro-estado', this.filtroEstado);
    },
    buscar() {
      // Lógica para realizar a busca
      console.log("Buscando por:", this.filtroEspecialidade, "em", this.filtroEstado);
    }
  },
};
</script>
<style scoped>
.filtro-quadro {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 20px 0;
}

.barra-de-busca {
  display: flex;
}

.profissao, .seletor-estado, .icone-busca {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 24px;
  padding: 8px 12px;
  width: 100%;
  max-width: 500px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.icone-busca {
  max-height: 39px;
  background: white;
}

.input-busca {
  border: none;
  outline: none;
  flex: 1;
  font-size: 0.95rem;
  color: #333;
}

.input-busca::placeholder {
  color: #aaa;
}

.seletor-estado {
  display: flex;
  align-items: center;
  gap: 3px;
  margin-left: 10px;
  position: relative;
}

.icone-localizacao::before {
  content: "\1F4CD"; /* Código unicode para o ícone de localização */
  font-size: 1rem;
  color: #666;
}

.estado-seletor {
  border: none;
  background: none;
  outline: none;
  font-size: 0.9rem;
  color: #333;
  appearance: none;
  padding-right: 10px; /* Espaço para o ícone da seta */
  font-weight: bold;
}

.icone-seta-baixo::before {
  content: "\25BE"; /* Código unicode para uma seta para baixo */
  position: absolute;
  right: 5px;
  color: #666;
  font-size: 0.8rem;
}

.icone-busca {
  background: white;
  border: 1px solid #ccc;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.icone-busca p {
  color: #075dad;
}

.icone-lupa::before {
  content: "\1F50D"; /* Código unicode para o ícone de lupa */
  font-size: 1rem;
  color: #666;
}

@media (max-width: 768px) {
  .filtro-quadro {
    width: 90%;
  }
  .barra-de-busca {
    width: 100%;
  }
}
</style>