<template>
    <section class="hero-section">
      <div class="text-content">
        <h1>Atendimento virtual para você</h1>
        <p>Provy oferece serviços de prestação progressiva e acessível, disponíveis em dispositivos móveis e online, para todos.</p>
        <router-link to="/listadeprestadores"> 
            <button class="cta-button">Consulte Hoje</button>
        </router-link>
      </div>
      <div class="image-content">
        <img src="../assets/prestador.png" alt="Healthcare illustration">
      </div>
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
    max-width: 100%;
    padding: 40px 20px; /* Maior espaçamento para alinhar ao canto */
    box-sizing: border-box;
  }
  
  .text-content {
    max-width: 400px;
    text-align: left;
  }
  
  .text-content h1 {
    font-family: 'Mulish', sans-serif;
    font-size: 1.7em;
    color: #000;
    margin-bottom: 0.5em;
    text-align: left;
  }
  
  .text-content p {
    font-size: 1em;
    color: #666;
    margin-bottom: 1.5em;
    line-height: 1.5;
    font-family: 'Mulish', sans-serif;
  }
  
  .cta-button {
    padding: 10px 20px;
    font-family: 'Mulish', sans-serif;
    background-color: #075dad;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s ease;
  }
  
  .cta-button:hover {
    background-color: #2c82e0;
  }
  
  .image-content {
    max-width: 500px;
    margin-left: auto; /* Move a imagem para o extremo direito */
  }
  
  .image-content img {
    width: 100%;
    height: auto;
  }
  </style>
  