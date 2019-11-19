<template>
    <nav class="menu" v-show="isMenuVisible">
        <div class="menu-filter">
            <i class="fa fa-search fa-lg"></i>
            <input type="text" placeholder="Digite para filtrar..."
                v-model="treeFilter" class="filter-field">
        </div>
        <Tree 
            :data="treeData" 
            :options="treeOptions"
            :filter="treeFilter" 
            ref="tree" />
    </nav>
</template>

<script>
import { mapState } from 'vuex'     // responsável por mapear um atributo dentro do componete store
import Tree from 'liquor-tree'
import { baseApiUrl } from '@/global'
import axios from 'axios'

// mapState['isMenuVisible'] mapear o atributo citado isMenuVisible que passará a
// ser 'um atributo' do componente Menu.vue

// Modelo de retorno da API:
// [
//     {
//         "id": 15,
//         "name": "Java",
//         "parentId": null,
//         "path": "Java",
//         "children": [
//             {
//                 "id": 16,
//                 "name": "Spring Boot",
//                 "parentId": 15,
//                 "path": "Java > Spring Boot",
//                 "children": []
//             }
//         ]
//     },
//     {
//         "id": 3,
//         "name": "Web Moderno",
//         "parentId": null,
//         "path": "Web Moderno",
//         "children": [
//             {
//                 "id": 4,
//                 "name": "CSS",
//                 "parentId": 3,
//                 "path": "Web Moderno > CSS",
//                 "children": []
//             },
//             {
//                 "id": 5,
//                 "name": "JS",
//                 "parentId": 3,
//                 "path": "Web Moderno > JS",
//                 "children": [
//                     {
//                         "id": 6,
//                         "name": "VueJS",
//                         "parentId": 5,
//                         "path": "Web Moderno > JS > VueJS",
//                         "children": []
//                     }
//                 ]
//             }
//         ]
//     }
// ]

// Modelo de leitura da Tree:
// items: [
//     {text: 'Item 1'},
//     {text: 'Item 2'},
//     {text: 'Item 3', children: [
//         {text: 'Item 3.1'},
//         {text: 'Item 3.2'}
//     ]}
// ],
//
// {
//   "id": Number,
//   "text": String,
//   "data": Object,
//   "children": Array,
//   "state": Object
// }

export default {
    name: 'Menu',
    components: { Tree },
    computed: mapState(['isMenuVisible', 'user']),
    data: function() {
        return {
            treeFilter: '',
            treeData: this.getTreeData(),
            treeOptions: {
                propertyNames: { 'text': 'name' },
                filter: { emptyText: 'Categoria não encontrada' },
                checkbox: false 
            }
        }
    },
    methods: {
        getTreeData() {
            const url = `${baseApiUrl}/categories/tree`
            return axios.get(url).then(res => res.data)
        },
        onNodeSelect(node) {
            this.$router.push({
                name: 'articlesByCategory',
                params: { id: node.id }
            })

            if(this.$mq === 'xs' || this.$mq === 'sm') {
                // se selecionou em um dispositivo pequeno ou médio, fecha o menu
                this.$store.commit('toggleMenu', false)
            }
        }
    },
    mounted() {
        // alert('Montou o node de acesso')
        this.$refs.tree.$on('node:selected', this.onNodeSelect)
    }
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

    .menu a,
    .menu a:hover {
        font-size: 0.8rem;
        color: #fff;
        text-decoration: none;
    }

    .menu .tree-node.selected > .tree-content,
    .menu .tree-node .tree-content:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    .tree-arrow.has-child {
        filter: brightness(2);  
    }

    .menu .menu-filter {
        display: flex;
        justify-content: center;
        align-items: center;

        margin: 15px;
        padding-bottom: 4px;
        border-bottom: 1px solid #AAA;
    }

    .menu .menu-filter i {
        color: #AAA;
        margin-right: 7px;
    }

    .menu input {
        color: #CCC;
        font-size: 0.8rem;
        border: 0;
        outline: 0;
        width: 100%;
        background: transparent;
    }

    .tree-filter-empty {
        color: #CCC;
        font-size: 0.8rem;
        margin-left: 20px;
    }
</style>