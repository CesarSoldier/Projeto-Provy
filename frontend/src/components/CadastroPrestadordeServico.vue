<template>
  <section class="fundo">
    
    <div class="cadastro-container">
      <!-- Left Section (Decorativa) -->
      <div class="left-section">
        <div class="logo-container">
          <img src="../assets/icon-provy.png" alt="Logo" width="100%" />
        </div>
      </div>
    <div class="right-section">
      <h2>Prestador de Serviços</h2>
      <form @submit.prevent="handleCadastro">
        <!-- Primeira etapa do formulário -->
        <div v-if="etapa === 1">
          <div class="input-group">
            <label for="nome">Nome:</label>
            <input type="text" v-model="name" placeholder="Seu Nome" required />
          </div>
          <div class="input-group">
            <label for="email">Email:</label>
            <input type="email" v-model="email" placeholder="exemplo@gmail.com" required />
          </div>
          <div class="input-group">
            <label for="cpf">CPF:</label>
            <input type="text" v-model="cpf" placeholder="Seu CPF" required />
          </div>
          <div class="input-group">
            <label for="senha">Senha:</label>
            <input type="password" v-model="password" placeholder="********" required />
          </div>
          <div class="input-group">
            <label for="confirmarSenha">Confirmar Senha:</label>
            <input type="password" v-model="confirmarSenha" placeholder="********" required />
          </div>
          <button type="button" class="btn" @click="proximaEtapa">Continuar Cadastro</button>
        </div>
        
         <!-- Segunda etapa do formulário -->
         <div v-else-if="etapa === 2">
          <div class="input-group">
            <label for="especialidade">Informe sua especialidade:</label>
            <select v-model="especialidade" required>
              <option disabled value="">Selecione sua especialidade</option>
              <option v-for="especialidade in especialidades" :key="especialidade" :value="especialidade">
                {{ especialidade }}
              </option>
            </select>
          </div>
          <div class="input-group">
            <label for="telefone">Telefone:</label>
            <input type="tel" v-model="telefone" placeholder="(xx) xxxxx-xxxx" required />
          </div>
          <div class="input-group">
            <label for="cep">CEP:</label>
            <input type="text" v-model="cep" placeholder="Seu CEP" required />
          </div>
          <div class="input-group">
            <label for="endereco">Endereço:</label>
            <input type="text" v-model="endereco" placeholder="Seu endereço completo" required />
          </div>
          <div class="input-group">
            <label for="bairro">Bairro:</label>
            <input type="text" v-model="bairro" placeholder="Seu bairro" required />
          </div>
          <div class="input-group">
            <label for="cidade">Cidade:</label>
            <input type="text" v-model="cidade" placeholder="Sua cidade" required />
          </div>
          <div class="input-group">
            <label for="estado">Estado:</label>
            <input type="text" v-model="estado" placeholder="Seu estado" required />
          </div>
          <button type="button" class="btn" @click="voltarEtapa">Voltar</button>
          <button type="submit" class="btn">Cadastrar</button>
        </div>

        <p v-if="errorMessage" class="error-message red-text">{{ errorMessage }}</p>
      </form>
      <p>Já possui uma conta? <router-link to="/login">Faça login</router-link></p>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      cpf: '',
      password: '',
      confirmarSenha: '',
      especialidade: '',
      telefone: '',
      endereco: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
      errorMessage: '',
      etapa: 1,
      especialidades: ['Pedreiro', 'Eletricista', 'Marceneiro', 'Encanador', 'Pintor', 'Jardineiro', 'Mecânico'],
    };
  },
  methods: {
    async buscarEndereco() {
      if (this.cep.length === 8) { 
        try {
          const response = await axios.get(`https://viacep.com.br/ws/${this.cep}/json/`);
          if (response.data.erro) {
            this.errorMessage = 'CEP não encontrado.';
          } else {
            this.endereco = response.data.logradouro;
            this.bairro = response.data.bairro;
            this.cidade = response.data.localidade;
            this.estado = response.data.uf;
          }
        } catch (error) {
          this.errorMessage = 'Erro ao buscar endereço. Verifique o CEP e tente novamente.';
        }
      }
    },
    proximaEtapa() {
      if (!this.name || !this.email || !this.cpf || !this.password || !this.confirmarSenha) {
        this.errorMessage = 'Por favor, preencha todos os campos obrigatórios';
        return;
      }
      if (this.password !== this.confirmarSenha) {
        this.errorMessage = 'As senhas não coincidem';
        return;
      }
      this.errorMessage = '';
      this.etapa = 2;
    },
    voltarEtapa() {
      this.etapa = 1;
    },
    async handleCadastro() {
  if (!this.especialidade || !this.telefone || !this.endereco || !this.bairro || 
      !this.cidade || !this.estado || !this.cep) {
    this.errorMessage = 'Por favor, preencha todos os campos obrigatórios';
    return;
  }

  try {
    this.errorMessage = '';
    let backendUrl = import.meta.env.VITE_APP_BACKEND_URL || process.env.VITE_APP_BACKEND_URL;

    const response = await axios.post(`${backendUrl}/registerprovedors`, {
      name: this.name,
      email: this.email,
      cpf: this.cpf,
      password: this.password,
      especialidade: this.especialidade,
      telefone: this.telefone,
      endereco: this.endereco,
      bairro: this.bairro,
      cidade: this.cidade,
      estado: this.estado,
      cep: this.cep,
    });

    console.log('Usuário cadastrado:', response.data);

    // Redirecionar para a tela de perfil
    this.$router.push({
      path: '/perfil',
      query: {
        name: response.data.name,
        email: response.data.email,
        especialidade: response.data.especialidade,
        telefone: response.data.telefone,
        endereco: response.data.endereco,
        bairro: response.data.bairro,
        cidade: response.data.cidade,
        estado: response.data.estado,
      },
    });
  } catch (error) {
    this.errorMessage = error.response?.data?.message || 'Erro ao cadastrar usuário';
    console.error('Erro ao cadastrar usuário:', this.errorMessage);
  }
}



  },
  watch: {
    cep(value) {
      if (value.length === 8) {
        this.buscarEndereco();
      } else if (value === '') {
        // Limpar campos de endereço se o CEP estiver vazio
        this.endereco = '';
        this.bairro = '';
        this.cidade = '';
        this.estado = '';
      }
    }
  }
};
</script>

<style scoped>

.fundo {
  font-family: 'Mulish', sans-serif;
  display: block;
  padding-top: 50px;

  box-sizing: border-box;
  
  background-color: #ddddddf3;

  width: 100vw;
  min-height: 100vh;
  color: #ffffff;
  overflow: hidden;

  /* Adicionando a animação de movimento */
  animation: moveSideToSide 9s ease-in-out infinite;
}

.cadastro-container {
  display: flex;
  width: 90vw; /* Reduz a largura total da tela */
  height: 82vh; /* Reduz a altura total da tela */
  max-width: 900px; /* Limita o tamanho máximo da tela */
  margin: 0 auto;
}

.left-section {
  flex: 1;
  background: linear-gradient(135deg, #064f68, #084c83);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}

.logo-container {
  width: 150px;
  height: 150px;
  padding: 1rem;
  background-color: transparent;
  transition: transform 0.4s ease, filter 0.4s ease;
}

.logo-container:hover {
  animation: rotateZoom 1s ease forwards;
  filter: brightness(1.5) drop-shadow(0 0 15px rgba(255, 255, 255, 0.5));
}

@keyframes rotateZoom {
  0% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.1) rotate(180deg);
  }
  100% {
    transform: scale(1) rotate(360deg);
  }
}


.right-section {
  flex: 1;
  background-color: #ffffff;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #333;
  box-shadow: -5px 0 10px rgba(0, 0, 0, 0.1);
}

.right-section h2 {
  color: #2980b9;
  margin-bottom: 0.75rem;
  font-size: 1.5rem;
}

.input-group {
  margin-bottom: 0.75rem;
}

.input-group label {
  font-weight: bold;
  color: #2980b9;
  font-size: 0.9rem;
}

.input-group input,
.input-group select {
  width: 100%;
  padding: 0.6rem;
  margin-top: 0.25rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

.btn {
  background-color: #2980b9;
  color: #fff;
  padding: 0.6rem; /* Reduz o padding dos botões */
  width: 100%;
  font-size: 0.9rem; /* Reduz o tamanho da fonte dos botões */
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.75rem;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #2c3e50;
}

.error-message {
  color: #e74c3c;
}
</style>
