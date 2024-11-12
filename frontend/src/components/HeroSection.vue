<template>
  <section class="hero-section">
    <div class="overlay"></div> <!-- Overlay para contraste -->
    <div class="text-content">
      <h1>Atendimento virtual para você</h1>
      <p>Provy oferece serviços de prestação progressiva e acessível, disponíveis em dispositivos móveis e online, para todos.</p>
      <router-link to="/listadeprestadores">
        <button class="cta-button">Consulte Hoje</button>
      </router-link>
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
  justify-content: space-between;
  padding: 80px 40px;
  box-sizing: border-box;
  position: relative;
  background-image: url('../assets/home_maintence.png'); /* Substitua pelo caminho da sua imagem */
  background-size: cover;
  background-position: center;
  width: 100vw;
  min-height: 100vh;
  color: #ffffff;
  overflow: hidden;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Cor e opacidade do overlay */
  z-index: 1;
}

.text-content {
  max-width: 400px;
  z-index: 2;
}

.text-content h1 {
  font-size: 2.5em;
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

.image-content {
  max-width: 500px;
  z-index: 2;
  margin-left: auto;
}

.image-content img {
  width: 100%;
  height: auto;
}

/* Faixa azul na parte inferior do componente */
.blue-strip {
  width: 100%;
  height: 20px; /* Altura da faixa */
  background-color: #075dad; /* Cor da faixa azul */
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 3;
}
</style>
