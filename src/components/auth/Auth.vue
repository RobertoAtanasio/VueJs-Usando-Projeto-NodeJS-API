<template>
    <div class="auth-content">
        <div class="auth-modal">
            <img src="@/assets/logo.png" width="200" alt="Logo" />
            <hr>
            <div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login' }}</div>

            <input v-if="showSignup" v-model="user.name" type="text" placeholder="Nome">
            <input v-model="user.email" name="email" type="text" placeholder="E-mail">
            <input v-model="user.password" name="password" type="password" placeholder="Senha">
            <input v-if="showSignup" v-model="user.confirmpassword"
                type="password" placeholder="Confirme a Senha">

            <button v-if="showSignup" @click="signup">Registrar</button>
            <button v-else @click="signin">Entrar</button>

            <a href @click.prevent="showSignup = !showSignup">
                <span v-if="showSignup">Já tem cadastro? Acesse o Login!</span>
                <span v-else>Não tem cadastro? Registre-se aqui!</span>
            </a>
        </div>
    </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from '@/global'
import axios from 'axios'

export default {
    name: 'Auth',
    data() {
        return {
            showSignup: false,      // alternar entre a tela de cadastro e login
            user: {}
        }
    },
    methods: {
        signin() {
            // fazer login
            // Modelo entrada para a API:
            // {
            //     "email": "roberto@gmail.com",
            //     "password": "123456"
            // }
            // Modelo saída da API:
            // {
            //     "id": 5,
            //     "name": "Roberto",
            //     "email": "roberto@gmail.com",
            //     "admin": true,
            //     "iat": 1574095350,
            //     "exp": 1574354550,
            //     "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.e"
            // }
            axios.post(`${baseApiUrl}/signin`, this.user)
                .then(res => {
                    this.$store.commit('setUser', res.data)     // executar a mutation em store.js
                    localStorage.setItem(userKey, JSON.stringify(res.data))
                    this.$router.push({ path: '/' })
                    this.$toasted.global.defaultSuccess({msg: "Login Efetuado com Sucesso!"});
                })
                .catch(showError)
        },
        signup() {
            // registrar novo usuário
            // Modelo para a API:
            // {
            //     "name": "gabriel2",
            //     "email": "gabriel2@gmail.com",
            //     "password": "123456",
            //     "confirmpassword": "123456",
            //     "admin": false
            // }
            axios.post(`${baseApiUrl}/signup`, this.user)
                .then(() => {
                    this.user = {}
                    this.showSignup = false
                    localStorage.setItem(userKey, null)
                    this.$toasted.global.defaultSuccess({msg: "Usuário Registrado com Sucesso!"})
                })
                .catch(showError)
        }
    },
}
</script>

<style>
    .auth-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-modal {
        background-color: #FFF;
        width: 350px;
        padding: 35px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-title {
        font-size: 1.2rem;
        font-weight: 100;
        margin-top: 10px;
        margin-bottom: 15px;
    }

    .auth-modal input {
        border: 1px solid #BBB;
        width: 100%;            /** respeitando o padding colocado em .auth-modal */
        margin-bottom: 15px;    /** espaço entre os inputs */
        padding: 3px 8px;       /** espaçamento entre os textos internos */
        /* outline: none;   */  /** retirar as bordas azuis quando se seleciona o input */
    }

    .auth-modal button {
        align-self: flex-end;
        background-color: #2460ae;
        color: #FFF;          /** fonte branca */
        padding: 5px 15px;      /** 5px na vertical e 15px na horizontal */
    }

    .auth-modal a {
        margin-top: 35px;
    }

    .auth-modal hr {
        border: 1;
        width: 100%;
        height: 3px;
        background-image: linear-gradient(to right,
            rgba(120, 120, 120, 0),
            rgba(120, 120, 120, 0.75),
            rgba(120, 120, 120, 0));
    }
</style>