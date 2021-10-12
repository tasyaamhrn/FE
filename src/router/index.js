import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import Category from '../views/Category.vue'
import AddCategory from '../views/AddCategory.vue'
import EditCategory from '../views/EditCategory.vue'
import Transaksi from '../views/Transaksi.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/Product',
    name: 'Product',
    component: Product
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/AddCategory',
    name: 'AddCategory',
    component: AddCategory
  },
  {
    path: '/EditCategory',
    name: 'EditCategory',
    component: EditCategory
  },
  {
    path: '/transaksi',
    name: 'Transaksi',
    component: Transaksi
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
