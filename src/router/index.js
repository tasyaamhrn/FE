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
import EditCategory from '../views/EditCategory.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Karyawan from '../views/Karyawan/Karyawan.vue'
import AddKaryawan from '../views/Karyawan/AddKaryawan.vue';
import EditKaryawan from '../views/Karyawan/EditKaryawan.vue';

import Pembelian from '../views/Pembelian.vue'
import Pembelian2 from '../views/Pembelian2.vue'
import CobaChart from '../views/CobaChart.vue'
import TampilTransaksi from '../views/tampil_transaksi.vue'
import FAQ from '../views/faq.vue'
import Producttampiltransaksi from '../views/Producttampiltransaksi.vue'
import FAQForm from '../views/faqform.vue'
import ContactUs from '../views/ContactUs.vue'

//langganan
import Langganan from '../views/Langganan/Langganan.vue'
import ListLangganan from '../views/Langganan/ListLangganan.vue'
import AddLangganan from '../views/Langganan/AddLangganan.vue'

//store
import Store from '../views/Store/Store.vue'
import AddStore from '../views/Store/AddStore.vue'
import EditStore from '../views/Store/EditStore.vue'
//endofstore
Vue.use(VueRouter)


const routes = [{
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
    path: '/tampil_transaksi',
    name: 'TampilTransaksi',
    component: TampilTransaksi
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
    path:'/detail_transaksi/:id',
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
    path: '/editproduct/:id',
    name: 'EditProduct',
    component: EditProduct
  },
  {
    path: '/editcategory/:id',
    name: 'EditCategory',
    component: EditCategory
  },
  {
    path: '/pembelian',
    name: 'Pembelian',
    component: Pembelian
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
    path: '/karyawan',
    name: 'Karyawan',
    component: Karyawan
  },
  {
    path: '/addkaryawan',
    name: 'AddKaryawan',
    component: AddKaryawan
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: FAQ
  },
  {
    path: '/faqform',
    name: 'FAQForm',
    component: FAQForm
  },
  {
    path: '/ContactUs',
    name: 'ContactUs',
    component: ContactUs
  },
  {
    path: '/editkaryawan/:id',
    name: 'EditKaryawan',
    component: EditKaryawan
  },
  {
    path: '/langganan',
    name: 'Langganan',
    component: Langganan
  },
  {
    path: '/listlangganan',
    name: 'ListLangganan',
    component: ListLangganan
  },
  {
    path: '/addlangganan/:id',
    name: 'AddLangganan',
    component: AddLangganan
  },
  //   {
  // <<<<<<< HEAD
  //     path: '/pembelian',
  //     name: 'Pembelian',
  //     component: Pembelian
  // =======
  //     path: '/DetailTransaksi',
  //     name: 'DetailTransaksi',
  //     component: DetailTransaksi
  // >>>>>>> db7e227bfa5d3b3995c00101d71cc0c37d624c97
  //   },
  {
    path: '/Pembelian2',
    name: 'Pembelian2',
    component: Pembelian2
  },
  {
    path: '/CobaChart',
    name: 'CobaChart',
    component: CobaChart
  },

  {
    path: '/Producttampiltransaksi',
    name: 'Producttampiltransaksi',
    component: Producttampiltransaksi,

  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router