<template>
  <div id="app">
    <Header/>
    <sui-container>
      <router-view></router-view>
    </sui-container>
  </div>
</template>
<script>
import Header from './components/Header';
export default {
  components:{
    Header
  }
}
</script>
<style>
</style>
