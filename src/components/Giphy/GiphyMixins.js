const GiphyMixins = {
    data: () => {
        return {
            API_KEY : process.env.VUE_APP_API_KEY,
            colors : ['#2ECC71', '#F39C12', '#CB4335', '#3498DB', '#884EA0', '#212F3D'],
        }
    },
    methods:{
        getListGif: function (){
            let  arr = JSON.parse(localStorage.getItem("listGiF"));
            if(!arr){
              arr = new Array();
            }
            return arr;
        },
        randColor(){
            return Math.floor(Math.random() * this.colors.length);
        }
    }
}

export default GiphyMixins;