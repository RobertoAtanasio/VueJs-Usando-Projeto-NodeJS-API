<template>
    <div class="article-by-id">
        <PageTitle icon="fa fa-file-o" :main="article.name" :sub="article.description" />
        <div class="article-content" v-html="article.content"></div>
    </div>
</template>

<script>
import 'highlightjs/styles/dracula.css'
import hljs from 'highlightjs/highlight.pack.js'
import { baseApiUrl } from '@/global'
import axios from 'axios'
import PageTitle from '../template/PageTitle'

export default {
    name: 'ArticleById',
    components: { PageTitle },
    data() {
        return {
            article: {}
        }
    },
    // Modelo de retorno na API:
    // {
    //     "id": 9,
    //     "name": "Artigo Teste",
    //     "description": "Descrição artigo teste",
    //     "imageUrl": "https://gerenciagram.com.br/blog/wp-content/uploads/2018/10/como-copiar-texto-do-instagram.jpg",
    //     "content": "<p><span style=\"background-color: rgb(250, 250, 250); color: rgb(51, 51, 51);\">A amizade consegue ser tão complexa...</span></p><p><span style=\"background-color: rgb(250, 250, 250); color: rgb(51, 51, 51);\">Deixa uns desanimados, outros bem felizes...</span></p><p><span style=\"background-color: rgb(250, 250, 250); color: rgb(51, 51, 51);\">É a alimentação dos fracos</span></p><p><span style=\"background-color: rgb(250, 250, 250); color: rgb(51, 51, 51);\">É o reino dos fortes</span></p><p><br></p><p><span style=\"background-color: rgb(250, 250, 250); color: rgb(51, 51, 51);\">Faz-nos cometer erros</span></p><p><span style=\"background-color: rgb(250, 250, 250); color: rgb(51, 51, 51);\">Os fracos deixam se ir abaixo</span></p><p><span style=\"background-color: rgb(250, 250, 250); color: rgb(51, 51, 51);\">Os fortes erguem sempre a cabeça</span></p><p><span style=\"background-color: rgb(250, 250, 250); color: rgb(51, 51, 51);\">os assim assim assumem-os</span></p><p><br></p><p><span style=\"background-color: rgb(250, 250, 250); color: rgb(51, 51, 51);\">Sem pensar conquistamos</span></p><p><span style=\"background-color: rgb(250, 250, 250); color: rgb(51, 51, 51);\">O mundo geral</span></p><p><span style=\"background-color: rgb(250, 250, 250); color: rgb(51, 51, 51);\">e construímos o nosso pequeno lugar</span></p><p><span style=\"background-color: rgb(250, 250, 250); color: rgb(51, 51, 51);\">deixando brilhar cada estrelinha</span></p><p><br></p><p><span style=\"background-color: rgb(250, 250, 250); color: rgb(51, 51, 51);\">Estrelinhas...</span></p><p><span style=\"background-color: rgb(250, 250, 250); color: rgb(51, 51, 51);\">Doces, sensíveis, frias, ternurentas...</span></p><p><span style=\"background-color: rgb(250, 250, 250); color: rgb(51, 51, 51);\">Mas sempre presentes em qualquer parte</span></p><p><span style=\"background-color: rgb(250, 250, 250); color: rgb(51, 51, 51);\">Os donos da Amizade...</span></p>",
    //     "userId": 19,
    //     "categoryId": 4
    // }
    mounted() {
        const url = `${baseApiUrl}/articles/${this.$route.params.id}`
        axios.get(url).then(res => this.article = res.data)
    },
    updated() {
        document.querySelectorAll('.article-content pre.ql-syntax').forEach(e => {
            hljs.highlightBlock(e)
        })
    }
}
</script>

<style>
    .article-content {
        background-color: #FFF;
        border-radius: 8px;
        padding: 25px;
    }

    .article-content pre {
        padding: 20px;
        border-radius: 8px;
        font-size: 1.2rem;
        background-color: #1e1e1e;
        color: #FFF;
    }

    .article-content img {
        max-width: 100%;
    }

    /** o último elemento do artigo não terá margin bottom*/
    .article-content :last-child {
        margin-bottom: 0px;
    }
</style>