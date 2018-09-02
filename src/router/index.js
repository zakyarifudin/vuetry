import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Item from '@/components/Item'

Vue.use(Router)

export default new Router({
  mode: 'history',
  bas: __dirname,
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
    
  ]
})
