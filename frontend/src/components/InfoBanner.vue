<template>
    <div class="info-banner">
      <!-- Imagem dentro da esfera -->
      <div class="info-banner-image">
        <div class="image-container">
          <img 
            src="@/assets/houseRepair.gif" 
            alt="Descrição da Imagem"
            class="image-adjustable"
          />
        </div>
      </div>
      <!-- Texto ao lado direito -->
      <div class="info-banner-text">
        <h2>Quem confia e acredita no Provy</h2>
        <p>
          “O Provy proporcionou um crescimento significativo em nossos negócios! 
          <br> Hoje somos referência em nossa área e muitos clientes chegam até nós 
          graças à nossa vitrine online."
        </p>
      </div>
    </div>

  </template>
  
  
  
  <script>
  export default {
    name: "InfoBanner",
  };
  </script>
  
  <style scoped>
.info-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0071bc;
  color: #ffffff;
  padding: 60px 20px;
  margin: 20px auto;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  gap: 30px;
}

.info-banner-image {
  flex: 1;
  display: flex;
  justify-content: center;
}

.image-container {
  width: 250px; /* Tamanho da esfera */
  height: 250px;
  background-color: #ffffff;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.info-banner-text h2{
    color: #ffffff;
}

.image-container img {
  max-width: 95%; /* Tamanho padrão da imagem */
  max-height: 95%;
  object-fit: cover;
}

/* Ajuste manual do tamanho da imagem */
.image-adjustable {
  width: 80%; /* Ajuste aqui o tamanho da imagem dentro da esfera */
  height: auto; /* Mantém a proporção */
}

.info-banner-text {
  flex: 2;
  text-align: left;
}

.info-banner-text h2 {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.info-banner-text p {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 10px;
}


@media (max-width: 768px) {
  .info-banner {
    flex-direction: column;
    text-align: center;
  }

  .info-banner-image {
    margin-bottom: 20px;
  }

  .info-banner-text h2 {
    font-size: 1.5rem;
  }
}

</style>
