<template>
  <div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-6">
          <h3>PRODUK</h3>
        </div>
        <div class="col-md-6">
          <div class="tambah">
            <router-link to="AddProduct"
              ><button type="button" class="button">
                +Tambah
              </button></router-link
            >
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>Pilih Toko</label>
            <select
              v-model="store_id"
              class="form-control"
              @change="getCategory"
            >
              <option value="">Pilih Toko</option>
              <option
                :value="store.store.id"
                v-for="(store, index) in stores"
                :key="index"
              >
                {{ store.store.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-if="store_id">
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>Pilih Kategori</label>
            <select
              class="form-control"
              v-model="category_id"
              @change="getData"
            >
              <option value="">Pilih Kategori</option>
              <option
                v-for="item in categories"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-if="category_id">
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>Pilih Produk</label>
            <select class="form-control">
              <option value="">Pilih Produk</option>
              <option v-for="item in products" :key="item.id">
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="container-product2">
        <div class="col-makan">
          <!-- <div>
            <h6>{{ item.name }}</h6>
          </div>
          <hr /> -->
          <div class="row">
            <div class="col-md-3" v-for="p in products" :key="p.id">
              <div class="container-barang">
                <center>
                  <img
                    :src="p.image_url"
                    style="width: 20%"
                    alt="Product Image"
                  />
                </center>
                <p class="makanan">{{ p.name }}</p>
                <p class="makanan">{{ p.price }}</p>
                <p class="makanan">Stock : {{ p.stock }}</p>
                <router-link
                  :to="{ name: 'EditProduct', params: { id: p.id } }"
                >
                  <i
                    class="fas fa-edit blue"
                    style="margin-left:35%;"
                    @click="edit(item)"
                  ></i>
                  <!-- <button type="button" style="width:50%;" class="btn btn-primary" @click="edit(item)">
                  Edit
                </button> -->
                </router-link>
                <i
                  class="far fa-trash-alt"
                  style="margin-left:10%; color:red;"
                  @click="deleteData(p.id)"
                ></i>
                <!-- <button type="button" style="width:50%;" class="btn btn-danger" @click="deleteData(p.id)">
                  Hapus
                </button> -->
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
    this.load();
  },
  updated() {
    if (!this.store_id) {
      this.category_id = "";
      if (!this.category_id) {
        this.store_id = "";
      }
    }
  },
  methods: {
    getStore() {
      axios
        .get(
          "https://api-kasirin.jaggs.id/api/user-stores?user_id=" +
            localStorage.getItem("id"),
          {
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
        .then(({ data }) => (this.products = data.data))
        .catch((err) => {
          console.log(err);
        });
    },
    getCategory() {
      axios
        .get(
          "https://api-kasirin.jaggs.id/api/category?store_id=" + this.store_id,
          {
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
              Swal.fire("Gagal", err.data.message, "warning");
              console.log(err);
            });
        } else {
          Swal.fire("Gagal", "Store Anda Gagal Terhapus", "warning");
        }
      });
    },
  },
};
</script>

<style scoped>
h3 {
  font-family: Arial, Helvetica, sans-serif;
  color: #4caf50;
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

.makanan {
  font-weight: bold;
  color: #4caf50;
  text-align: center;
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
  color: #4caf50;
}

.button {
  margin-top: 90px;
  border-radius: 15px;
  background-color: #4caf50;
  width: 150px;
  height: 30px;
  color: white;
  border-color: transparent;
}

.tambah {
  text-align: right;
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
  background-color: #4caf50;
}

img {
  width: 70px;
  height: 70px;
  margin-top: 10px;
}

.container-barang {
  margin-top: 12px;
  margin-bottom: 20px;
  border-radius: 10px;
  width: 130px;
  height: 170px;
  background-color: white;
  z-index: 1;
}
</style>
