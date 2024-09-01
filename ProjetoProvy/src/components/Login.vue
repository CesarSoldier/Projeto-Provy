<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" v-model="email" placeholder="exemplo@gmail.com" required />
        </div>
        <div class="input-group">
          <label for="senha">Senha</label>
          <input type="password" v-model="password" placeholder="********" required />
        </div>
        <button type="submit" class="btn">Login</button>
      </form>
      <p>Não possui cadastro? <router-link to="/cadastro">Cadastre-se aqui</router-link></p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      handleLogin() {
        console.log('Login com:', this.email, this.password);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos para a página de login */
  </style>
  