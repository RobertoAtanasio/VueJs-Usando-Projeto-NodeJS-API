import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isMenuVisible: false,       // por padrão o usuário está deslogado
        isMudouCategoria: false,
        user: null,                 // por padrão não temos o usuário
        isAdmin: false
        // user: {
        //     name: 'Usuário Mock',
        //     email: 'mock@mail.com.br'
        // }
    },
    mutations: {
        toggleMenu(state, isVisible) {
            if (!state.user) {
                state.isMenuVisible = false
                return
            }

            if(isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        },
        setMudouCategoria(state) {
            state.isMudouCategoria = true
        },
        setUser(state, user) {
            state.user = user
            if (user) {
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
                state.isMenuVisible = true
            } else {
                delete axios.defaults.headers.common['Authorization']
                state.isMenuVisible = false
            }
        },
        isAdmin(state, isAdmin) {
            state.isAdmin = isAdmin
        }, 
        setLogout(state) {
            state.isMenuVisible = false
            state.isAdmi = false
        }
    },
    actions: {
        setAcaoMudouCategoria({ commit }) {
            commit('setMudouCategoria')
        }
    }
})

export default store