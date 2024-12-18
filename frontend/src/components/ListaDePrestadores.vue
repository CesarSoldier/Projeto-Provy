<template>
  <!-- Cabeçalho -->
  <header class="buscas">
    <div class="header-left">
      <router-link to="/">
        <button class="btnLogo">
          <img src="../assets/icon-provy.png" alt="Logo" class="logo" />
        </button>
      </router-link>
      <h1>Provy</h1>
      <div class="filtros-container">
        <FiltroPrestadores
            :estadosDisponiveis="estadosDisponiveis"
            :cidadesDisponiveis="cidadesDisponiveis"
            @filtro-especialidade="atualizarFiltroEspecialidade"
            @filtro-estado="atualizarFiltroEstado"
            @filtro-cidade="atualizarFiltroCidade"
        />
      </div>
    </div>

    <div class="header-right">
      <div class="dropdown">
        <button class="btn">Cadastro</button>
        <div class="dropdown-content">
          <router-link to="/cadastrocliente">Cliente</router-link>
          <router-link to="/cadastroprestador">Prestador</router-link>
        </div>
      </div>
    </div>
  </header>

  <!-- Lista de Prestadores -->
  <div class="Prestadores">
    <h2 class="title-centralizada">Lista de Prestadores Disponíveis</h2>

    <!-- Lista de prestadores paginados -->
    <div class="cards-container">
      <div
          v-for="prestador in prestadoresPaginados"
          :key="prestador._id"
          class="card"
          @click="abrirModal(prestador)"
      >
        <h3>{{ prestador.name }}</h3>
        <p><strong>Especialidade:</strong> {{ prestador.especialidade }}</p>
      </div>
    </div>

    <!-- Controles de paginação -->
    <div class="paginacao">
      <button class="btn" :disabled="paginaAtual === 1" @click="paginaAnterior">
        Anterior
      </button>
      <span> Página {{ paginaAtual }} de {{ totalPaginas }} </span>
      <button
          class="btn"
          :disabled="paginaAtual === totalPaginas"
          @click="proximaPagina"
      >
        Próximo
      </button>
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
import FiltroPrestadores from "./FiltroPrestadores.vue";
import PrestadorModal from "./PrestadorModal.vue";

export default {
  components: {
    FiltroPrestadores,
    PrestadorModal,
  },
  data() {
    return {
      prestadores: [],
      filtroEspecialidade: "",
      filtroEstado: "",
      filtroCidade: "",
      estadosDisponiveis: [],
      cidadesDisponiveis: [],
      mostrarModal: false,
      prestadorSelecionado: null,
      // Paginação
      itemsPorPagina: 6, // Número de itens por página
      paginaAtual: 1, // Página inicial
    };
  },
  computed: {
    // Filtra os prestadores com base nos critérios de filtro
    prestadoresFiltrados() {
      return this.prestadores.filter((prestador) => {
        return (
            (this.filtroEspecialidade === "" ||
                prestador.especialidade
                    .toLowerCase()
                    .includes(this.filtroEspecialidade.toLowerCase())) &&
            (this.filtroEstado === "" || prestador.estado === this.filtroEstado) &&
            (this.filtroCidade === "" || prestador.cidade === this.filtroCidade)
        );
      });
    },
    // Exibe apenas parte da lista (relativa à página atual)
    prestadoresPaginados() {
      const inicio = (this.paginaAtual - 1) * this.itemsPorPagina;
      const fim = inicio + this.itemsPorPagina;
      return this.prestadoresFiltrados.slice(inicio, fim);
    },
    // Calcula o total de páginas necessárias
    totalPaginas() {
      return Math.ceil(this.prestadoresFiltrados.length / this.itemsPorPagina);
    },
  },
  methods: {
    // Muda para uma página específica
    mudarPagina(novaPagina) {
      this.paginaAtual = novaPagina;
    },
    // Página anterior
    paginaAnterior() {
      if (this.paginaAtual > 1) {
        this.paginaAtual--;
      }
    },
    // Próxima página
    proximaPagina() {
      if (this.paginaAtual < this.totalPaginas) {
        this.paginaAtual++;
      }
    },
    // Abre o modal ao clicar no prestador
    abrirModal(prestador) {
      this.prestadorSelecionado = prestador;
      this.mostrarModal = true;
    },
    // Busca prestadores do backend
    async buscarPrestadores() {
      try {
        let backendUrl =
            import.meta.env.VITE_APP_BACKEND_URL ||
            process.env.VITE_APP_BACKEND_URL;
        const response = await fetch(`${backendUrl}/provedores`);
        this.prestadores = await response.json();

        this.atualizarFiltros();
      } catch (error) {
        console.error("Erro ao buscar prestadores:", error);
      }
    },
    atualizarFiltros() {
      const estados = new Set(this.prestadores.map((p) => p.estado));
      this.estadosDisponiveis = Array.from(estados);
      this.atualizarCidadesDisponiveis();
    },
    atualizarCidadesDisponiveis() {
      const cidades = new Set(
          this.prestadores
              .filter(
                  (p) => this.filtroEstado === "" || p.estado === this.filtroEstado
              )
              .map((p) => p.cidade)
      );
      this.cidadesDisponiveis = Array.from(cidades);
    },
    atualizarFiltroEspecialidade(novoFiltro) {
      this.filtroEspecialidade = novoFiltro;
      this.paginaAtual = 1; // Reseta para a primeira página
    },
    atualizarFiltroEstado(novoFiltro) {
      this.filtroEstado = novoFiltro;
      this.paginaAtual = 1; // Reseta para a primeira página
      this.atualizarCidadesDisponiveis();
    },
    atualizarFiltroCidade(novoFiltro) {
      this.filtroCidade = novoFiltro;
      this.paginaAtual = 1; // Reseta para a primeira página
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

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f8f8f8;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 10px 0;
  z-index: 1;
  min-width: 200px;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  display: block;
  font-size: 1rem;
  font-weight: bold;
  text-align: left;
  font-size: 0.8rem;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}


.layout-container {
  display: flex;
  gap: 20px;
  width: 100%;
}

.filtros-container {
  display: flex;
  padding: 20px;
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

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px 60px;
  background-color: #f8f8f8;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  gap: 150px;


}

.header-left {
  display: flex;
  align-items: center;
  padding-right: 500px;

}

.logo {
  height: 50px;
  margin-right: 10px;

}

.btnLogo {
  border-radius: 50px;
  background-color: #f8f8f8;
  border: none;

}



header h1 {
  font-size: 1.75rem;
  font-family: 'Mulish', sans-serif;
  color: black;
  margin: 0;
}

.header-right {
  padding-right: 90px;
  gap: 5px;
  margin-right: 10px;

}


.btn {
  background-color: white;
  font-family: 'Mulish', sans-serif;
  color: black;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  transition: transform 0.3s, box-shadow 0.3s;
}

.btn:hover {

  transform: translateY(-3px);



}




@media (max-width: 768px) {
  header {
    flex-direction: column;
    text-align: center;
  }

  .header-right {
    justify-content: center;
    margin-top: 10px;
  }

  .header-left {
    text-align: center;
    align-items: center;
  }
}

.paginacao {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
}

.paginacao .btn {
  background-color: #1565c0;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: bold;
}

.paginacao .btn:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}
</style>