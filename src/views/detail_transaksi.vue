<template>
  <div class="container">
    <div class="detail">
      <h1>DETAIL TRANSAKSI</h1>
      <div class="daftar-produk">
        <label>Daftar Produk Dibeli</label>
        <div class="list-group produk">
          <li class="list-group-item list-group-item-action" v-for="item in detail_transaction" :key="item.id">
            <ul><img :src="item.product.image_url" /></ul>
            <br>
            <ul class="nama">
              {{ item.product.name }}
            </ul>
            <br>
            <ul class="jml">Rp. {{formatPrice(item.product.price)}}</ul>
            <ul class="jml-produk">{{ item.qty }} item</ul>
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
                <p class="transaksi2">Diskon</p>
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
                <p class="transaksi">Rp. {{ formatPrice(total) }}</p>
              </span><br />
              <span>
                <p class="transaksi" v-for="(item) in detail_transaction" :key="item.id">Rp. {{formatPrice(item.transactions.discount)}}
                </p>
              </span><br />
              <span>
                <p class="transaksi" v-for="(item) in detail_transaction" :key="item.id">Rp. {{formatPrice(item.transactions.pay)}}</p>
              </span><br />
              <span>
                <p class="transaksi" v-for="(item) in detail_transaction" :key="item.id">Rp. {{formatPrice(item.transactions.change)}}
                </p>
              </span><br />
              <span>
                <p class="transaksi">
                  {{ moment(detail_transaction[0].created_at).locale('id').format('DD MMMM YYYY HH:mm:ss') }}</p>
              </span><br />
              <!-- <button @click="makePDF" type="button" class="btn btn-success btn-lg">
                Cetak Struk
              </button> -->
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
  import html2canvas from 'html2canvas';
  import jsPDF from 'jspdf';
  export default {
    data() {
      return {
        stores: [],
        total: 0,
        transaction: [{
          id: "",
        }],
        store_id: "",
        counter: "",
        tanggal: "",
        detail_transaction: [{
          product_id: "",
          qty: "",
          transaction_id: "",
          price: "",
          pay: "",
          discount: "",
          change: "",
          product: [{
            name: "",
            image_url: "",
            stock: "",
          }],
        }],
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
      formatPrice(value) {
        let val = (value / 1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
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
      getTransaksi() {
        axios
          .get(
            "http://127.0.0.1:8000/api/transaction?tanggal=&store_id=" + this.tanggal + this
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
        const url = `http://127.0.0.1:8000/api/detail-transaction?transaction_id=${this.$route.params.id}`;
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
              .delete("http://127.0.0.1:8000/api/karyawan/delete/" + id)
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
      makePDF(){
        window.html2canvas = html2canvas;
        var doc = new jsPDF("p", "pt", "a4");
        doc.html(document.querySelector(".container"), {
          callback: function(pdf){
            pdf.save("mypdf.pdf");
          }
        });
      }
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
    color: #5D9EFE;
    font-size: 18px;
    font-weight: bold;
    padding-top: 75px;
    /* margin-left:30px; */
  }

  .produk {
    padding-top: 20px;
  }

  .produk i {
    color: #5D9EFE;
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