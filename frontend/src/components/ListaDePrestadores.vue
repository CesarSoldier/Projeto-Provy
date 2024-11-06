<template>
  <div class="Prestadores">
    <h2 class="title-centralizada">Lista de Prestadores Disponíveis</h2>

    <div class="filtros-container">
      <!-- Componente de filtro -->
      <FiltroPrestadores
        :estadosDisponiveis="estadosDisponiveis"
        :cidadesDisponiveis="cidadesDisponiveis"
        @filtro-especialidade="atualizarFiltroEspecialidade"
        @filtro-estado="atualizarFiltroEstado"
        @filtro-cidade="atualizarFiltroCidade"
      />

      <!-- Lista de prestadores -->
      <div class="cards-container">
        <div
          v-for="prestador in prestadoresFiltrados"
          :key="prestador._id"
          class="card"
          @click="abrirModal(prestador)"
        >
          <h3>{{ prestador.name }}</h3>
          <p><strong>Especialidade:</strong> {{ prestador.especialidade }}</p>
        </div>
      </div>
    </div>

    <!-- Modal para exibir detalhes do prestador -->
    <PrestadorModal
      :isVisible="mostrarModal"
      :prestadorSelecionado="prestadorSelecionado"
      @close="mostrarModal = false"
    />
  </div>
</template>

<script>
import FiltroPrestadores from './FiltroPrestadores.vue';
import PrestadorModal from './PrestadorModal.vue';

export default {
  components: {
    FiltroPrestadores,
    PrestadorModal,
  },
  data() {
    return {
      prestadores: [],
      filtroEspecialidade: '',
      filtroEstado: '',
      filtroCidade: '',
      estadosDisponiveis: [],
      cidadesDisponiveis: [],
      mostrarModal: false,
      prestadorSelecionado: null,
    };
  },
  computed: {
    prestadoresFiltrados() {
      return this.prestadores.filter(prestador => {
        return (
          (this.filtroEspecialidade === '' || prestador.especialidade.toLowerCase().includes(this.filtroEspecialidade.toLowerCase())) &&
          (this.filtroEstado === '' || prestador.estado === this.filtroEstado) &&
          (this.filtroCidade === '' || prestador.cidade === this.filtroCidade)
        );
      });
    },
  },
  methods: {
    async buscarPrestadores() {
      try {
        let backendUrl = import.meta.env.VITE_APP_BACKEND_URL || process.env.VITE_APP_BACKEND_URL;
        const response = await fetch(`${backendUrl}/provedores`);
        this.prestadores = await response.json();

        this.atualizarFiltros();
      } catch (error) {
        console.error('Erro ao buscar prestadores:', error);
      }
    },
    atualizarFiltros() {
      const estados = new Set(this.prestadores.map(p => p.estado));
      this.estadosDisponiveis = Array.from(estados);
      this.atualizarCidadesDisponiveis();
    },
    atualizarCidadesDisponiveis() {
      const cidades = new Set(
        this.prestadores
          .filter(p => this.filtroEstado === '' || p.estado === this.filtroEstado)
          .map(p => p.cidade)
      );
      this.cidadesDisponiveis = Array.from(cidades);
    },
    atualizarFiltroEspecialidade(novoFiltro) {
      this.filtroEspecialidade = novoFiltro;
    },
    atualizarFiltroEstado(novoFiltro) {
      this.filtroEstado = novoFiltro;
      this.atualizarCidadesDisponiveis();
    },
    atualizarFiltroCidade(novoFiltro) {
      this.filtroCidade = novoFiltro;
    },
    abrirModal(prestador) {
      this.prestadorSelecionado = prestador;
      this.mostrarModal = true;
    },
  },
  mounted() {
    this.buscarPrestadores();
  },
};
</script>

<style scoped>
body {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: white;
  background-color: #f0f2f5;
  margin: 0;
  padding: 0;
}

.title-centralizada {
  text-align: center;
  font-size: 2rem;
  color: #0d47a1;
  margin: 30px auto;
  font-weight: bold;
}

.Prestadores {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  padding: 25px;
  padding-top: 50px; 
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  border-radius: 20px;
  max-width: 1200px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  min-height: 600px; 
}


.layout-container {
  display: flex;
  gap: 20px;
  width: 100%;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  flex: 1;
}

.card {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  padding: 25px;
  width: 260px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}

.card h3 {
  font-size: 1.5rem;
  color: #1565c0;
  margin-bottom: 15px;
}

.card p {
  font-size: 1rem;
  color: #424242;
  margin: 10px 0;
}

@media (max-width: 768px) {
  .layout-container {
    flex-direction: column;
    align-items: center;
  }

  .card {
    width: 100%;
    max-width: 350px;
  }
}
</style>