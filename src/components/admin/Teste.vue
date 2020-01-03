<template>
    <div id="app-2">
        <span v-bind:title="message">
            Pare o mouse sobre mim e veja a dica interligada dinamicamente!
        </span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: 'Você carregou esta página em ' + new Date().toLocaleString()
        }
    }
}
</script>

<style>

</style>