<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-8" style="padding-bottom:25px; margin-top:-25px; padding-left:85.5%;">
          <router-link to="product">
            <button type="button">&#8592; Kembali</button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="col-md-12">
        <div class="wrap-input100 validate-input">
          <input class="input100" v-model="form.name" type="text" name="name"
            placeholder="Silahkan Masukkan Nama Produk Anda">
          <span class="focus-input100"></span>
          <span class="symbol-input100">
            <i class="fas fa-boxes" aria-hidden="true"></i>
          </span>
        </div>
        <the-error :errors="errors.name" class="error"></the-error>

        <div class="wrap-input100 validate-input">
          <input class="input200" type="file" accept="image/*" @change="onImageSelected" name="avatar">
          <span class="focus-input100"></span>
          <span class="symbol-input100">
            <i class="far fa-image" aria-hidden="true"></i>
          </span>
        </div>
        <div id="preview" v-if="url">
          <img v-if="url" :src="url" />
        </div>

        <div class="wrap-input100 validate-input pt-2">
          <select class="input100" v-model="store_id" @change="getCategory">
            <option value="" disabled>Pilih Toko</option>
            <option :value="store.store.id" v-for="(store, index) in stores" :key="index">
              {{ store.store.name }}
            </option>
          </select>
          <span class="focus-input100"></span>
          <span class="symbol-input100">
            <i class="fas fa-store" aria-hidden="true"></i>
          </span>
        </div>
        <the-error :errors="errors.store_id" class="error"></the-error>


        <div class="wrap-input100 validate-input" v-if="store_id">
          <select class="input100" v-model="form.category_id">
            <option value="" disabled>Pilih Kategori</option>
            <option v-for="item in categories" :key="item.id" :value="item.id">
              {{ item.name }}
            </option>
          </select>
          <span class="focus-input100"></span>
          <span class="symbol-input100">
            <i class="fas fa-list-ul" aria-hidden="true"></i>
          </span>
        </div>
        <the-error :errors="errors.category_id" class="error"></the-error>

        <div class="wrap-input100 validate-input">
          <input class="input100" v-model="form.price" type="text" name="name"
            placeholder="Silahkan Masukkan Harga Barang">
          <span class="focus-input100"></span>
          <span class="symbol-input100">
            <i class="fas fa-money-bill-wave" aria-hidden="true"></i>
          </span>
        </div>

        <div class="wrap-input100 validate-input">
          <input class="input100" v-model="form.stock" type="text" name="name"
            placeholder="Silahkan Masukkan Stock Barang">
          <span class="focus-input100"></span>
          <span class="symbol-input100">
            <i class="fas fa-warehouse" aria-hidden="true"></i>
          </span>
        </div>

        <div class="wrap-input100 validate-input">
          <input class="input100" v-model="form.barcode" type="text" name="name"
            placeholder="Silahkan Masukkan Barcode Barang">
          <span class="focus-input100"></span>
          <span class="symbol-input100">
            <i class="fas fa-barcode" aria-hidden="true"></i>
          </span>
        </div>
        <button @click="product" type="button" name="button" class="sv">
          <i class="bx bx-plus"></i> Tambah Produk
        </button>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from "axios";
  // import InputForm from "../components/inputForm.vue";
  import TheError from "../components/ErrorForm.vue";
  import Swal from 'sweetalert2';
  export default {
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
        categories: {},
        url: null,
      };
    },
    components: {
      // InputForm
      TheError
    },
    methods: {
      onImageSelected(event) {
        this.form.image = event.target.files[0];
        this.url = URL.createObjectURL(this.form.image);
      },
      getStore() {
        axios
          .get(
            "http://127.0.0.1:8000/api/user-stores?user_id=" +
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
      getCategory() {
        axios
          .get("http://127.0.0.1:8000/api/category?store_id=" + this.store_id, {
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
          .post("http://127.0.0.1:8000/api/product/store", formData)
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

<style scoped>
  #preview {
    border: 2px dashed grey;
    padding: 1rem;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #preview img {
    width: 30%;
    object-fit: cover;
  }

  .error {
    padding-bottom: 5px;
  }

  .sv {
    margin-top: 20px;
    border-radius: 10px;
    background-color: #5D9EFE;
    float: right;
    /* height: 30px; */
    color: white;
    border-color: transparent;
    font-weight: bold;
  }

  h1 {
    font-family: Arial, Helvetica, sans-serif;
    color: #5D9EFE;
    font-size: 18px;
    font-weight: bold;
    padding-top: 75px;
  }

  .col-md-6 {
    padding-left: 45px;
  }

  .tambahproduk {
    width: 100%;
  }

  .label {
    color: white;
    padding: 10px 18px;
    font-size: 17px;
    border-radius: 10px;
    font-family: Arial, Helvetica, sans-serif;
  }

  .info {
    background-color: #5D9EFE;
  }

  /* Blue */

  button {
    margin-top: 90px;
    border-radius: 15px;
    background-color: #5D9EFE;
    width: 150px;
    height: 40px;
    color: white;
    border-color: transparent;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 25px;

    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
    padding: 0;
    border: none;
  }

  .kembali {
    text-align: right;
  }

  h1 {
    font-family: Arial, Helvetica, sans-serif;
    color: #5D9EFE;
    font-size: 18px;
    font-weight: bold;
    padding-top: 75px;
  }

  .sv {
    margin-top: 20px;
    border-radius: 10px;
    background-color: #5D9EFE;
    float: right;
    /* height: 30px; */
    color: white;
    border-color: transparent;
    font-weight: bold;
  }

  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');

  .img-fluid {
    width: 100%;
  }

  .wrap-input100 {
    position: relative;
    width: 100%;
    z-index: 1;
    margin-bottom: 10px;
  }

  .input100 {
    font-size: 15px;
    line-height: 1.5;
    color: black;

    display: block;
    width: 100%;
    background: whitesmoke;
    height: 50px;
    border-radius: 25px;
    padding: 0 30px 0 68px;
    border: none;
  }


  .focus-input100 {
    display: block;
    position: absolute;
    border-radius: 25px;
    bottom: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    box-shadow: 0px 0px 0px 0px;
    color: rgba(130, 204, 254, 0.8);
  }

  .input100:focus+.focus-input100 {
    -webkit-animation: anim-shadow 0.5s ease-in-out forwards;
    animation: anim-shadow 0.5s ease-in-out forwards;
  }

  @-webkit-keyframes anim-shadow {
    to {
      box-shadow: 0px 0px 70px 25px;
      opacity: 0;
    }
  }

  @keyframes anim-shadow {
    to {
      box-shadow: 0px 0px 70px 25px;
      opacity: 0;
    }
  }

  .symbol-input100 {
    font-size: 15px;

    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    position: absolute;
    border-radius: 25px;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding-left: 35px;
    pointer-events: none;
    color: #666666;

    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
  }

  .input100:focus+.focus-input100+.symbol-input100 {
    color: #82CCFE;
    padding-left: 28px;
  }

  button:hover {
    background: #82CCFE;
    text-decoration: none;
  }

  .judul {
    padding-left: 28px;
    color: #5D9EFE;
    font-family: sans-serif;
    font-size: 18px;
    margin-bottom: 5px;
  }

  .judul1 {
    padding-left: 28px;
    padding-top: 20px;
    color: #5D9EFE;
    font-family: sans-serif;
    font-size: 18px;
    margin-bottom: 5px;
  }

  .input200 {
    font-size: 15px;
    line-height: 2.5;
    color: black;

    display: block;
    width: 100%;
    background: whitesmoke;
    border-radius: 25px;
    padding: 0 30px 0 68px;
  }
</style>