<template>
  <div class="about">
    <h1>Itens Salvos</h1>
    <h2 v-show="!listGif.length">Não há itens salvos :( </h2> 
    <table v-show="listGif.length" class="ui basic table">
    <thead>
      <tr>
        <th>GIF</th>
        <th>Nome</th>
        <th>Url</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item,index) in listGif" :key="index">
        <td>
          <div class="table-img" :style="{backgroundColor:colors[randColor()]}">
          <sui-image
            width="100%"
            height="100%"
            :src="item.url" 
            :alt="item.name"
            onerror="this.onerror=null;this.style.display='none';"
            fluid
          />
          </div>
        </td>
        <td class="text-content">{{item.name}}</td>
        <td class="text-content">{{item.url}}</td>
        <td>
            <button class="ui icon button primary" @click="editGif(item,index)">
              <sui-icon name="edit"/> 
            </button>
            <button class="ui icon button negative" @click="removeGif(item.id)">
              <sui-icon name="trash"/>
            </button>

        </td>
      </tr>
    </tbody>
    </table>
    <Editar 
      :open="editarShow" 
      :item="item" 
      :index="index" 
      @editar-open="editarShow = false"
    />
    
  </div>
</template>
<script>
import Editar from '../components/Giphy/Editar';
import GiphyMixins from '../components/Giphy/GiphyMixins';
export default {
  mixins:[GiphyMixins],
  components:{
    Editar
  },
  data: () => {
      return {
        editarShow: false,
        item: {},
        index: -1,
        listGif : []
      }
  },
  methods:{
    removeGif: function(id){

      let  arr = this.getListGif();

      let index = arr.findIndex(x => x.id === id);
      if(index >= 0){
        arr.splice(index, 1);
      }

      localStorage.setItem("listGiF", JSON.stringify(arr));
      this.listGif = this.getListGif();

    },
    editGif: function (item, index){
      this.editarShow = true;
      this.item = item;
      this.index = index;
    },
    saveGif: function(elem){
      
      let  arr = this.getListGif();
        
      let index = arr.findIndex(x => x.id === elem.id);

      if(index >= 0){
        arr[index].name = elem.title;
        arr[index].url = elem.url;
      }
      else{
        arr.push({
          id: elem.id,
          name: elem.title,
          url: elem.url
        });
      }

      localStorage.setItem("listGiF", JSON.stringify(arr));
      this.listGif = this.getListGif();
    }

  },
  beforeUpdate: function(){
    this.listGif = this.getListGif();
  },
  mounted: function() {
    this.listGif = this.getListGif();
  }
}
</script>
<style>
  .text-content{
    word-wrap: break-word;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 300px;
  }
  .table-img{
    max-width:50px;
    height:50px;
  }
</style>