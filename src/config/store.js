import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMenuVisible: false,
        isMudouCategoria: false,
        user: null,
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
            // /* eslint-disable */
            // console.log('toggleMenu', state.isMenuVisible)
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
        }
    },
    actions: {
        setAcaoMudouCategoria({ commit }) {
            commit('setMudouCategoria')
        }
    }
})