<template>
    <footer>
      <p>&copy; 2024 Serviço XYZ. Todos os direitos reservados.</p>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FooterComponent',
  };
  </script>
  
  <style scoped>
  footer {
    background-color: #42b983;
  color: white;
  text-align: center;
  padding: 10px 0; /* Adiciona espaçamento interno */
  width: 100%; /* Garante que o rodapé ocupe toda a largura */
  position: relative; /* Alinha o rodapé com o fluxo normal do layout */
  bottom: 0; /* Garante que o rodapé esteja no fundo */
  }
  </style>
  