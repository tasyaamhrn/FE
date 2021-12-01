<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-8">
                    <h1>PRODUK</h1>
                </div>
                <div class="col-md-4">
                    <div class="add">
                        <router-link :to="{ name: 'AddProduct' }"><button type="button" id="btn-add">+ Tambah</button>
                        </router-link>
                    </div>
                </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <select v-model="store_id" class="form-control" @change="getCategory">
              <option value="" disabled>Pilih Toko</option>
              <option :value="store.store.id" v-for="(store, index) in stores" :key="index">
                {{ store.store.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="container-product2" v-for="item in categories" :key="item.id">
        <div class="col-makan">
          <div>
            <h6>{{ item.name }}</h6>
          </div>
          <hr />
          <div class="row">
            <div class="col-md-3" v-for="p in item.product" :key="p.id">
              <div class="container-barang">
                <center>
                  <img :src="p.image_url" class="productimg" alt="Product Image" />
                </center>
                <p class="title">{{ p.name }}</p>
                <p class="stock">Stock : {{ p.stock }} buah</p>
                <p class="price">Rp {{ formatPrice(p.price) }}</p>
                  <center class="pt-2">
                <router-link :to="{ name: 'EditProduct', params: { id: p.id } }">
                  <button type="button" class="btn btn-primary" @click="edit(item)">
                  Edit
                </button>
                </router-link>
                <button type="button" class="btn btn-danger" @click="deleteData(p.id)">
                  Hapus
                </button>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import Swal from "sweetalert2";
  export default {
    data() {
      return {
        products: [],
        store_id: "",
        category_id: "",
        stores: [],
        categories: [],
      };
    },
    mounted() {
      this.getStore();
    },
    methods: {
        formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
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
      getCategory() {
        axios
          .get(
            "https://api-kasirin.jaggs.id/api/category?store_id=" + this.store_id, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
              },
            }
          )
          .then((res) => {
            this.category_id = "";
            this.categories = res.data.data;
          })
          .catch((err) => {
            console.log(err);
          });
      },
      getData() {
        axios
          .get("https://api-kasirin.jaggs.id/api/product", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
            params: {
              category_id: this.category_id,
            },
          })
          .then(({
            data
          }) => (this.products = data.data))
          .catch((err) => {
            console.log(err);

          });
      },
      load() {
        this.getStore();
        this.getCategory();
        this.getData();
      },
      deleteData(id) {
        Swal.fire({
          title: "Anda Yakin Ingin Menghapus Store Ini ?",
          text: "Klik Batal untuk Membatalkan Penghapusan",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Batal",
          confirmButtonText: "Hapus",
        }).then((result) => {
          if (result.value) {
            axios
              .delete("https://api-kasirin.jaggs.id/api/product/delete/" + id)
              .then((res) => {
                Swal.fire("Terhapus", res.data.message, "success");
                this.load();
                console.log(res);
              })
              .catch((err) => {
                Swal.fire("Gagal", "Produk Anda Gagal Terhapus", "warning");
                console.log(err);
              });
          } else {
            Swal.fire("Gagal", "Produk Anda Gagal Terhapus", "warning");
          }
        });
      },
    },
  };
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');

.price{
  font-size: 18px;
  font-family: 'Poppins';
  text-align: center;
  font-weight: bolder;
  color: orangered;
}
.title{
font-family: 'Poppins';
    font-size: 18px;
    color: #333333;
    line-height: 1.2;
    text-align: center;
    width: 100%;
    display: block;
    padding-top:5px ;
}
  /* h3 {
    font-family: Arial, Helvetica, sans-serif;
    color: #5D9EFE;
    font-size: 18px;
    font-weight: bold;
    padding-top: 75px;
  } */
  .productimg{
    width: 80%;
    object-fit: cover;
  }
  h1 {
    font-family: Arial, Helvetica, sans-serif;
    color: #5D9EFE;
    font-size: 18px;
    font-weight: bold;
    padding-top: 75px;
  }

  p {
    margin-bottom: 0px;
  }

  .col-md-6 {
    padding-left: 0px;
  }

  .stock {
    color: black;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
  
  }



  hr {
    border: none;
    height: 3px;
    color: white;
    background-color: white;
  }

  h6 {
    font-size: 20px;
    margin-top: 5px;
    margin-bottom: 0px;
    margin-left: 20px;
    font-family: sans-serif;
    font-weight: bold;
    color: white;
  }

  label {
    color: #5D9EFE;
  }

  .button {
    margin-top: 90px;
    border-radius: 15px;
    background-color: #5D9EFE;
    width: 150px;
    height: 30px;
    color: white;
    border-color: transparent;
  }

  
    .add {
        margin-top: 65px;
        float: right;
        text-align: center;
    }

  #btn-add {
    background-color: #5D9EFE;
    border-color: transparent;
    color: white;
    border-radius: 10px;
    width: 150px;
    height: 40px;
    font-weight: bold;
  }

  .row {
    padding-top: 0px;
    margin: auto;
  }

  .container {
    padding-left: 0px;
  }

  .container-product2 {
    margin-top: 20px;
    padding-top: 40px;
    padding-right: 50px;
    padding-left: 50px;
    width: 98%;
    height: 80%;
    border-radius: 15px;
    background-color: #5D9EFE;
  }

  img {
    width: 150px;
    height: 100px;
    margin-top: 10px;
  }

  .container-barang {
    margin-top: 12px;
    margin-bottom: 20px;
    border-radius: 10px;
    width: 200px;
    height: 230px;
    background-color: white;
    z-index: 1;
  }
</style>