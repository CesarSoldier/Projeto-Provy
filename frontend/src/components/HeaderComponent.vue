<template>
  <header>
    <div class="header-left">
      <router-link to="/">
        <button class="btnLogo">
          <img src="../assets/icon-provy.png" alt="Logo" class="logo" />
        </button>
      </router-link>
      <h1>Provy</h1>
    </div>

    <div class="header-right">
      <div class="dropdown">
        <button class="btn">Cadastro</button>
        <div class="dropdown-content">
          <router-link to="/cadastrocliente">Cadastro de Cliente</router-link>
          <router-link to="/cadastroprestador">Cadastro de Prestador</router-link>
        </div>
      </div>
      <router-link to="/login">
        <button class="btn">Faça o login</button>
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


.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f8f8f8;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 10px 0;
  z-index: 1;
  min-width: 200px;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  display: block;
  font-size: 1rem;
  font-weight: bold;
  text-align: left;
  font-size: 0.8rem;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
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
