<template>
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
        <button class="btn" @click="obterQRCode">Impulsionar Serviços</button>
        <button class="btn" @click="logout">Logout</button>
        
    </div>
    </header>
    
    <div class="Prestadores">
      <h2 class="title-centralizada">Lista de Prestadores Disponíveis</h2>
  
  
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
   
  
      <!-- Modal para exibir detalhes do prestador -->
      <PrestadorModal
        :isVisible="mostrarModal"
        :prestadorSelecionado="prestadorSelecionado"
        @close="mostrarModal = false"
      />
    </div>

    <div v-if="mostrarQRCode" class="modal">
  <div class="modal-content">
    <h3>QR Code para pagamento</h3>
    <img :src="qrCodeData" class="qr-code" alt="QR Code">
    <button class="close-btn" @click="mostrarQRCode = false">Fechar</button>
  </div>
</div>



  </template>
  
  <script>
  import FiltroPrestadores from './FiltroPrestadores.vue';
import PrestadorModal from './PrestadorModal.vue';
import QRCode from 'qrcode';

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
      mostrarQRCode: false, // Adicione esta linha
      qrCodeData: null, // Adicione esta linha se você ainda não tiver definido
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
    async obterQRCode() {
      try {
        // URL do backend para gerar o QR Code
        const backendUrl = import.meta.env.VITE_APP_BACKEND_URL || process.env.VITE_APP_BACKEND_URL;

        // Chamada à API para obter os dados do QR Code
        const response = await fetch(`${backendUrl}/gerar-qrcode`, { method: "POST" });
        if (!response.ok) throw new Error("Erro ao chamar a API!");

        const data = await response.json();

        // Certifique-se de que a API retornou os dados necessários (chavePix ou equivalente)
        if (data && data.chavePix) {
          // Gerar o QR Code a partir da chave retornada
          QRCode.toDataURL(data.chavePix)
            .then((qrCodeData) => {
              this.qrCodeData = qrCodeData;
              this.mostrarQRCode = true; // Exibir o modal com o QR Code
            })
            .catch((error) => {
              console.error("Erro ao gerar o QR Code:", error);
            });
        } else {
          console.error("Erro: resposta inválida da API.");
        }
      } catch (error) {
        console.error("Erro ao obter o QR Code:", error);
      }
    },
    logout() {
      localStorage.removeItem('authToken');
      localStorage.removeItem('tipoUsuario');
      this.$router.push('/login');
    },
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
  
  .filtros-container{
    display: flex;
    padding: 20px;
  }
  
  .header-right {
 padding-right: 90px;
  gap: 5px;
  margin-right: 10px;

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

  /* Estilo para o modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
}

.qr-code {
  margin-top: 15px;
  max-width: 100%;
  height: auto;
}

.close-btn {
  background-color: red;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.close-btn:hover {
  background-color: darkred;
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
  </style>