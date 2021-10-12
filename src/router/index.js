import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import Category from '../views/Category.vue'
import AddCategory from '../views/AddCategory.vue'
import EditCategory from '../views/EditCategory.vue'
import Transaksi from '../views/Transaksi.vue'
import About from '../views/About.vue'
import detail_transaksi from '../views/detail_transaksi.vue'
import AddProduct from '../views/AddProduct.vue'
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
    path: '/EditCategory',
    name: 'EditCategory',
    component: EditCategory
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
