<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main="Dashboard" sub="base de Conhecimento" />
        <div class="stats">
            <Stat title="Categorias" :value="stat.categories"
                icon="fa fa-folder" color="#d54d50" />
            <Stat title="Artigos" :value="stat.articles"
                icon="fa fa-file" color="#3bc480" />
            <Stat title="Usuários" :value="stat.users"
                icon="fa fa-user" color="#3282cd" />
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import Stat from './Stat'
import axios from 'axios'               // para as requisições ao backend
import { baseApiUrl } from '@/global'   // fazer o link com os parâmetros em global.js
import { mapState } from "vuex";

// data() { poderia ser substituído por data: function {

export default {
    name: 'Home',
    components: { PageTitle, Stat },
    computed: mapState(['user']),
    data() {
        return {
            stat: {}
        }
    },
    methods: {
        getStats() {
            axios.get(`${baseApiUrl}/stats`)
                .then( res => this.stat = res.data)

            // exemplo de retorno da API:
            // {
            //     "_id": "5dcb173898ab0d38b4276fb9",
            //     "users": 4,
            //     "categories": 4,
            //     "articles": 2,
            //     "createdAt": "2019-11-12T20:34:00.155Z",
            //     "__v": 0
            // }
        }
    },
    watch: {
        user() {
            this.getStats()
        }
    },
    mounted() {
        this.getStats()         // assim que o componente é montado, acessa as estatísticas
    },
}
</script>

<style>
    .stats {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;    /** quebrar a linha caso a quantidade não caiba */
    }
</style>