<template>
    <nav class="menu" v-show="isMenuVisible"></nav>
</template>

<script>
import { mapState } from 'vuex'     // responsável por mapear um atributo dentro do componete store

// com mapState['isMenuVisible'] está se querendo mapear o atributo citado isMenuVisible que passará a
// ser 'um atributo' do componente Menu.vue

export default {
    name: 'Menu',
    computed: mapState(['isMenuVisible'])
}
</script>

<style>
    .menu {
        grid: menu;
        background: linear-gradient(to right, #232526, #414345);
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;                    /** permite quebra de linha */
    }
</style>