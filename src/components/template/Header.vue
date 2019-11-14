<template>
    <header class="header">
        <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
            <i class="fa fa-lg" :class="icon"></i>
        </a>
        <h1 class="title">
            {{ title }}
        </h1>
        <UserDropDown v-if="!hideUserDropDown"/>
    </header>
</template>

<script>
// import { mapState } from 'vuex'     // responsável por mapear um atributo dentro do componete store

import UserDropDown from './UserDropDown'

export default {
    name: 'Header',
    components: { UserDropDown },
    props: {
        title: String,
        hideToggle: Boolean,
        hideUserDropDown: Boolean
    },
    computed: {
        // ...mapState(['isMenuVisible']),
        icon() {
            // return this.isMenuVisible ? "fa-angle-left" : 'fa-angle-down'

            // Pode-se utilizar a forma de mapear os estados, mas a forma abaixo também pode ser feita
            return this.$store.state.isMenuVisible ? "fa-angle-left" : "fa-angle-down"
        },
    },
    methods: {
        toggleMenu() {
            this.$store.commit('toggleMenu')    // executa uma mutation
        }
    },
}
</script>

<style>
    .header {
        grid-area: header;
        background: linear-gradient(to right, #1e469a, #49a7c1);

        display: flex;      /* na web é em linha */
        justify-content: center;
        align-items: center;
    }

    .title {
        font-size: 1.2rem;
        color: #fff;
        font-weight: 100;
        flex-grow: 1;           /** o título poderá crescer dentro do container */
        text-align: center;     /** centralizar o texto */
    }

    .title a {
        color: #fff;
        text-decoration: none;
    }

    header.header > a.toggle {
        width: 60px;    
        height: 100%;   /** a altura assumida é a definida em #app - grid-template-rows - em App.vue */
        color: #fff;
        justify-self: flex-start;
        text-decoration: none;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    header.header > a.toggle:hover {
        background-color: rgba(0, 0, 0, 0.2);
        color: #fff;
    }
</style>