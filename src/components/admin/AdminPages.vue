<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema" sub="Cadastros & Cia" />
        <!-- os tags b- se refrem ao bootstarp-vue - tabs -->
        <b-card no-body>
            <b-tabs card v-if="user">
                <b-tab title="Artigos" active>
                    <ArticleAdmin />
                </b-tab>
                <b-tab title="Categorias">
                    <CategoryAdmin />
                </b-tab>
                <b-tab title="Usuários">
                    <UserAdmin />
                </b-tab>
                <b-tab title="Diálogo">
                    <Dialogo />
                </b-tab>
                <b-tab title="Teste">
                    <Teste />
                </b-tab>
                <b-tab title="Gráfico">
                    <Graficos />
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import ArticleAdmin from './ArticlesAdmin'
import CategoryAdmin from './CategoryAdmin'
import UserAdmin from './UserAdmin'
import { mapState } from "vuex";

import Dialogo from './Dialogo'
import Teste from './Teste'
import Graficos from '@/components/graficos/Graficos'

export default {
    name: 'AdminPages',
    components: { PageTitle, ArticleAdmin, CategoryAdmin, UserAdmin, Dialogo, Teste, Graficos },
    computed: mapState(['user'])
}
</script>

<style>

</style>