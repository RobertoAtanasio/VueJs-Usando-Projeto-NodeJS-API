<template>
    <footer class="footer">
        <span>Copyright <strong>Curso Vue</strong> © 2015-2019</span>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style>
    .footer {
        grid-area: footer;
        background-color: #DDD;
        color: #333;

        display: flex;
        align-items: center;
        justify-content: flex-end;      /** alinha do lado direito da tela */
        padding-right: 10px;
    }
</style>