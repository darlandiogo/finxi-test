<template>
    <sui-modal v-model="open">
      <sui-modal-header>Editar</sui-modal-header>
      <sui-modal-content image>
        <sui-modal-description>
            <p>Name:</p>
            <div class="ui fluid icon input">
                <input type="text" v-model="name" id="input_nome" @input="emptyInput" placeholder="Nome:">
                
            </div>
            <br/>
            <p> Url: </p>
            <div class="ui fluid icon input">
                <input type="text" v-model="url" id="input_url" @input="emptyInput" placeholder="Url:">
            </div>
            <br/>
            <sui-button primary @click="editarGif()">
                Salvar
            </sui-button>
            <sui-button positive negative @click.native="toggle">
                Cancelar
            </sui-button>
        </sui-modal-description>
      </sui-modal-content>
    </sui-modal>
    
</template>
<script>
import GiphyMixins from './GiphyMixins';
export default {
  mixins:[GiphyMixins],
    props: {
        open: Boolean,
        item: Object,
        index: Number
    },
    data : () =>{
        return {
            name: this.item.name,
            url: this.item.url,
        }
    },
    methods:{
        toggle: function() {
            this.$emit("editar-open", this.open);
        },
        emptyInput: function(){
            document.getElementById('input_nome').style.borderColor = this.name === '' ? 'red'  :  '';
            document.getElementById('input_url').style.borderColor =  this.url  === '' ?  'red' :  '';
        },
        editarGif: function (){
            if(this.name !== '' && this.url !== ''){
                
                let  arr = this.getListGif();

                arr[this.index].name = this.name;
                arr[this.index].url = this.url;
                localStorage.setItem("listGiF", JSON.stringify(arr));
                alert('Dados alterados com sucesso!');
                this.toggle();
            }

            if(this.name === ''){
                console.log('xx');
                document.getElementById('input_nome').style.borderColor = 'red';
            }
            else if(this.url === ''){
                this.error_url = true;
                document.getElementById('input_url').style.borderColor = 'red';
            }


        }
    },
    beforeUpdate: function(){
        if(this.open === true){
            this.name = this.item.name;
            this.url = this.item.url;
        }
    },
    mounted(){
        console.log("mounted");
    }
}
</script>
<style>

</style>