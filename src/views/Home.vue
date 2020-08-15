<template lang="html">
  <div class="giphy-listar">
      <div class="search-lista">
        <div class="ui big fluid action input">
        <input type="text" v-model="search" placeholder="Digite aqui a sua pesquisa">
        <button class="ui icon button primary" @click="handleClick()">
          <i class="search icon"></i>
        </button>
        </div>
      </div>
      <div id="lista" class="lista">
        <div 
          class="lista-item"
          :style="{backgroundColor:colors[randColor()]}" 
          v-for="(item, index) in searchResult" 
          :key="index" 
          @click="showDetails(item.id)"
        >
         <Lista :item="item"/>
         
        </div>
      </div>
      <Detalhe 
        :open="showDetalhe" 
        :data="detalhe" 
        :color="colors[randColor()]"  
        @remove-gif="reloadGif"
        @detalhe-open="showDetalhe = false"/>
      <Loading :loading="loading" />

      <sui-button primary class="btn-up" circular size="big"  @click="moveUpClick" icon="angle up" />

  </div>
</template>
<script>
import api from '../services';
import Detalhe from '../components/Giphy/Detalhe';
import Lista from '../components/Giphy/Lista';
import Loading from '../components/Loading';
import GiphyMixins from '../components/Giphy/GiphyMixins';
export default {
  mixins:[GiphyMixins],
  components:{
    Lista,
    Detalhe,
    Loading
  },
  data:() => {
    return {
      showDetalhe: false,
      detalhe: {},
      loading: 0,
      offset: 0,
      limit: 20,
      search : "",
      searchResult: [],
    }
  },
  methods: {
      scroll: function () {
        window.onscroll = () => {
          if((window.innerHeight + window.scrollY) >= document.getElementById("lista").offsetHeight){
            if(!this.loading){
              console.log(this.offset);
              if(this.search === ''){
                this.init();
              }
              else{
                this.searchByName(this.search);
              }
            }
          }
        };
      },
      showDetails: function(id){
        this.searchById(id);
       
      },
      reloadGif: function (id) {
        console.log('reload');
        document.getElementById(id).style.display = 'none';
        document.getElementById(id).alt = '';
        document.getElementById(`${id}item-error`).innerHTML = '';
        api.get(`/gifs/${id}?api_key=${this.API_KEY}&gif_id=${id}&lang=pt`)
        .then(result => {
          let data = result.data.data;
          document.getElementById(id).src = data.images.original.url;
          document.getElementById(id).alt = data.title;
          document.getElementById(`${id}item-error`).value = data.title;
        })
        .catch((err) => {
            console.log(err);
        }) 
      },
      searchById(id){
        api.get(`/gifs/${id}?api_key=${this.API_KEY}&gif_id=${id}&lang=pt`)
        .then(result => {
          this.detalhe = result.data.data;
          this.showDetalhe = !this.showDetalhe;
        })
        .catch((err) => {
            console.log(err);
        }) 
      },
      moveUpClick: function(){
         window.scrollTo(0,0);
      },
      handleClick: function () {
        this.offset = 0 ;
        this.searchResult = [];
        if(this.search !== ""){
          this.searchByName(this.search);
        }
        else{
          //console.log('here');
          this.init();
        }
      },
      searchByName: function(value){
        this.loading = true;
        api.get(`/gifs/search?api_key=${this.API_KEY}&q=${value}&offset=${this.offset}&limit=${this.limit}&lang=pt`)
        .then(result => {
            this.loading = false;
            this.searchResult = this.searchResult.concat(result.data.data.filter((el) => {return this.searchResult.indexOf(el) === -1; }));
           // console.log(this.searchResult);
            this.offset += result.data.pagination.count;
        })
        .catch((err) => {
            console.log(err);
        }) 

      },
      init: function () {
        this.loading = true;
        api.get(`/gifs/trending?api_key=${this.API_KEY}&offset=${this.offset}&limit=${this.limit}&lang=pt`)
        .then(result => {
          this.loading = false;
          this.searchResult = this.searchResult.concat(result.data.data.filter((el) => {return this.searchResult.indexOf(el) === -1; }));
          //console.log(this.searchResult);
          this.offset += result.data.pagination.count;
        })
        .catch((err) => {
            console.log(err);
        })
      }
  },
  beforeUpdate: function(){
    //console.log('hhee');
  },
  mounted: function () {
    this.init();    
    this.scroll();  
  }
}
</script>
<style>
.search-lista{
  margin: 3vh 0 3vh 0;
}
.lista{
  display:flex; 
  flex-direction:row; 
  flex-wrap:wrap; 
  justify-content: space-between;
  align-items:stretch;
}
.lista-item{
  /*min-width:150px;
  width:20%;
  height:300px;
  margin:1px; */
  flex: 1 0 21%;
  margin: 1px;
  height: 200px;
}

@media screen and (max-width: 600px) {
  .lista-item{
    min-width:250px;
  }
}

.btn-up{
  position: fixed;
  right: 1%;
  bottom: 2%;
  z-index: 9999;
  display: flex;
  align-self: end;

}

</style>
