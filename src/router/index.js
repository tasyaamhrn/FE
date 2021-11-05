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
import Pembelian from '../views/Pembelian.vue'
//store
import Store from '../views/Store/Store.vue'
import AddStore from '../views/Store/AddStore.vue'
import EditStore from '../views/Store/EditStore.vue'
//endofstore
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
    path: '/product',
    name: 'Product',
    component: Product
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/addcategory',
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
    path: '/addtransaksi',
    name: 'AddTransaksi',
    component: AddTransaksi
  },
  {
    path: '/call',
    name: 'Call',
    component: Call
  },
  {
    path: '/detailproduct',
    name: 'DetailProduct',
    component: DetailProduct
  },
  {
    path: '/editproduct',
    name: 'EditProduct',
    component: EditProduct
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/store',
    name: 'Store',
    component: Store
  },
  {
    path: '/addstore',
    name: 'AddStore',
    component: AddStore
  },
  {
    path: '/editstore/:id',
    name: 'EditStore',
    component: EditStore
  },
  {
    path: '/pembelian',
    name: 'Pembelian',
    component: Pembelian
  },
  // {
  //   path: '/EditStore',
  //   name: 'EditStore',
  //   component: EditStore
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
