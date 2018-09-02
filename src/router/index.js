import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Item from '@/components/Item'
import User from '@/components/User'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueResource from 'vue-resource';
import VueSession from 'vue-session'


Vue.use(Router)
Vue.use(VueResource)
Vue.use(VueSession)
//Vue.use(VueAxios)
//Vue.use(axios)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/item',
      name: 'Item',
      component: Item
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    
  ]
})
