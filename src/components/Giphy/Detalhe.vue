<template lang="html">
  <div>
    <sui-modal v-model="open">
      <sui-modal-header v-if="data.hasOwnProperty('title')">{{arr.hasOwnProperty('name')  ? arr.name : data.title}}</sui-modal-header>
      <sui-modal-content image>
          <div 
            class="item-detalhe"
            :style="{backgroundColor:color}"
              >
              <sui-image
                :id="'detalhe_'+data.id"
                v-if="data.hasOwnProperty('images')"
                width="100%" 
                height="100%" 
                :src="arr.hasOwnProperty('url') ? arr.url : data.images.original.url" 
                :alt="arr.hasOwnProperty('name') ? arr.name : data.title"
                onerror="this.onerror=null;this.style.display='none';"
                fluid
              /> 
          </div>
        <sui-modal-description style="margin-left:2%">
          <sui-header>
                <span v-if="data.hasOwnProperty('user')">{{data.user.display_name}}</span>
          </sui-header>
          <p v-if="data.hasOwnProperty('username') && data.username !== '' "> <sui-icon name="user" disabled /> {{data.username}} </p>
          <p v-if="data.hasOwnProperty('import_datetime')"> <sui-icon name="calendar" disabled /> {{formatDate(data.import_datetime)}} </p>
          <p> <sui-rating :rating="calculateRating(data.rating)" :max-rating="5" /> </p>
          <p v-if="data.hasOwnProperty('embed_url')">
            <a :href="arr.url ? arr.url : data.embed_url" target="_blank"> <sui-icon name="paperclip" disabled />Embed</a>
          </p>
          <p v-if="data.hasOwnProperty('bitly_url')">
            <a :href="arr.url ? arr.url : data.bitly_url" target="_blank"> <sui-icon name="globe" disabled />Giphy</a>
          </p>
          <br/>
          <p v-if="saved === false">
            <button class="ui icon button primary" @click="saveGif(data)">
            <sui-icon name="save"/> Salvar
            </button>
          </p>
          <p v-if="saved === true">
            <button class="ui icon button negative" @click="removeGif(data.id)">
            <sui-icon name="trash"/> Excluir
            </button>
          </p>
        </sui-modal-description> 
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button primary @click.native="toggle">
          OK
        </sui-button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>
import api from '../../services';
import GiphyMixins from './GiphyMixins';
export default {
  mixins:[GiphyMixins],
  props:{
      open: Boolean,
      data: Object,
      color: String
  },
  data() {
    return { 
      saved: false,
      arr: {},
    };
  },
  methods: {
    toggle: function() {
      this.$emit("detalhe-open", this.open);
    },
    formatDate: function(date){
        let d = new Date(date);
        return d.getDay()+'/'+d.getMonth()+'/'+d.getFullYear();
    },
    calculateRating: function(value){
      let arr = ['Y', 'G', 'PG', 'PG-13','R'];
      if(value){
        return arr.indexOf(value.toUpperCase());
      }
      return 0;

    },
    reloadGif: function (id) {
      document.getElementById(`detalhe_${id}`).src = '';
      document.getElementById(`detalhe_${id}`).alt = '';
      api.get(`/gifs/${id}?api_key=${this.API_KEY}&gif_id=${id}&lang=pt`)
      .then(result => {
        let data = result.data.data;
        document.getElementById(`detalhe_${id}`).src = data.images.original.url;
        document.getElementById(`detalhe_${id}`).alt = data.title;
      })
      .catch((err) => {
        console.log(err);
      }) 
    },
    removeGif: function(id){  
      if(this.arr.name !== this.data.title || this.arr.url !== this.data.images.original.url ) {
        this.reloadGif(id);
      }
      this.arr = {};
      this.saved = false;
      let  arr = this.getListGif();
      let index = arr.findIndex(x => x.id === id);
      if(index >= 0){
        arr.splice(index, 1);
      }
      localStorage.setItem("listGiF", JSON.stringify(arr));
      this.$emit("remove-gif", id);
    },
    saveGif: function(elem){
      let  arr = this.getListGif();
      let index = arr.findIndex(x => x.id === elem.id);
      if(index >= 0){
        arr[index].name = elem.title;
        arr[index].url = elem.images.original.url;
      }
      else{
        arr.push({
          id: elem.id,
          name: elem.title,
          url: elem.images.original.url
        });
      }
      localStorage.setItem("listGiF", JSON.stringify(arr));
      this.saved = true;
    }
  },
  beforeUpdate: function(){
    console.log('beforeUpdate');
    this.saved = false;
    this.arr = {};

    if(this.open === true){
      let  arr = this.getListGif();
      let index = arr.findIndex(x => x.id === this.data.id);
      if(index >= 0) {
         this.saved = true ;
         this.arr = arr[index];
      }
    }
  },
  mounted: function(){
    //console.log('mounted');
  }
};
</script>

<style lang="css">
.item-detalhe{
  width:70%;height:50vh; margin:1px;
}
</style>