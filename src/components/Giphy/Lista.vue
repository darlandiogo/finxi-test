<template>
  <div class="item">
    <sui-image :id="item.id" 
      width="100%" 
      height="100%" 
      :src="arr.url ? arr.url : item.images.original.url" 
      :alt="arr.name ? arr.name: item.title"
      onerror="this.onerror=null;this.style.display='none';"
      fluid
    />
    <div class="item-error">
      <h3 :id="item.id + 'item-error'">{{arr.name ? arr.name: item.title}}</h3> 
    </div>
  </div> 
</template>
<script>
import GiphyMixins from './GiphyMixins';
export default {
  mixins:[GiphyMixins],
  props:{
    item: {}
  },
  data: () => {
    return {
      arr: {}
    }
  },
  methods: {
    savedItem: function (){
      this.arr = {};
      let arr = this.getListGif ();
      let index = arr.findIndex(x => x.id === this.item.id);
      if(index >= 0) {
        this.arr = arr[index];
      }
    }
  },
  beforeUpdate: function(){
    this.savedItem();
  },
  mounted: function(){
    this.savedItem();
  }
  
}
</script>
<style>
  .item{
    width:auto;
    height: 100%;
  }
  .item-error{
  text-align:justify;
  padding:10%;
  color:#fff;
}
</style>