<template>
<header>
            <h1>Bem-vindo à Provy</h1>
            <p>Sua plataforma de prestação de serviços.</p>
        </header>

    <div class="navigation-buttons">
      <router-link to="/cadastrocliente">
        <button class="btn">Cadastro de Cliente</button>
      </router-link>
      <router-link to="/cadastroprestador">
        <button class="btn">Cadastro de Prestador de Serviço</button>
      </router-link>
      <p>Já possui uma conta?</p> 
      <div class="button-login">
     <router-link to="/login"> 
      <button class="btn">Faça o login</button>
    </router-link>
     </div>
    </div>
</template>
  
  <script>
  export default {
    name: 'HeaderComponent',
  };
  </script>
  
  