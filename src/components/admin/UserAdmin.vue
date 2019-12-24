<template>
    <div class="user-admin">
        <b-form>
            <input id="user-id" type="hidden" v-model="user.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="user-name">
                        <b-form-input id="user-name" type="text"
                            v-model="user.name" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o Nome do Usuário..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="E-mail:" label-for="user-email"
                        description="We'll never share your email with anyone else.">
                        <b-form-input id="user-email" type="text"
                            v-model="user.email" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o E-mail do Usuário..." />
                    </b-form-group>
                </b-col>
            </b-row>
            
            <!-- mt-3 margem top 3; mb-3 margem bottom 3 do bootstrap 4-->
            <b-form-checkbox id="user-admin" v-show="mode === 'save'"
                v-model="user.admin" class="mt-3 mb-3">
                Administrador?
            </b-form-checkbox>

            <b-row v-show="mode === 'save'">
                <b-col md="6" sm="12">
                    <b-form-group label="Senha:" label-for="user-password">
                        <b-form-input id="user-password" type="password"
                            v-model="user.password" required
                            placeholder="Informe a Senha do Usuário..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Confirmação de Senha:" 
                        label-for="user-confirm-password">
                        <b-form-input id="user-confirm-password" type="password"
                            v-model="user.confirmpassword" required
                            placeholder="Confirme a Senha do Usuário..." />
                    </b-form-group>
                </b-col>
            </b-row>

            <!-- class="ml-2" -> margem left = 2 -->
            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" v-if="mode === 'save'"
                        @click="save">Salvar</b-button>
                    <b-button variant="danger" v-if="mode === 'remove'"
                        @click="remove">Excluir</b-button>
                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>
        <hr>

        <!-- Ver https://bootstrap-vue.js.org/docs/components/table/#fields-column-definitions -->
        <b-table striped hover :items="users" :fields="fields"
            :busy.sync="isBusy">
            <!-- <template v-slot:cell(actions)="data"> -->
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                    <!-- <a href="#" class="fa fa-pencil"></a> -->
                </b-button>

                <b-button variant="danger" @click="dialogoExclusao(data.item)" >
                    <i class="fa fa-trash"></i>
                </b-button>

                <!-- <b-button variant="danger" @click="loadUser(data.item, 'remove')" >
                    <i class="fa fa-trash"></i>
                </b-button> -->

            </template>

            <!-- <template v-slot:table-busy>
                <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                </div>
            </template> -->
        </b-table>
        <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'UserAdmin',
    data() {
        return {
            isBusy: false,
            mode: 'save',       // para o controle de inserir e alterar
            user: {},
            users: [],
            page: 1,
            limit: 0,
            count: 0,
            // Ver https://bootstrap-vue.js.org/docs/components/table/#fields-column-definitions
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'email', label: 'E-Mail', sortable: true },
                { key: 'admin', label: 'Administrador', sortable: true, 
                    formatter: value => value ? 'Sim' : 'Não' },
                { key: 'actions', label: 'Ações' }
            ]
        }
        // Modelo do objeto de envio à API
        // {
        //     "name": "gabriel",
        //     "email": "gabriel@gmail.com",
        //     "password": "123456",
        //     "confirmpassword": "123456",
        //     "admin": true
        // }
    },
    methods: {
        dialogoExclusao(user) {
            this.$swal("Exclusão", `Confirma a exclusão do usuario '${user.name}'?` , 
                { buttons: {
                    confirm: { value: 0 },
                    cancelar: { value: 1 }
                    }
                }).then((res) => {
                    if (res == 0) {
                        this.excluir(user)
                    }
                })
        },
        // responsável por carregar os usuários 
        loadUsers() {
            const url = `${baseApiUrl}/users?page=${this.page}`
            axios.get(url)
                .then(res => {
                    this.users = res.data.data
                    this.count = res.data.count
                    this.limit = res.data.limit
                    // // eslint-disable-next-line
                    // console.log(res.data.data);
                    // // eslint-disable-next-line
                    // console.log(res.data);
                })
                .catch(showError)
        },
        reset() {
            this.page = 1
            this.mode = 'save'
            this.user = {}
            this.loadUsers()
        },
        save() {
            const metodo = this.user.id ? 'put' : 'post'
            const id = this.user.id ? `/${this.user.id}` : ''
            axios[metodo](`${baseApiUrl}/users${id}`, this.user)
                .then( () => {
                    // defaultSuccess está definido em msgs.js
                    this.$toasted.global.defaultSuccess();
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.user.id
            axios.delete(`${baseApiUrl}/users/${id}`)
                .then( () => {
                    this.$toasted.global.defaultSuccess({msg: "Usuário Excluído com Sucesso!"});
                    this.reset()
                })
                .catch(showError)
        },
        // se não informar, assume 'save' no mode
        // Modelo do User vindo da API:
        // {
        //     "id": 5,
        //     "name": "Roberto",
        //     "email": "roberto@gmail.com",
        //     "admin": true
        // }
        loadUser(user, mode = 'save') {
            this.mode = mode
            this.user = { ...user }
        },
        excluir(user) {
            const id = user.id
            axios.delete(`${baseApiUrl}/users/${id}`)
                .then( () => {
                    this.$toasted.global.defaultSuccess({msg: "Registro Excluído com Sucesso!"});
                    this.reset()
                })
                .catch(showError)
        }
    },
    mounted() {
        this.loadUsers()
    },
    watch: {
        page() {
            this.loadUsers()
        },
    },
}
</script>

<style>
    .isadmin {
        color: blue;
    }
</style>