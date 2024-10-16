<template>
  <div class="Prestadores">
    <h2 class="title-centralizada">Lista de Prestadores Disponíveis</h2>

    <!-- Barra de pesquisa com título -->
<div class="search-bar-container">
  <label class="search-title">Buscar por especialidade:</label>
  <div class="search-bar">
    <input 
      type="text" 
      v-model="filtroEspecialidade" 
      placeholder="Busque pela especialidade..." 
    />
  </div>
</div>

    <!-- Lista de prestadores filtrada -->
    <div class="cards-container">
      <div 
        v-for="prestador in prestadoresFiltrados" 
        :key="prestador._id" 
        class="card"
      >
        <h3>{{ prestador.name }}</h3>
        <p><strong>Especialidade:</strong> {{ prestador.especialidade }}</p>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prestadores: [],
      filtroEspecialidade: "" // Campo para armazenar o filtro
    };
  },
  computed: {
    prestadoresFiltrados() {
      if (!this.filtroEspecialidade) {
        return this.prestadores; // Retorna todos se o filtro estiver vazio
      }
      return this.prestadores.filter(prestador => 
        prestador.especialidade
          .toLowerCase()
          .includes(this.filtroEspecialidade.toLowerCase()) // Filtra pela especialidade
      );
    }
  },
  methods: {
    async buscarPrestadores() {
      try {
        const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
        const response = await fetch(`${backendUrl}/provedores`);
        const data = await response.json();
        this.prestadores = data;
      } catch (error) {
        console.error('Erro ao buscar prestadores:', error);
      }
    }
  },
  mounted() {
    this.buscarPrestadores();
  }
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
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  border-radius: 20px;
  max-width: 1200px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
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
  .cards-container {
    flex-direction: column;
    align-items: center;
  }

  .card {
    width: 100%;
    max-width: 350px;
  }
}

.search-bar-container {
  display: flex;
  align-items: center; /* Alinha o título e o input no centro verticalmente */
  justify-content: center; /* Centraliza o conjunto na página */
  margin-bottom: 20px;
  gap: 15px; /* Espaçamento entre o título e a barra de pesquisa */
}

/* Estilo do título da barra de pesquisa */
.search-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #0d47a1;
}

/* Estilo da barra de pesquisa */
.search-bar {
  padding: 0;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  border: 1px solid #ddd;
}

.search-bar input {
  padding: 12px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
}

.search-bar input:focus {
  border-color: #1565c0;
  box-shadow: 0 0 5px rgba(21, 101, 192, 0.5);
}
</style>
