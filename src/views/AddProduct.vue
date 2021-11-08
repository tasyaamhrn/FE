<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <button @click="product" type="button" class="btn btn-success btn-lg">
            Tambah
          </button>
          <!-- <label>TAMBAH PRODUK</label> -->
        </div>
        <div class="col-md-6">
          <div class="kembali">
            <router-link to="product">
              <button type="button">
                &#8592; Kembali
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <p class="judul1">
        Nama Produk/Layanan
      </p>
      <input-form :errors="errors.name">
        <template v-slot:form>
          <input class="form-control" id="namaproduk" type="text" placeholder="Masukkan Nama Barang"
            v-model="form.name" />
        </template>
      </input-form>
     
      <p class="judul">
        Foto Produk/Layanan
      </p>
      <input-form :errors="errors.image">
        <template v-slot:form>
          <input type="file" accept="image/*" class="form-control" @change="onImageSelected" />
        </template>
      <select class="form-control"></select>
      </input-form>
      <p class="judul">
         Toko
      </p>
      <div class="form-group" style="margin-left:30px;">
          <select v-model="store_id" class="form-control" @change="getCategory">
              <option value="">Pilih Toko</option>
              <option :value="store.store.id" v-for="(store, index) in stores" :key="index">
                {{ store.store.name }}
              </option>
            </select>
          </div>
          <p class="judul">
         Kategori
          </p>
        <div class="form-group" style="margin-left:30px;">
            <select class="form-control" v-model="form.category_id">
              <option value="">Pilih Kategori</option>
              <option
                v-for="item in categories" :key="item.id"
                 :value="item.id"
              >
               {{ item.name }}
              </option>
            </select>
          </div>
      <p class="judul">
        Harga Produk/Layanan
      </p>
      <input-form :errors="errors.price">
        <template v-slot:form>
          <input class="form-control" id="namaproduk" type="text" placeholder="Masukkan Harga Barang"
            v-model="form.price" />
        </template>
      </input-form>
      <p class="judul">
        Stock Produk/Layanan
      </p>
      <input-form :errors="errors.stock">
        <template v-slot:form>
          <input class="form-control" id="stockproduk" type="int" placeholder="Masukkan Stock Barang"
            v-model="form.stock" />
        </template>
      </input-form>
      <p class="judul">
        Barcode Produk/Layanan
      </p>
      <input-form :errors="errors.barcode">
        <template v-slot:form>
          <input class="form-control" id="barcodeproduk" type="int" placeholder="Masukkan Nomor Barcode"
            v-model="form.barcode" />
        </template>
      </input-form>
    </div>
  </div>
</template>
<style scoped>
  .col-md-6 {
    padding-left: 45px;
  }

  .tambahproduk {
    width: 100%;
  }

  label {
    padding-top: 90px;
    margin-bottom: 15px;
    color: #4caf50;
    font-size: 20px;
    font-weight: bold;
    font-family: sans-serif;
  }
  button {
    font-size: 16px;
    margin-top: 90px;
    border-radius: 15px;
    background-color: #376caf;
    width: 150px;
    height: 40px;
    color: white;
    border-color: transparent;
  }

  .kembali {
    font-size: 16px;
    text-align: right;
  }

  .judul {
    padding-left: 28px;
    color: #4caf50;
    font-family: sans-serif;
    font-size: 18px;
    margin-bottom: 5px;
  }

  .judul1 {
    padding-left: 28px;
    padding-top: 20px;
    color: #4caf50;
    font-family: sans-serif;
    font-size: 18px;
    margin-bottom: 5px;
  }
</style>
<script>
  import axios from "axios";
  import InputForm from "../components/inputForm.vue";
import { mapGetters } from "vuex";
import Swal from 'sweetalert2';
export default {
     computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn",
      user: "user",
    }),
  },
    data() {
      return {
        form: {
          name: "",
          category_id: "",
          image: "",
          price: "",
          stock: "",
          barcode: "",
        },
         store_id: "",
         stores: [],
        errors: [],
        categories:{},
      };
    },
    components: {
      InputForm
    },
    methods: {
      onImageSelected(event) {
        this.form.image = event.target.files[0];
      },
       getStore() {
        axios
          .get(
            "https://api-kasirin.jaggs.id/api/user-stores?user_id=" +
            localStorage.getItem("id"), {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
              },
            }
          )
          .then((res) => {
            this.stores = res.data.data;
          })
          .catch((err) => {
            console.log(err);
          });
      },
       getCategory(){
         axios
        .get("https://api-kasirin.jaggs.id/api/category?store_id=" + this.store_id, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
          }
        })
        .then(({
          data
        }) => {
          this.categories = data.data;
          
        })
        .catch((err) => {
          console.log(err)
        });
    },
      product() {
        let formData = new FormData();
        formData.set("name", this.form.name);
        formData.set("category_id", this.form.category_id);
        formData.set("image", this.form.image);
        formData.set("price", this.form.price);
        formData.set("stock", this.form.stock);
        formData.set("barcode", this.form.barcode);
        axios
          .post("https://api-kasirin.jaggs.id/api/product/store", formData)
          .then((res) => {
            Swal.fire("Berhasil", res.data.message, "success");
            console.log(res);
            this.$router.push({
              name: "Product",
            });
          })
          .catch((err) => {
            this.errors = err.response.data;
              Swal.fire("Gagal", err.data.message, "warning");
          });
      },
    },
    mounted() {
      this.getStore();
    },
  };
</script>