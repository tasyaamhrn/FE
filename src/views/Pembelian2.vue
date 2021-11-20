<template>
  <div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-6">
          <h3>PRODUK</h3>
        </div>
        <div class="col-md-6">
          <div class="tambah">
            <!-- <router-link to="AddProduct">
              <button type="button" class="button">+Tambah</button>
            </router-link> -->
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
              v-model="form.store_id"
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
    <div class="container" v-if="form.store_id">
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>Pilih Kategori</label>
            <select class="form-control" v-model="category_id">
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
            <label>Cari Produk</label>
            <input
              class="form-control"
              type="text"
              placeholder="Masukkan Nama Barang"
              v-model="product_name"
              @change="getData"
            />
            <div class="tambah">
              <button id="cari" type="button" @change="getData" class="button">
                CARI
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-if="product_name">
      <div class="container-product2">
        <div class="col-makan">
          <div class="row">
            <div class="col-md-3" v-for="p in products" :key="p.id">
              <div
                class="container-barang"
                data-toggle="modal"
                data-target="#myModal"
              >
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="myModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        data-backdrop="false"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" v-for="p in products" :key="p.id">
              <img :src="p.image_url" style="width: 20%" alt="Product Image" />
              <p class="makanan">
                {{ p.name }} <br />
                {{ p.price }} <br />
                Stok:{{ p.stock }}
              </p>
              <div id="vue-counter">
                <p id="tambah">
                  <i class="bx bx-minus" @click="decrease(p.price, p.id)"></i>

                  &nbsp;&nbsp;
                  {{ counter }}
                  &nbsp;&nbsp;
                  <i
                    class="bx bx-plus"
                    @click="increase(p.price, p.id)"
                    v-if="p.stock > counter"
                  ></i>
                </p>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                id="hapus"
                class="btn btn-danger btn-lg center-block"
              >
                <i class="bx bx-minus-circle" data-dismiss="modal">Batal</i>
              </button>

              <button
                type="button"
                id="edit"
                class="btn btn-primary btn-lg center-block"
              >
                <i class="bx bx-check" data-dismiss="modal">Pilih</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" id="hargaproduk">
      <div class="row">
        <div class="col-md-12" v-for="p in products" :key="p.id">
          <label for="examplePriceProduct" class="form-label"
            >Harga Produk</label
          >
          <input type="text" class="form-control" v-model="p.price" />
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label for="exampleBarcodeProduct" class="form-label">Jumlah</label>
            <input type="number" v-model="counter" class="form-control" />
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label for="exampleBarcodeProduct" class="form-label"
              >Total Harga</label
            >
            <input
              type="number"
              v-model="total"
              class="form-control"
              readonly
            />
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <label for="exampleBarcodeProduct" class="form-label">Diskon</label>
          <input
            type="number"
            class="form-control"
            id="exampleBarcode"
            v-model.number="discount"
            @input="hitung"
            placeholder="Masukkan Potongan Harga"
          />
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <label for="exampleBarcodeProduct" class="form-label">
            Setelah Diskon</label
          >
          <input type="number" class="form-control" v-model="after_discount" />
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <label for="exampleStockProduct" class="form-label">Bayar</label>
          <input
            type="text"
            class="form-control"
            @input="kembalian"
            v-model="form.pay"
            id="exampleStockProduct"
            placeholder="Masukkan Nominal Pembayaran"
          />
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <label for="exampleBarcodeProduct" class="form-label"
            >Kembalian</label
          >
          <input
            type="integer"
            class="form-control"
            id="exampleBarcode"
            v-model="change"
            placeholder="Kembalian Pelanggan"
          />
        </div>
      </div>
    </div>
    <button @click="save(); sisa(); refresh();" type="button" class="btn btn-success">
      Tambah Transaksi
    </button>
    <router-link :to="{ name: 'Producttampiltransaksi' }">
                            <button type="button" class="btn btn-success" id="tampiltransaksi">
                                Tampil Transaksi
                            </button>
    </router-link>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "CreateTransaction",
  data() {
    return {
      products: [],
      category_id: "",
      product_name: "",
      stock: "",
      stores: [],
      categories: [],
      counter: 0,
      total: 0,
      change: 0,
      after_discount:0,
      after_transaksi:0,
      form: {
        price: 0,
        pay: 0,
        discount: 0,
        change: 0,
        store_id: "",
        products: [
          {
            product_id: "",
            qty: "",
          },
        ],
      },
    };
  },
  mounted() {
    this.load();
  },
  updated() {
    if (!this.form.store_id) {
      this.category_id = "";
      if (!this.category_id) {
        this.form.store_id = "";
      }
      if (!this.product_name) {
        this.product_name = "";
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
        .get(
          "https://api-kasirin.jaggs.id/api/product",
          {
            params: {
              name: this.product_name,
              category_id: this.category_id,
            },
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        )
        .then((res) => {
          this.products = res.data.data;
          this.stock = res.data.data.stock;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCategory() {
      axios
        .get(
          "https://api-kasirin.jaggs.id/api/category?store_id=" + this.form.store_id,
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
    increase(harga, id) {
      this.counter++;
      this.form.price = harga;
      this.form.products[0].product_id = id;
      this.form.products[0].qty = this.counter;
      this.total = this.form.price * this.counter;
    },
    decrease(harga, id) {
      if (this.counter <= 0) {
        Swal.fire("Angka Tidak Valid", "", "warning");
      } else {
        this.counter--;
        this.form.price = harga;
        this.form.products[0].product_id = id;
        this.form.products[0].qty = this.counter;
        this.total = this.form.price * this.counter;
      }
    },
    hitung() {
      this.after_discount = this.total - this.discount;
    },
    kembalian() {
      this.change = this.form.pay - this.after_discount;
    },
    sisa(){
      this.after_transaksi = this.stock - this.counter;
    },
    save() {
      axios
        .post("https://api-kasirin.jaggs.id/api/transaction", this.form, {
          headers: {
            Authorization: "Bearer " + localStorage.access_token,
          },
        })
        .then(() => {
          this.alertSuccess();
         
          this.$router.push({
            name: "Pembelian2",
            
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    refresh(){
this.change = "",
this.form.pay = "",
this.after_discount="",
this.discount="",
this.total="",
this.p.price="",
this.counter=""
    },
    alertSuccess() {
      // Use sweetalert2
      this.$swal({
        type: "success",
        title: "Success",
        text: "Transaksi berhasil ditambahkan",
      });
    },
    alertError() {
      // Use sweetalert2
      this.$swal({
        type: "error",
        title: "Oops...",
        text: "Transaksi gagal ditambahkan, silahkan coba lagi",
      });
    },
  },
};
</script>

<style scoped>
#tampiltransaksi{
  margin-left: 17px;
}
#hargaproduk {
  padding-top: 20px;
}
#tambah {
  padding-top: 30px;
}

#edit {
  margin-right: 150px;
  background-color: #4caf50;
}
.btn-success {
  margin-left: 80px;
  margin-top: 10px;
}

#hapus {
  margin-left: 120px;
  background-color: #fd7b7b;
}

.modal-body {
  color: #4caf50;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
}

.modal-body .makanan {
  float: left;
}

.modal-body img {
  float: left;
}

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

#cari {
  margin-top: 20px;
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
