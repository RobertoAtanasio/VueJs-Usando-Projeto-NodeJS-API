<template>
    <div class="category-admin">
        <b-form>
            <input id="category-id" type="hidden" v-model="category.id" />
            <b-form-group label="Nome:" label-for="category-name">
                <b-form-input id="category-name" type="text"
                    v-model="category.name" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe o Nome da Categoria..." />
            </b-form-group>

            <b-form-group label="Categoria Pai:" label-for="category-parentId">
                <b-form-select v-if="mode === 'save'"
                    id="category-parentId"
                    :options="categoriesListBox" v-model="category.parentId" />
                <b-form-input v-else
                    id="category-parentId" type="text"
                    v-model="category.path"
                    readonly />
            </b-form-group>

            <b-button variant="primary" v-if="mode === 'save'"
                @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'"
                @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>

        <hr>

        <b-table hover striped :items="categoriesListBox" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadCategory(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadCategory(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
        <!-- <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" /> -->
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'CategoryAdmin',
    data: function() {
        return {
            mode: 'save',
            category: {},
            categories: [],
            categoriesListBox: [],
            page: 1,
            limit: 0,
            count: 0,
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'path', label: 'Caminho', sortable: true },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
        // Modelo de retorno das categorias via API na chamada de loadCategories(): 
        /*
        {
            "data": [
                {
                    "id": 3,
                    "name": "Web Moderno",
                    "parentId": null,
                    "path": "Web Moderno"
                },
                {
                    "id": 4,
                    "name": "CSS",
                    "parentId": 3,
                    "path": "Web Moderno > CSS"
                }
            ],
            "count": 6,
            "limit": 2
        }
        */
        loadCategories() {
            const url = `${baseApiUrl}/categories?page=${this.page}`
            axios.get(url)
                .then(res => {
                    this.count = res.data.count
                    this.limit = res.data.limit
                    // this.categories = res.data
                    this.categories = res.data.data.map(category => {
                        const ret = { ...category, value: category.id, text: category.path } 
                        return ret
                    })
                })
                .catch(showError)
        },
        loadCategoriesListBox() {
            const url = `${baseApiUrl}/categories/all`
            axios.get(url)
                .then(res => {
                    // o value: category.id, text: category.path serão usado no combobox
                    this.categoriesListBox = res.data.map(category => {
                        const ret = { ...category, value: category.id, text: category.path } 
                        return ret
                    })
                })
                .catch(showError)
        },
        reset() {
            this.mode = 'save'
            this.category = {}
            this.loadCategories()
            this.loadCategoriesListBox()
        },
        save() {
            const method = this.category.id ? 'put' : 'post'
            const id = this.category.id ? `/${this.category.id}` : ''
            axios[method](`${baseApiUrl}/categories${id}`, this.category)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                    this.loadCategoriesListBox()
                    this.$store.dispatch('setAcaoMudouCategoria')  // dispara a ação em store.js
                })
                .catch(showError)
        },
        remove() {
            const id = this.category.id
            axios.delete(`${baseApiUrl}/categories/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                    this.$store.dispatch('setAcaoMudouCategoria')  // dispara a ação em store.js
                })
                .catch(showError)
        },
        loadCategory(category, mode = 'save') {
            this.mode = mode
            this.category = { ...category }
        }
    },
    mounted() {
        this.loadCategoriesListBox()
        this.loadCategories()
    },
    watch: {
        page() {
            this.loadCategories()
        },
    },
}
</script>

<style>

</style>