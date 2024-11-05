<template>
  <div class="olx-layout">
    <!-- Header com barra de busca -->
    <header class="header">
      <div class="logo"> <!-- Aqui você pode inserir um logo ou texto similar ao da OLX -->
        <img src="../assets/logo.jpeg" alt="Logo">
      </div>
      <input 
        type="text" 
        v-model="filtroEspecialidade" 
        placeholder="Buscar por especialidade..." 
        class="search-input"
      />
      <nav class="nav-options">
        <span>Plano Profissional</span>
        <span>Meus Anúncios</span>
        <span>Chat</span>
        <button class="anunciar-btn">Anunciar grátis</button>
      </nav>
    </header>

    <!-- Sidebar de categorias -->
    <aside class="sidebar">
      <h3>Categorias</h3>
      <ul>
        <li>Imóveis</li>
        <li>Autos e peças</li>
        <li>Celulares e Telefonia</li>
        <li>Casa, Decoração e Utensílios</li>
        <li>Móveis</li>
        <li>Eletro</li>
        <li>Materiais de Construção</li>
        <li>Informática</li>
        <li>Games</li>
        <li>TVs e Vídeo</li>
        <li>Áudio</li>
        <li>Câmeras e Drones</li>
        <li>Moda e Beleza</li>
      </ul>
    </aside>

    <!-- Conteúdo principal: lista de prestadores -->
    <main class="main-content">
      <h2 class="title-centralizada">Anúncios de Prestadores Disponíveis</h2>

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
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prestadores: [],
      filtroEspecialidade: ""
    };
  },
  computed: {
    prestadoresFiltrados() {
      if (!this.filtroEspecialidade) {
        return this.prestadores;
      }
      return this.prestadores.filter(prestador => 
        prestador.especialidade
          .toLowerCase()
          .includes(this.filtroEspecialidade.toLowerCase())
      );
    }
  },
  methods: {
    async buscarPrestadores() {
      try {
        let backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
        if(!backendUrl) {
          backendUrl = process.env.VITE_APP_BACKEND_URL;
        }
        const response = await fetch(`${backendUrl}/provedores`, {
          referrerPolicy: "unsafe-url" 
        });
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
/* Estilos gerais */
body {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #424242;
  background-color: #f0f2f5;
  margin: 0;
  padding: 0;
}

/* Header estilo OLX */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.logo img {
  height: 40px;
}

.search-input {
  width: 40%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: #1565c0;
  box-shadow: 0 0 5px rgba(21, 101, 192, 0.5);
}

.nav-options {
  display: flex;
  align-items: center;
  gap: 20px;
}

.anunciar-btn {
  background-color: #ff6d00;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

.anunciar-btn:hover {
  background-color: #ff8a00;
}

/* Sidebar de categorias */
.sidebar {
  width: 200px;
  padding: 20px;
  background-color: #ffffff;
  position: fixed;
  top: 70px;
  left: 0;
  height: calc(100% - 70px);
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar h3 {
  color: #0d47a1;
  font-size: 1.2rem;
  margin-bottom: 15px;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 10px;
  color: #424242;
  cursor: pointer;
  transition: color 0.3s ease;
}

.sidebar li:hover {
  color: #1565c0;
}

/* Conteúdo principal */
.main-content {
  margin-left: 220px; /* Espaço para a sidebar */
  padding: 20px;
}

.title-centralizada {
  text-align: center;
  font-size: 2rem;
  color: #0d47a1;
  margin: 30px auto;
  font-weight: bold;
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
  .main-content {
    margin-left: 0;
  }

  .cards-container {
    flex-direction: column;
    align-items: center;
  }

  .card {
    width: 100%;
    max-width: 350px;
  }

  .sidebar {
    display: none;
  }
}
</style>
