import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);

const api = Vue.axios.create({
    baseURL: 'https://api.giphy.com/v1',
    headers: {
    },
    timeout: 3000,
});

export default api;