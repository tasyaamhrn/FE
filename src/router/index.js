import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import Category from '../views/Category.vue'
import AddCategory from '../views/AddCategory.vue'

import Transaksi from '../views/Transaksi.vue'
import About from '../views/About.vue'
import detail_transaksi from '../views/detail_transaksi.vue'
import AddProduct from '../views/AddProduct.vue'
import AddTransaksi from '../views/AddTransaksi.vue'
import Call from '../views/Call.vue'
import DetailProduct from '../views/DetailProduct.vue'
import EditProduct from '../views/EditProduct.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import AddStore from '../views/AddStore.vue'

Vue.use(VueRouter)


const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,

  },
  {
    path: '/about',
    name: 'About',
    component: About
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
    path: '/transaksi',
    name: 'Transaksi',
    component: Transaksi
  },
  {
    path: '/detail_transaksi',
    name: 'detail_transaksi',
    component: detail_transaksi
  },
  {
    path: '/AddProduct',
    name: 'AddProduct',
    component: AddProduct
  },
  {
    path: '/AddTransaksi',
    name: 'AddTransaksi',
    component: AddTransaksi
  },
  {
    path: '/Call',
    name: 'Call',
    component: Call
  },
  {
    path: '/DetailProduct',
    name: 'DetailProduct',
    component: DetailProduct
  },
  {
    path: '/EditProduct',
    name: 'EditProduct',
    component: EditProduct
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/AddStore',
    name: 'AddStore',
    component: AddStore
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
