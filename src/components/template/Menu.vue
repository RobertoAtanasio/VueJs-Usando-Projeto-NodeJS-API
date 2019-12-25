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
    computed: mapState(['isMenuVisible', 'user']),  /** pega-se os atributos que se quer mapear
                                                        para dentro do componente */
    data: function() {
        return {
            treeFilter: '',
            treeData: this.getTreeData(),  // quando a Promise for resolvida a árvore sera renderizada
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
            // aqui está retornando uma Promise
            return axios.get(url).then(res => res.data)
        },
        onNodeSelect(node) {
            // Procedimento para programar a geração de rotas dinâmicas no clicks da árvore.
            // Em ArticleItem.vue temos uma forma semelhante para tratar com o router-link. 
            //
            // Para que as rotas funcionem dentro do componente ArticlesByCategory.vue
            // será preciso criar o evento watch que ficar monitorando as seleções das rotas
            // (ver ArticlesByCategory.vue)
            
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
        // Vincular o 'node' da rota selecionada da árvore
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
    /** .tree-node é uma classe criada pela árvore */
    /** Quando se seleciona um item, é criado a classe selected */
    .menu .tree-node.selected > .tree-content,
    .menu .tree-node .tree-content:hover {
        background-color: rgba(255, 255, 255, 0.2);     /** branco uma uma transparência */
    }

    /** .tree-arrow é classe da seta dos itens da árvore */
    .tree-arrow.has-child {
        filter: brightness(2);  
    }

    .menu .menu-filter {
        display: flex;
        justify-content: center;
        align-items: center;

        margin: 15px;
        padding-bottom: 4px;
        border-bottom: 1px solid #AAA;  /** coloca uma borda abaixo, simulando uma linha */
    }

    /** aqui é o ícone */
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

    /** classe criada pela árvore para a opção da mensagem do filtro não encontrado */
    .tree-filter-empty {
        color: #CCC;
        font-size: 0.8rem;
        margin-left: 20px;
    }
</style>