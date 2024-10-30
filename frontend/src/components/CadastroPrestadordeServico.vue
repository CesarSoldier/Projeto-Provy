<template>
  <div class="cadastro-container">
    <h2>Cadastro de Prestador de Serviços</h2>
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
        <button type="button" class="btn" @click="proximaEtapa">→</button>
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
        <div class="input-group">
          <label for="cep">CEP:</label>
          <input type="text" v-model="cep" placeholder="Seu CEP" required />
        </div>
        <button type="button" class="btn" @click="voltarEtapa">Voltar</button>
        <button type="submit" class="btn">Cadastrar</button>
      </div>

      <p v-if="errorMessage" class="error-message red-text">{{ errorMessage }}</p>
    </form>
    <p>Já possui uma conta? <router-link to="/login">Faça login</router-link></p>
  </div>
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
      // Lista de especialidades
      especialidades: ['Pedreiro', 'Eletricista', 'Marceneiro', 'Encanador', 'Pintor', 'Jardineiro', 'Mecânico'],
    };
  },
  methods: {
    proximaEtapa() {
      // Verificar se todos os campos estão preenchidos na primeira etapa
      if (!this.name || !this.email || !this.cpf || !this.password || !this.confirmarSenha) {
        this.errorMessage = 'Por favor, preencha todos os campos obrigatórios';
        return;
      }

      // Verificar se as senhas coincidem
      if (this.password !== this.confirmarSenha) {
        this.errorMessage = 'As senhas não coincidem';
        return;
      }

      this.errorMessage = ''; // Limpar mensagem de erro antes de prosseguir
      this.etapa = 2;
    },
    voltarEtapa() {
      this.etapa = 1;
    },
    async handleCadastro() {
      // Verificar se todos os campos estão preenchidos na segunda etapa
      if (!this.especialidade || !this.telefone || !this.endereco || !this.bairro || 
          !this.cidade || !this.estado || !this.cep) {
        this.errorMessage = 'Por favor, preencha todos os campos obrigatórios';
        return;
      }

      try {
        this.errorMessage = '';
        let backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
        if(!backendUrl) {
          backendUrl = process.env.VITE_APP_BACKEND_URL;
        }

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
        this.$router.push('/login');
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Erro ao cadastrar usuário';
        console.error('Erro ao cadastrar usuário:', this.errorMessage);
      }
    },
  },
};
</script>

<style scoped>
.input-group {
  display: flex;
  justify-content: space-evenly;
  padding: 8px;
  margin-bottom: 1.5rem;
}

.cadastro-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.cadastro-container h2 {
  margin-bottom: 1rem;
  color: blue;
}

.input-group input,
.input-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.btn {
  background-color: white;
  color: blue;
  border: 2px solid blue;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.btn:hover {
  background-color: #2980b9;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.error-message {
  margin-top: 1rem;
}

/* Novo estilo para texto vermelho */
.red-text {
  color: red;
}
</style>