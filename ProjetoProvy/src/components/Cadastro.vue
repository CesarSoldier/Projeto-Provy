<template>
  <div class="cadastro-container">
    <h2>Cadastro</h2>
    <form @submit.prevent="handleCadastro">
      <div class="input-group">
        <label for="nome">Nome</label>
        <input type="text" v-model="name" placeholder="Seu Nome" required />
      </div>
      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" v-model="email" placeholder="exemplo@gmail.com" required />
      </div>
      <div class="input-group">
        <label for="senha">Senha</label>
        <input type="password" v-model="password" placeholder="********" required />
      </div>
      <button type="submit" class="btn">Cadastrar</button>
    </form>
    <p>Já possui uma conta? <router-link to="/login">Faça login</router-link></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    handleCadastro() {
      console.log('Cadastro com:', this.name, this.email, this.password);
    },
  },
};
</script>

<style scoped>
/* Estilos específicos para a página de cadastro */
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
  color: var(--color-primary);
}

/* Estilos comuns */
.input-group {
  margin-bottom: 1.5rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.input-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  margin-top: 1rem;
}

.btn:hover {
  background-color: #5a9bd4;
}

p {
  margin-top: 1rem;
}

router-link {
  color: var(--color-link);
}

router-link:hover {
  color: var(--color-link-hover);
}
</style>
