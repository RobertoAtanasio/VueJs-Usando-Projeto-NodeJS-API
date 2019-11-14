<template>
    <div class="user-dropdown">
        <div class="user-button">
            <span class="d-nome d-sm-block">{{ user.name }}</span>
            <div class="user-dropdown-img">
                <Gravatar :email="user.email" alt="user" />
            </div>
            <i class="fa fa-angle-down"></i>
        </div>
        <div class="user-dropdown-content">
            <a href><i class="fa fa-cogs"></i> Administração</a>
            <a href><i class="fa fa-sign-out"></i> Sair</a>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Gravatar from 'vue-gravatar'

// computed: mapState(['isMenuVisible'])    poder-se-ia usar desta forma também abaixo

export default {
    name: 'UserDropDown',
    components: { Gravatar },
    computed: {
        ...mapState(['user'])
    },
}
</script>

<style>
    .user-dropdown {
        position: relative;     /** já faz com que a <div class="user-dropdown-content"> apareça */
        height: 100%;
    }

    .user-button {
        display: flex;
        align-items: center;
        color: #fff;
        font-weight: 100;
        height: 100%;
        padding: 0px 20px;
    }

    .user-dropdown:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }

    .user-dropdown-img {
        padding: 0px 10px
    }

    /** Esta imagem será rederizada pelo Gravatar */
    .user-dropdown-img > img {
        max-height: 37px;
        border-radius: 5px;
    }

    .user-dropdown-content {
        position: absolute;
        right: 0px;     /** alinha à direita em 0px */
        background-color: #f9f9f9;
        min-width: 170px;
        box-shadow: 0px 8px 15px 0px;
        padding: 10px;
        z-index: 1;     /** faz com que apareça sempre à frente dos demais */

        /** direcionar os itens */
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.5s linear;
    }

    /** quando o user-dropdown estiver sob o hover, aplicar outro css ao .user-dropdown-content */
    .user-dropdown:hover .user-dropdown-content {
        visibility: visible;
        opacity: 1;
    }

    .user-dropdown-content a {
        text-decoration: none;  /** retira o undescore do link */
        color: #000;          /** fonte */
        padding: 10px;
    }

    .user-dropdown-content a:hover {
        text-decoration: none;  /** retira o undescore do link */
        color: #000;          /** fonte */
        background-color: #EDEDED;
    }
</style>