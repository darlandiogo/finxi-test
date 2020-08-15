<template>
  <div class="menu" >
    <div class="ui fixed inverted menu">
      <div class="ui container">
        <a href="/" class="header item">
        <img class="logo" :src="require('../assets/logo.png')"/>
        Memes Br
      </a>
        <div class="right menu">
          <a class="item">
          <router-link to="/" key="link_home"> <sui-icon name="home"/>Home</router-link> 
          </a>
          <a class="item">
          <router-link to="/itens-salvos" key="link_itens-salvos"><sui-icon name="heart"/>Itens Salvos</router-link>
        </a>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style>
.menu{
  margin-bottom: 12vh ;
}
</style>