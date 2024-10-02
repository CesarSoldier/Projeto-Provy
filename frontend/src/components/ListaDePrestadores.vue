<template>
    <div class="Prestadores">
      <h2 class="title-centralizada">Lista de Prestadores Disponíveis</h2>
      <div v-for="prestador in prestadores" :key="prestador._id" class="card">
        <h3>{{ prestador.name }}</h3>
        <p><strong>Email:</strong> {{ prestador.email }}</p>
        <p><strong>Especialidade:</strong> {{ prestador.especialidade }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
  data() {
    return {
      prestadores: []
    };
  },
  methods: {
    async buscarPrestadores() {
      try {
        const backendUrl = process.env.VITE_APP_BACKEND_URL; 
        const response = await fetch(`${backendUrl}/provedores`); // Concatena a URL base com o endpoint
        const data = await response.json();
        this.prestadores = data;
      } catch (error) {
        console.error('Erro ao buscar prestadores:', error);
      }
    }
  },
  mounted() {
    this.buscarPrestadores();
  }
};
  </script>
  
  <style scoped>
   body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: white;
    background-color: #f8f8f8;
    margin: 0;
    padding: 0;
  }
  
  .title-centralizada {
    text-align: center;
    font-size: 1.5rem;
    color: white;
    margin-bottom: 20px;
  }
  
  .Prestadores {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 20px 0;
    gap: 20px;
    padding: 20px;
    background-color: rgb(13, 4, 66);
    border-radius: 30px;
  }
  
  .card {
    background-color: rgb(223, 222, 231);
    border: 1px solid #ecf0f1;
    border-radius: 12px;
    padding: 20px;
    width: 220px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  
    
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
  
  .card h3 {
    font-size: 1.25rem;
    color: #2c3e50;
    margin-bottom: 10px;
  }
  
  .card p {
    font-size: 0.9rem;
    color: #7f8c8d;
    margin: 5px 0;
  }
  
  @media (max-width: 768px) {
    .Prestadores {
      flex-direction: column;
      align-items: center;
    }
  
    .card {
      width: 100%;
      max-width: 300px;
    }
  }



  </style>
  