<template>
  <div class="container">
    <div class="detail">
      <h1>DETAIL TRANSAKSI</h1>
      <div class="daftar-produk">
        <label>Daftar Produk Dibeli</label>
        <div class="list-group produk">
          <li class="list-group-item list-group-item-action" v-for="item in detail_transaction" :key="item.id">
            <img :src="item.product.image_url" />
            <span class="nama">
              {{ item.product.name }}
            </span>
            <br />
            <span class="jml">{{
              item.product.price
            }}</span>
            <span class="jml-produk">{{ item.qty }} item</span>
          </li>
        </div>
        <label>Transaksi</label>
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <span>
                <p class="transaksi2">Total Pembelian</p>
              </span><br />
              <span>
                <p class="transaksi2">Bayar</p>
              </span><br />
              <span>
                <p class="transaksi2">Kembalian</p>
              </span><br />
              <span>
                <p class="transaksi2">Waktu</p>
              </span><br />
            </div>
            <div class="col-md-8">
              <span>
                <p class="transaksi">{{ total }}</p>
              </span><br />
              <span>
                <p class="transaksi">{{ total }}</p>
              </span><br />
              <span>
                <p class="transaksi" v-for="(item) in transaction" :key="item.id">{{item.change}}</p>
              </span><br />
              <span>
                <p class="transaksi">{{ moment(detail_transaction[0].created_at).locale('id').format('DD MMMM YYYY HH:mm:ss') }}</p>
              </span><br />
              <button type="button" class="btn btn-success btn-lg">
                Cetak Struk
              </button>
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
  import moment from 'moment';
  export default {
    data() {
      return {
        stores: [],
        total: 0,
        transaction: [{
          id: "",
        }],
        store_id: "",
        price: "",
        pay: "",
        discount: "",
        change: "",
        counter: "",
        tanggal: "",
        detail_transaction: [{
          product_id: "",
          qty: "",
          transaction_id: "",
          product: [{
            name: "",
            image_url: "",
            stock: "",
          }, ],
        }, ],
      };
    },
    mounted() {
      // this.getStore()
      this.getDetailTransaksi();
      this.getTransaksi();
      this.getStore();
    },
    methods: {
      moment: moment,
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
      getTransaksi() {
                axios
                    .get(
                        "https://api-kasirin.jaggs.id/api/transaction?tanggal=&store_id=" + this.tanggal + this
                        .store_id, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("access_token"),
                            },
                        }
                    )
                    .then((res) => {
                        console.log(res);
                        this.transaction = res.data.data;
                    })
                    .catch((err) => {
                        this.transaction = "";
                        Swal.fire(
                            "Anda Belum Mempunyai Transaksi",
                            "Silahkan Tambahkan Transaksi Terlebih Dahulu",
                            "warning"
                        );
                        console.log(err);
                    });
            },
      getDetailTransaksi() {
        const url = `https://api-kasirin.jaggs.id/api/detail-transaction?transaction_id=${this.$route.params.id}`;
        axios
          .get(url, localStorage.getItem("id"), {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          })
          .then((res) => {
            this.detail_transaction = res.data.data;
            this.detail_transaction.forEach(e => {
              this.total += e.qty * e.product.price;
            });
          })
          .catch((err) => {
            console.log(err);
          });
      },
      deleteData(id) {
        Swal.fire({
          title: "Anda Yakin Ingin Menghapus Data Ini ?",
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
              .delete("https://api-kasirin.jaggs.id/api/karyawan/delete/" + id)
              .then((res) => {
                Swal.fire("Terhapus", "Karyawan Anda Sudah Terhapus", "success");
                this.getEmployee();
                console.log(res);
              })
              .catch((err) => {
                Swal.fire("Gagal", "Karyawan Anda Gagal Terhapus", "warning");
                console.log(err);
              });
          } else {
            Swal.fire("Gagal", "Karyawan Anda Gagal Terhapus", "warning");
          }
        });
      },
    },
  };
</script>
<style scoped>
  .col-md-4 {
    padding-left: 0px;
    padding-top: 10px;
  }

  .col-md-8 {
    padding-top: 10px;
  }

  h1 {
    font-family: Arial, Helvetica, sans-serif;
    color: #4caf50;
    font-size: 18px;
    font-weight: bold;
    padding-top: 75px;
    /* margin-left:30px; */
  }

  .produk {
    padding-top: 20px;
  }

  .produk i {
    color: #4caf50;
    font-size: 18px;
    font-weight: bold;
  }

  /* .btn-lg{
    width:45%;
    float:center;
} */
  .produk .nama {
    color: black;
    font-weight: bold;
  }

  .produk .jml {
    color: black;
    font-weight: bold;
    margin-left: 110px;
  }

  .transaksi2 {
    padding-left: -30px;
  }

  .produk .jml-produk {
    float: right;
  }

  img {
    width: 10%;
  }
</style>