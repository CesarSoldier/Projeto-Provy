<template>
    <header>
      <nav>
        <h1>Serviço XYZ</h1>
        <ul>
          <li><a href="#servicos">Serviços</a></li>
          <li><a href="#depoimentos">Depoimentos</a></li>
          <li><a href="#contato">Contato</a></li>
        </ul>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'HeaderComponent',
  };
  </script>
  
  <style scoped>
  header {
    background-color: #42b983;
    padding: 5px;
    color: white;
    width: 100%;
  }
  
  nav ul {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
  }
  
  nav ul li {
    margin: 0 15px;
  }
  
  nav ul li a {
    color: white;
    text-decoration: none;
  }
  
  h1 {
    margin: 0;
  }
  </style>
  