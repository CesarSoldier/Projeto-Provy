<template>
  <header>
    <div class="header-left">
      <router-link to="/">
        <button class="btnLogo"><img src="../assets/icon-provy.png" alt="Logo" class="logo" /></button>
      </router-link>
      <h1>Provy</h1>
     
    </div>
    <div class="header-right">
      <router-link to="/cadastrocliente">
        <button class="btn">Cadastro de Cliente</button>
      </router-link>
      <router-link to="/cadastroprestador">
        <button class="btn">Cadastro de Prestador de Serviço</button>
      </router-link>
      <router-link to="/login">
        <button class="btn">Faça o login</button>
      </router-link>
      <router-link to="/listadeprestadores">
        <button class="btn list-prestadores-btn">Lista de Prestadores</button>
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
};
</script>

<style scoped>
/* Estilos do cabeçalho fixo */
header {
  
  position: fixed; /* Fixa o header no topo */
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Z-index alto para sobrepor o conteúdo */
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
  flex-direction: row;
  align-items: center;
  margin: 0px;
  gap: 15px;
}

.logo {
  height: 50px;
  margin-right: 10px;
  ;
}

.btnLogo {
  border-radius: 50px;
  background-color: #f8f8f8;
  border: none;
  outline: none;

  
  
}


header h1 {
  font-size: 1.75rem;
  font-family: 'Mulish', sans-serif;
  color: black;
  margin: 0;
  margin-left: -15px;
}

header p {
  font-size: 1.10rem;
  font-family: 'Mulish', sans-serif;
  color: black;
  margin: 0;
  margin-left: 10px;
}

.header-right {
  display: flex;
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
