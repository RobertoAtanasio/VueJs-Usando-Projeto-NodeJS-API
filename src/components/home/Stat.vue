<template>
    <div class="stat">
        <div class="stat-icon">
            <i :class="icon" :style="style"></i>
        </div>
        <div class="stat-info">
            <span class="stat-title">{{ title }}</span>
            <span class="stat-value">{{ value }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Stat',
    props: ['title', 'value', 'icon', 'color'],
    computed: {
        // para a cor do ícone será preciso aplicar um estilo
        style() {
            return 'color: ' + (this.color || '#000')   // se não informar, assumir cor preta
        }
    },
}
</script>

<style>
    .stat {
        flex: 1;        /** cresce de acordo com a necessidade dentro do flex container */
        display: flex;  /** o flex padrão é para ser linha, por isso incluímos outros css */
        border-radius: 8px;
        margin-right: 20px;
        margin-bottom: 20px;
        background-color: #fff;
        padding: 20px;  /** padding interno */
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    .stat-icon {
        display: flex;
        align-items: center;
    }

    .stat-icon i {
        font-size: 5rem;
    }

    .stat-info {
        flex: 1;        /** cresce de acordo com a necessidade dentro do flex container .stat */
        display: flex;  /** neste caso, vamos organizar os 2 elementos span dentro de um 
                            flex container, uma vez que o stat-info passou a ser um flex container. 
                            Por padrão, a orientação é horizontal */
        flex-direction: column;     /** alinhado na vertical (em coluna) */
        align-items: flex-end;      /** alinhar à direita */
    }

    .stat-title {
        font-size: 1.2rem;
    }

    .stat-value {
        font-size: 3rem;
    }
</style>