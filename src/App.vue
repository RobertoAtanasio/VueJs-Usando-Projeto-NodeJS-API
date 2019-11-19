<template>
  <div id="app" :class="{ 'hide-menu': !isMenuVisible || !user }">
    <Header title="Cod3r - Base de Conhecimento" 
		:hideToggle="!user"
		:hideUserDropDown="!user"/>
	<Menu v-if="user" />
	<Loading v-if="validatingToken" />
	<Content v-else />
    <Footer />
  </div>
</template>

<script>
import axios from "axios"
import { baseApiUrl, userKey, showError } from "@/global"
import { mapState } from "vuex";
import Content from "@/components/template/Content";
import Footer from "@/components/template/Footer";
import Header from "@/components/template/Header";
import Menu from "@/components/template/Menu";
import Loading from '@/components/template/Loading'

// mapState mapeia os atributos em store.js onde está definido a Vuex.Store

export default {
	name: "App",
	components: { Content, Footer, Header, Menu, Loading },
	computed: mapState(["isMenuVisible", 'user']),
	data: function() {
		return {
			validatingToken: true
		}
	},
	methods: {
		async validateToken() {
			this.validatingToken = true
			const json = localStorage.getItem(userKey)
			const userData = JSON.parse(json)
			this.$store.commit('setUser', null)

			if (!userData) {
				this.validateToken = false
				this.$router.push({ name: 'Auth'})
				return
			}

			const res = await axios.post(`${baseApiUrl}/validateToken`, userData)
				.catch( showError )
				
			if (res.data) {
				this.$store.commit('setUser', userData)
				
				if(this.$mq === 'xs' || this.$mq === 'sm') {
					this.$store.commit('toggleMenu', false)
				}
			} else {
				localStorage.removeItem(userKey)
				this.$router.push({ name: 'auth' })
			}

			this.validateAdmin()

			this.validatingToken = false
		},
		async validateAdmin() {
			const json = localStorage.getItem(userKey)
			const userData = JSON.parse(json)
			const res = await axios.post(`${baseApiUrl}/validateAdmin`, userData)
				.catch( showError )
			this.$store.commit('isAdmin', res.data)
		}
	},
	created() {
		this.validateToken()
	}
};
</script>

<style>
	* {
		font-family: "Lato", sans-serif;
	}

	body {
		margin: 0;		/** retirar as margens default que existe  */
	}

	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		display: grid;		/** lembrar que criamos os componentes acima com grid-area */
		height: 100vh;		/** indica que vai ocupar a tela inteira da aplicação */

		grid-template-areas:
			"header header"
			"nav  content"
			"nav  footer";
		grid-template-rows: 60px 1fr 40px;
		grid-template-columns: 250px 1fr;
	}

	/** Na minha versão, se não incluir o css nav abaixo, o menu não preenche toda a vertical ??? */
	/** e tag em Menu.vue tem que ser nav */
	/** além do grid-template-areas ficar com nav em vez de menu ??? */
	#app > nav {
		grid-area: nav;
	}

	#app.hide-menu {
		grid-template-areas:
			"header header"
			"content content"
			"footer footer";
	}
</style>