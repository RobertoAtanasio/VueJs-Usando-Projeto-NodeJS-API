import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMenuVisible: true,
        isMudouCategoria: false,
        user: {
            name: 'Usuário Mock',
            email: 'mock@mail.com.br'
        }
    },
    mutations: {
        toggleMenu(state, isVisible) {
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
        }
    },
    actions: {
        setAcaoMudouCategoria({ commit }) {
            commit('setMudouCategoria')
        }
    }
})