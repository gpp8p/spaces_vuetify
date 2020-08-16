import Vue from 'vue'
import VueRouter from 'vue-router'
import Foo from '../components/Foo.vue'
import Bar from '../components/Bar.vue'
import gridLayout from "../components/gridLayout";
import Dtable from "../components/dtable.vue";

Vue.use(VueRouter)

  const routes = [


    {
      path: '/edit',
      name: 'edit',
      component: gridLayout

    },
    {
       path: '/table',
      name: 'table',
      component: Dtable
    },
    {
      path: '/displayLayout',
      name: 'foo',
      component: Foo
    },
    {
      path: '/Bar',
      name: 'bar',
      component: Bar
    },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
