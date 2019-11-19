import Vue from 'vue'
import VueMq from 'vue-mq'

// Definição dos break points
// Valores abaixo baseados nos padrãos do Bootstrap 4

Vue.use(VueMq, {
    breakpoints: {
        xs: 576,
        sm: 768,
        md: 960,
        lg: 1140,
        xl: Infinity
    }
})