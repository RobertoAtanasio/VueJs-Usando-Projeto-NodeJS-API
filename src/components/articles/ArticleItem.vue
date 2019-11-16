<template>
    <div class="article-item">
        <!-- ver a rota em router.js Todo o bloco é um link -->
        <!-- d-none -- dispositivo pequeno a imagem irá sumir. Em celular não exibes -->
        <!-- d-sm-block -- a partir do small para cima, exibir -->
        <!-- Essas são classes do bootstrap 4 -->
        <router-link :to="{ name: 'articleById', params: { id: article.id } }">
            <div class="article-item-image d-none d-sm-block">
                <img v-if="article.imageUrl"
                    :src="article.imageUrl"
                    height="150" width="150" alt="Article">
                <img v-else
                    src="@/assets/article.png"
                    height="150" width="150" alt="Article">
            </div>
            <div class="article-item-info">
                <h2>{{ article.name }}</h2>
                <p>{{ article.description }}</p>
                <span class="article-item-author">
                    <strong>Autor: </strong>{{ article.author }}
                </span>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'ArticleItem',
    props: ['article']
}
</script>

<style>
    .article-item {
        border-radius: 8px;
        margin-bottom: 20px;
        background-color: #FFF;
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    .article-item a {
        display: flex;
        align-items: flex-start;    
        text-decoration: none;
        color: #000;
    }

    .article-item-info h2 {
        font-size: 1.7rem;
    }

    .article-item-image {
        padding-right: 20px;
        margin-right: 20px;
        border-right: 1px solid #AAA;   /** simula a barra vertical separando os textos */
    }

    .article-item-image img {
        border-radius: 5px;
    }

    .article-item-info {
        display: flex;
        align-self: stretch;    /* Estica itens de tamanho 'auto' para encaixar no container */ 
        flex-direction: column;
    }

    .article-item-info p {
        flex: 1;
        color: #555;
        font-size: 1.1rem;
    }
</style>