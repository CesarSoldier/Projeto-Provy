<template>
  <section class="hero-section">
    <div class="overlay"></div>
    <div class="text-content">
      <h1>Atendimento virtual para você</h1>
      <p>Provy oferece serviços de prestação progressiva e acessível, disponíveis em dispositivos móveis e online, para todos.</p>
      <router-link to="/listadeprestadores">
        <button class="cta-button">Consulte Hoje</button>
      </router-link>
    </div>

    <!-- Novo formulário de cadastro -->
    <div class="signup-form">
      <h2>Cadastra-se já!</h2>
      <p></p>
      <label for="email">E-mail</label>
      <input type="email" id="email" placeholder="nome@email.com">
      <button class="cta-button">Cadastrar agora</button>
      <p class="disclaimer">Ao continuar, você concorda em receber comunicações do Provy. Confira nossa <a href="#">Declaração de Privacidade</a>.</p>
    </div>

    <div class="blue-strip"></div> <!-- Faixa azul abaixo do conteúdo -->
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
};
</script>

<style scoped>
.hero-section {
  font-family: 'Mulish', sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 80px 40px;
  box-sizing: border-box;
  position: relative;
  background-image: url('../assets/home_maintence.png');
  background-size: cover;
  background-position: center;
  width: 100vw;
  min-height: 100vh;
  color: #ffffff;
  overflow: hidden;

  /* Adicionando a animação de movimento */
  animation: moveSideToSide 9s ease-in-out infinite;
}

/* Definindo a animação de movimento lateral */
@keyframes moveSideToSide {
  0% {
    background-position: center;
  }
  50% {
    background-position: calc(50% + 20px); /* Movendo 20px para a direita */
  }
  100% {
    background-position: center; /* Voltando ao centro */
  }
}


.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}


.text-content{
  max-width: 400px;
  z-index: 2;
  padding: 20px;
  background-color: #15242970;
  border-radius: 5%;
}


.signup-form {
  max-width: 400px;
  z-index: 2;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 2%;
  
}

.text-content h1 {
  font-size: 2.0em;
  color: #ffffff;
  margin-bottom: 0.5em;
  text-align: left;
}

.text-content p {
  font-size: 1em;
  color: #f0f0f0;
  margin-bottom: 1.5em;
  line-height: 1.5;
}
.cta-button {
  padding: 10px 20px;
  background-color: #075dad;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
  z-index: 2;
}

.cta-button:hover {
  background-color: #2c82e0;
}



.signup-form h2 {
  font-size: 1.5em;
  color: #333;
  margin-bottom: 0.5em;
}

.signup-form p {
  font-size: 0.9em;
  color: #555;
  margin-bottom: 1em;
}

.signup-form label {
  font-size: 0.9em;
  color: #333;
  display: block;
  margin-bottom: 0.5em;
}

.signup-form input[type="email"] {
  width: 94%;
  padding: 10px;
  margin-bottom: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
}

.signup-form .cta-button {
  width: 100%;
  padding: 10px;
  background-color: #075dad;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  margin-bottom: 1em;
}

.signup-form .disclaimer {
  font-size: 0.8em;
  color: #555;
}

.signup-form .disclaimer a {
  color: #007bff;
  text-decoration: underline;
}

.blue-strip {
  width: 100%;
  height: 10px;
  background-color: #109ac4;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 3;
}
</style>
