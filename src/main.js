// Import ES6 Promise
import 'es6-promise/auto'

// Import System requirements
import Vue from 'vue'
import VueRouter from 'vue-router'
import Axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate'
// import VueSpinners from 'vue-spinners'
/* Conflicto se sobreescriben clases
import 'bootstrap/dist/css/bootstrap.css' */
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { sync } from 'vuex-router-sync'
import routes from './routes'
import store from './store'
import moment from 'moment'
// Import Helpers for filters
import { domain, count, prettyDate, pluralize } from './filters'

// Import Views - Top level
import AppView from './components/App.vue'




// Import Install and register helper items
Vue.use(VeeValidate)
// Vue.use(VueSpinners)
Vue.filter('spanishDate', function(value) {
  if (value == null) {
    return 'No definido'
  }
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
})

Vue.filter('spanishTime', function(value) {
  if (value == null) {
    return 'No definido'
  }
  if (value) {
    return moment(String(value)).format('hh:mm A')
  }
})

Vue.filter('spanishDateTime', function(value) {
  if (value == null) {
    return 'No definido'
  }
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY - HH:mm')
  }
})

Vue.filter('cardinalityUpper', function(number) {
  switch (number) {
    case 1:
      
      return 'primera'.toUpperCase();
    case 2:
      
      return 'segunda'.toUpperCase();
    case 3:
    
      return 'tercera'.toUpperCase();
  
    default:
      return 'primera'.toUpperCase();
  }
})
Vue.filter('cardinality', function(number) {
  switch (number) {
    case 1:
      
      return 'primera';
    case 2:
      
      return 'segunda';
    case 3:
    
      return 'tercera';
  
    default:
      return 'primera';
  }
})
Vue.filter('currency', function(value) {
  return Number(Math.round(parseFloat(value) + 'e2') + 'e-2').toFixed(2)
})

Vue.filter('count', count)
Vue.filter('domain', domain)
Vue.filter('prettyDate', prettyDate)
Vue.filter('pluralize', pluralize)

Vue.directive('digitsonly', {
  bind(el, binding, vnode) {
    el.addEventListener('keydown', e => {
      
      if (
        [46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && e.ctrlKey === true) ||
        // Allow: Ctrl+V
        (e.keyCode === 86 && e.ctrlKey === true) ||
        // Allow: Ctrl+C
        (e.keyCode === 67 && e.ctrlKey === true) ||
        // Allow: Ctrl+V
        (e.keyCode === 86 && e.ctrlKey === true) ||
        // Allow: Ctrl+X
        (e.keyCode === 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)
      ) {
        // let it happen, don't do anything
        return
      }
      // Ensure that it is a number and stop the keypress
      if (
        (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
        (e.keyCode < 96 || e.keyCode > 105)
      ) {
        e.preventDefault()
      }
    })
  }
})

Vue.directive('digitsonly-cellphone', {
  bind(el, binding, vnode) {
    el.addEventListener('keydown', e => {
      console.log("En digits only")
      console.log(e.keyCode);
      
      if (
        [46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && e.ctrlKey === true) ||
        // Allow: Ctrl+V
        (e.keyCode === 86 && e.ctrlKey === true) ||
        // Allow: Ctrl+C
        (e.keyCode === 67 && e.ctrlKey === true) ||
        // Allow: Ctrl+V
        (e.keyCode === 86 && e.ctrlKey === true) ||
        // Allow: Ctrl+X
        (e.keyCode === 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)
      ) {
        // let it happen, don't do anything
        return
      }
      // Ensure that it is a number and stop the keypress
      if (
        (e.shiftKey || ( (e.keyCode < 48 || e.keyCode > 57) && e.keyCode != 107)) &&
        (e.keyCode < 96 || e.keyCode > 105)
      ) {
        e.preventDefault()
      }
    })
  }
})

Vue.directive('floatonly', {
  bind(el, binding, vnode) {
    el.addEventListener('keydown', e => {
      if (
        [46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && e.ctrlKey === true) ||
        // Allow: Ctrl+V
        (e.keyCode === 86 && e.ctrlKey === true) ||
        // Allow: Ctrl+C
        (e.keyCode === 67 && e.ctrlKey === true) ||
        // Allow: Ctrl+V
        (e.keyCode === 86 && e.ctrlKey === true) ||
        // Allow: Ctrl+X
        (e.keyCode === 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)
      ) {
        // let it happen, don't do anything
        return
      }
      // Ensure that it is a number and stop the keypress
      if (
        (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
        (e.keyCode < 96 || e.keyCode > 105)
      ) {
        e.preventDefault()
      }
    })
  }
})

/*PUSHER*/
// import Echo from 'laravel-echo'
// window.Pusher = require('pusher-js')


// window.Pusher.log = function(message) {
//   window.console.log(message)
// }


// window.Echo = new Echo({
//   broadcaster: 'pusher',
//   key: 'dd2c47e512b958a7b270',
//   authEndpoint: '/pusher/auth',
//   cluster: 'us2',
//   encrypted: true
// })
/* END PUSHER*/

Vue.use(VueRouter)
Vue.use(Axios)

Vue.use(BootstrapVue)
// Routing logic
var router = new VueRouter({
  mode: 'history',
  routes: routes,
  linkExactActiveClass: 'active',
  scrollBehavior: function(to, from, savedPosition) {
    return (
      savedPosition || {
        x: 0,
        y: 0
      }
    )
  }
})

//Configuración del Middleware
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index]
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters)
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1)
    subsequentMiddleware({ ...context, next: nextMiddleware })
  }
}

router.beforeEach((to, from, next) => {
  console.log('Entrando a middleware')
  console.log(to.path)

  if (to.meta.middleware) {
    console.log('Encontro el middleware')

    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware]

    const context = {
      from,
      next,
      router,
      to
    }
    const nextMiddleware = nextFactory(context, middleware, 1)

    return middleware[0]({ ...context, next: nextMiddleware })
  }
  console.log('No encontro middleware')
  return next()
})

import { notificationService } from '@/services/notification.service'
sync(store, router)

// Check local storage to handle refreshes
if (window.localStorage) {
  var localUserString = window.localStorage.getItem('user') || 'null'
  var localUser = JSON.parse(localUserString)
  console.log('Handle refreshes')

  console.log(localUser)

  if (localUser && store.state.user !== localUser) {

    console.log("Existe un User en el LocalStorage");

    store.commit('SET_USER', localUser)
    store.commit('SET_TOKEN', window.localStorage.getItem('token'))
    console.log("Vamos a traer notificaciones");
    
    notificationService.getCurrentNotifications(localUser.attributes.profile.id, null)

  }
  else{
    console.log("No hay User en el LocalStorage")
  }
}

export const eventBus = new Vue();

// Start out app!
// eslint-disable-next-line no-new
new Vue({
  el: '#root',
  router: router,
  store: store,
  render: h => h(AppView)
})

// change this. demo
window.bugsnagClient = window.bugsnag('02fe1c2caaf5874c50b6ee19534f5932')
window.bugsnagClient.use(window.bugsnag__vue(Vue))
