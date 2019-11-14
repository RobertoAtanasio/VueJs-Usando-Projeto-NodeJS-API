import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'
import './config/bootstrap'   // aqui carregará e rodará o arquivo de configuração do bootstrap
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

// TEMPORARIAMENTE!!!!! Vai-se retirar após o tratamento do Token... apenas para testes
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NSwibmFtZSI6IlJvYmVydG8iLCJlbWFpbCI6InJvYmVydG9AZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU3MzczNzMwOSwiZXhwIjoxNTczOTk2NTA5fQ.8Y31YjuJgLZXyQy0UBZuwHtXeLVQu1heWN-qfh0RKA4'
require('axios').defaults.headers.common['Content-Type'] = 'application/json'


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')