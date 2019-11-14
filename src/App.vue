<template>
  <div id="app" :class="{ 'hide-menu': !isMenuVisible }">
    <Header title="Cod3r - Base de Conhecimento" 
		:hideToggle="false"
		:hideUserDropDown="false"/>
	<Menu>Navigação</Menu>
	<Content>Content</Content>
    <Footer />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Content from "@/components/template/Content";
import Footer from "@/components/template/Footer";
import Header from "@/components/template/Header";
import Menu from "@/components/template/Menu";

export default {
  name: "App",
  components: { Content, Footer, Header, Menu },
  computed: mapState(["isMenuVisible"])
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
		grid-template-columns: 300px 1fr;
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