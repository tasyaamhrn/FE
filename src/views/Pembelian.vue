<template>
  <div class="row">
    <div class="col-md-7">
      <div class="col-md-11">
        <div class="form-group ml-4">
          <label>Pilih Toko</label>
          <select v-model="form.store_id" class="form-control" @change="getCategory">
            <option value="" disabled>Pilih Toko</option>
            <option :value="store.store.id" v-for="(store, index) in stores" :key="index">
              {{ store.store.name }}
            </option>
          </select>
        </div>
        <div class="container" v-if="form.store_id">
          <div class="row">
            <div class="col-md-7">
              <div class="form-group">
                <label>Pilih Kategori</label>
                <select class="form-control" v-model="category_id">
                  <option value="" disabled>Pilih Kategori</option>
                  <option v-for="item in categories" :key="item.id" :value="item.id">
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="container" v-if="category_id">
          <div class="row">
            <div class="col-md-7">
              <div class="form-group">
                <label>Cari Produk</label>
                <input class="form-control" type="text" placeholder="Masukkan Nama Barang" v-model="product_name"
                  @change="getData" />
                <div class="tambah">
                  <button id="cari" type="button" @change="getData" class="button">
                    CARI
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-5 float-right">

      <table class="table">

        <thead>
          <tr>

            <th scope="col">Produk</th>
            <th scope="col">Jumlah</th>
            <th scope="col">Harga</th>
            <th scope="col">Subtotal</th>
            <th scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cart in form.products " :key="cart.id">

            <td>{{ cart.product_name }}</td>
            <td>{{ cart.qty }}</td>
            <td>Rp. {{formatPrice(cart.price)}}</td>
            <td>Rp. {{ formatPrice(cart.price * cart.qty) }}</td>
            <td>
              <button type="button" class="btn btn-danger" @click="RemoveCarts(index)">
                Batal
              </button>
            </td>
          </tr>

        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-right font-weight-bold">Total =</td>
            <td class="text-right">Rp. {{ formatPrice(this.form.price) }}/-</td>

          </tr>
        </tfoot>
      </table>

      <!-- <div class="form-group">
        <label for="exampleBarcodeProduct" class="form-label">Jumlah</label>
        <input type="number" v-model="counter" class="form-control" />
      </div> -->

      <button type="button" data-toggle="modal" data-target="#myModal2" class="btn btn-success">CHECKOUT</button>
      <button type="button" style=" margin-left: 17px; margin-top:10px;" class="btn btn-danger"
        @click="DeleteCart(index)">CLEAR</button>
    </div>
    <div class="col-md-7">
      <div id="makanannn">
        <div class="container" v-if="product_name">
          <div class="container-product2">
            <div class="col-makan">
              <div class="row">
                <div class="col-md-7" v-for="p in products" :key="p.id">
                  <div class="container-barang" data-toggle="modal" data-target="#myModal">
                    <center>
                      <img :src="p.image_url" style="width: 20%" alt="Product Image" />
                    </center>
                    <p class="makanan">{{ p.name }}</p>
                    <p class="makanan">Rp. {{ formatPrice(p.price) }}</p>
                    <p class="makanan">Stock : {{ p.stock }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal fade" id="myModal2" tabindex="-1" aria-labelledby="exampleModalLabel" data-backdrop="false"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <label>Pembayaran</label>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <label for="exampleBarcodeProduct" class="form-label">Total Harga</label>
                    <input type="number" v-model="form.price" class="form-control" readonly />
                  </div>
                  <div class="form-group">
                    <label for="exampleBarcodeProduct" class="form-label">Diskon</label>
                    <input type="number" class="form-control" id="exampleBarcode" v-model.number="form.discount"
                      @input="hitung" placeholder="Masukkan Potongan Harga" />
                  </div>
                  <div class="form-group">
                    <label for="exampleBarcodeProduct" class="form-label">
                      Setelah Diskon</label>
                    <input type="number" class="form-control" v-model="after_discount" />
                  </div>
                  <div class="form-group">
                    <label for="exampleStockProduct" class="form-label">Bayar</label>
                    <input type="text" class="form-control" @input="kembalian" v-model="form.pay"
                      id="exampleStockProduct" placeholder="Masukkan Nominal Pembayaran" />
                  </div>
                  <div class="form-group">
                    <label for="exampleBarcodeProduct" class="form-label">Kembalian</label>
                    <input type="integer" class="form-control" id="exampleBarcode" v-model="form.change"
                      placeholder="Kembalian Pelanggan" />
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" id="hapus" class="btn btn-danger btn-lg center-block">
                    <i class="bx bx-minus-circle" data-dismiss="modal">Batal</i>
                  </button>

                  <button @click="save(); sisa(); refresh(); DeleteCart(index);" type="button" id="edit"
                    class="btn btn-primary btn-lg center-block">
                    <i class="bx bx-check" data-dismiss="modal">Bayar</i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" data-backdrop="false"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">

                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>

                </div>
                <div class="modal-body" v-for="p in products" :key="p.id">
                  <img :src="p.image_url" style="width: 20%" alt="Product Image" />
                  <p class="makanan">
                    {{ p.name }} <br />
                    Rp. {{ formatPrice(p.price) }} <br />
                    Stok:{{ p.stock }}
                  </p>
                  <div id="vue-counter">
                    <p id="tambah">
                      <i class="bx bx-minus" @click="decrease(p.price, p.id, p.name)"></i>

                      &nbsp;&nbsp;
                      {{ product_temp.qty }}
                      &nbsp;&nbsp;
                      <i class="bx bx-plus" @click="increase(p.price, p.id, p.name)"
                        v-if="p.stock > product_temp.qty"></i>
                    </p>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" id="hapus" class="btn btn-danger btn-lg center-block">
                    <i class="bx bx-minus-circle" data-dismiss="modal">Batal</i>
                  </button>

                  <button type="button" id="edit" class="btn btn-primary btn-lg center-block">
                    <i class="bx bx-check" @click="AddCarts" data-dismiss="modal">Pilih</i>
                  </button>
                </div>
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
    name: "CreateTransaction",
    data() {
      return {
        products: [],
        product_temp: {
          product_id: null,
          product_name: "",
          price: 0,
          qty: 0,
        },
        category_id: "",
        product_name: "",
        stock: "",
        stores: [],
        categories: [],
        counter: 0,
        after_discount: 0,
        after_transaksi: 0,

        form: {
          price: 0,
          pay: 0,
          discount: 0,
          change: 0,
          store_id: "",

          products: [],
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
      getData() {
        axios
          .get(
            "https://api-kasirin.jaggs.id/api/product", {
              params: {
                name: this.product_name,
                category_id: this.category_id,
              },
            }, {
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
            "https://api-kasirin.jaggs.id/api/category?store_id=" +
            this.form.store_id, {
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
      AddCarts() {
        this.product_temp.price = this.products[0].price;
        this.form.products.push(this.product_temp);
        this.form.price += this.product_temp.qty * this.product_temp.price
        this.product_temp = {
          product_id: null,
          product_name: "",
          qty: 0,
          price: 0,
        }
      },
      RemoveCarts(index) {
        const data = this.form.products[0];
        const total = data.qty * data.price;
        this.form.price -= total;

        // this.form.price -= this.form.products[index].qty * this.form.products[index].price;
        this.form.products.splice(index, 1)
     

      },
      DeleteCart(index) {
        this.form.products.splice(index)
        this.form.price = 0
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
      increase(harga, id, nama) {
        this.product_temp.product_name = nama;
        this.product_temp.product_id = id;
        this.product_temp.price = harga;
        this.product_temp.qty++;
      },
      decrease(harga, id, nama) {
        if (this.product_temp.qty <= 0) {
          Swal.fire("Angka Tidak Valid", "", "warning");
        } else {
          this.product_temp.product_name = nama;
          this.product_temp.product_id = id;
          this.product_temp.price = harga;
          this.product_temp.qty--;
        }
      },
      hitung() {
        this.after_discount = this.form.price - this.form.discount;
      },
      kembalian() {
        this.form.change = this.form.pay - this.after_discount;
      },
      sisa() {
        this.after_transaksi = this.stock - this.product_temp.qty;
      },
      save() {
        axios
          .post("https://api-kasirin.jaggs.id/api/transaction", this.form, {
            headers: {
              Authorization: "Bearer " + localStorage.access_token,
            },
          })
          .then(() => {
            console.log(this.form);
            this.alertSuccess()
            this.$router.push({
              name: "Pembelian",
            });
          })
          .catch((err) => {
            console.log(err.response);
          });
      },
      refresh() {
        (this.change = ""),
        (this.form.pay = ""),
        (this.after_discount = ""),
        (this.form.discount = ""),
        (this.form.price = ""),
        this.form.kembalian = "",
          this.product_name = "";
        // (this.counter = 0);
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
  #tampiltransaksi {
    margin-left: 17px;
  }

  #hargaproduk {
    padding-top: 20px;
  }

  #tambah {
    padding-top: 30px;
  }

  .tbl {
    background-color: #5D9EFE;
    color: white;
  }

  #edit {
    margin-right: 150px;
    background-color: #5D9EFE;
  }

  .btn-success {
    margin-left: 80px;
    margin-top: 10px;
  }

  #hapus {
    margin-left: 120px;
    background-color: #fd7b7b;
  }

  #makanannn {
    margin-top: 0%;
  }

  .modal-body {
    color: #5D9EFE;
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
    color: #5D9EFE;
    font-size: 18px;
    font-weight: bold;
    padding-top: 75px;
  }

  p {
    margin-bottom: 0px;
  }

  .col-md-11 {
    padding-left: 0px;
    padding-top: 70px;
  }

  .col-md-5 {
    padding-top: 70px;
  }

  .makanan {
    font-weight: bold;
    color: black;
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
    color: #5D9EFE;
  }

  .button {
    margin-top: 90px;
    border-radius: 5px;
    background-color: #5D9EFE;
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
    width: 60%;
    height: 80%;
    border-radius: 15px;
    background-color: #5D9EFE;
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