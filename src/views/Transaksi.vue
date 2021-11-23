<template>
  <div class="container">
    <div class="home">
      <h1>TRANSAKSI</h1>
      <!-- <div class="container hasil">
        <div class="row hsl">
          <div class="col-md-6">
            <p class="omset">Omset</p>
            <p class="pendapatan">{{omset}}</p>
            <p class="transaksi">5 Transaksi</p>
            <p class="omset-bulanan">Total omset bulan
              {{myFunction()}} :
            </p>

          </div>
          <div class="col-md-6">
            <div class="app">
              <p class="tanggal">
                {{currentDateTime()}}
              </p>
              <p class="total-omset"> Rp. 110.000</p>
            </div>
          </div>
        </div>
        <div class="col-md-12" id="toko">
          <div class="form-group">
            <select v-model="store_id" class="form-control" @change="getTransaksi">
              <option value="">Pilih Toko</option>
              <option :value="store.store.id" v-for="(store, index) in stores" :key="index">
                {{ store.store.name }}
              </option>
            </select>
          </div>
        </div>
      </div> -->
      <div class="col-md-12" id="toko">
        <div class="form-group">
          <select v-model="store_id" class="form-control" @change="getTransaksi">
            <option value="" disabled>Pilih Toko</option>
            <option :value="store.store.id" v-for="(store, index) in stores" :key="index">
              {{ store.store.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-5">
            <div class="filter">
              Tanggal Awal <input type="date" class="form-control" name="tanggal">
            </div>
          </div>
          <div class="col-md-5">
            <div class="filter">
              Tanggal Akhir <input type="date" class="form-control" name="tanggal">
            </div>
          </div>
          <div class="col-md-2">
            <div class="filter-btn">
              <div class="tambah">
                <button type="button" class="search">Cari</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="list-transaksi">
          <div class="list-group">

            <router-link v-for="(item) in transaction" :key="item.id" :to="`/detail_transaksi/${item.id}`">
              <li class="list-group-item list-group-item-action"><i class='bx bx-bar-chart-alt'></i><span
                  class="jml">Rp. {{formatPrice(item.price)}}</span>
                <!-- new Date(item.created_at).toLocaleDateString() -->
                <span class="waktu">{{ new Date(item.created_at).toLocaleString() }}</span>
              </li>
            </router-link>
            <!-- <router-link to="">
              <li class="list-group-item list-group-item-action"><i class='bx bx-bar-chart-alt'> </i><span
                  class="jml">Rp25.000</span>
                <span class="waktu">13.00</span>
                <p>1 item</p>
              </li>
            </router-link>
            <router-link to="">
              <li class="list-group-item list-group-item-action"><i class='bx bx-bar-chart-alt'> </i><span
                  class="jml">Rp10.000</span>
                <span class="waktu">13.10</span>
                <p>1 item</p>
              </li>
            </router-link> -->

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
        stores: [],
        store_id: "",
        omset: 0,
        price: "",
        pay: "",
        discount: "",
        change: "",
        counter: "",
        tanggal: "",
        transaction: [{
          id: "",
        }],
        detail_transaction: [{
          product_id: "",
          qty: "",
          transaction_id: "",
          product: [{
            name: "",
            image_url: "",
            stock: "",
          }]
        }],
      };
    },
    mounted() {
      this.getStore()
      this.getTransaksi()
      this.getDetailTransaksi()
      this.getOmset()
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
      getTransaksi() {
        axios
          .get(
            `https://api-kasirin.jaggs.id/api/transaction?tanggal=${this.tanggal}&store_id=${this.store_id}`, {
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
        axios
          .get(
            "https://api-kasirin.jaggs.id/api/detail-transaction?transaction_id=72",
            localStorage.getItem("id"), {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
              },
            }
          )
          .then((res) => {
            this.detail_transaction = res.data.data;
            this.transaction_id = res.data.data
          })
          .catch((err) => {
            console.log(err);
          });
      },
      currentDateTime() {
        const current = new Date();
        const date = current.getDate() + '-' + (current.getMonth() + 1) + '-' + current.getFullYear();
        const dateTime = date;

        return dateTime;
      },
      myFunction() {
        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";

        var d = new Date();
        var n = month[d.getMonth()];
        var bulan = n;
        return bulan;
      },
      getMonth() {
        const current = new Date();
        const month = (current.getMonth() + 1);
        const monthly = month;
        return monthly;
      },
      getYear() {
        const current = new Date();
        const year = current.getFullYear();
        const years = year;

        return years;
      },
      getOmset() {
        axios
          .get(
            "https://api-kasirin.jaggs.id/api/stats/income/monthly?store_id=" + this.store_id + "&year=" + this
            .getYear() + "&month=" + this.getMonth() + "", {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
              },
            }
          )
          .then((res) => {
            // const { data } = res.data;
            // const data = res.data.data;
            this.omset = res.data.data;
            console.log(res)

          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
  };
</script>

<style scoped>
  #toko {
    padding-top: 20px;
  }

  .search {

    border-radius: 10px;
    background-color: #5D9EFE;
    width: 35%;

    height: 30px;
    color: white;
    border-color: transparent;
  }

  .list-transaksi {
    padding-top: 20px;
  } 

  .list-transaksi i {
    color: #5D9EFE;
    font-size: 18px;
    font-weight: bold;
  }

  .list-transaksi p {
    color: gray;
  }

  .list-transaksi .jml {
    color: black;
    font-weight: bold;

  }

  .list-transaksi .waktu {
    float: right;
  }

  h2 {
    color: grey;
    font-size: 18px;
    text-align: center;
    font-family: Poppins;
    padding-top: 20px;

  }

  .filter {
    margin-top: 15px;
    color: #5D9EFE;
    font-weight: bold;
  }

  .filter-btn {
    margin-top: 35px;

  }


  h1 {
    font-family: Arial, Helvetica, sans-serif;
    color: #5D9EFE;
    font-size: 18px;
    font-weight: bold;
    padding-top: 75px;
    /* margin-left:30px; */
  }



  .home .container .hsl {
    /* width:650px;
  height:150px; */
    background-color: #1E6E22;
    margin-top: 20px;
    border-radius: 25px;
    /* margin-left:10px; */
  }

  .home .hasil .omset {
    font-size: 18px;
    color: #fff;
    font-weight: 200px;
    padding-top: 50px;

    padding-left: 11px;
  }

  .home .hasil .pendapatan {
    font-size: 20px;
    color: #fff;
    font-weight: bold;
    padding-left: 11px;
    padding-top: 30px;
  }

  .home .hasil .transaksi {
    font-size: 18px;
    color: #fff;
    font-weight: 200px;
    margin-bottom: 69px;
    padding-left: 11px;
  }

  .home .hasil .omset-bulanan {
    font-size: 18px;
    color: #fff;
    font-weight: 200px;
    margin-bottom: 69px;
    padding-left: 11px;
  }

  .home .hasil .tanggal {
    font-size: 18px;
    color: #fff;
    padding-top: 100px;
    padding-left: 200px;

  }

  .home .hasil .total-omset {
    font-size: 18px;
    color: #fff;
    padding-top: 100px;
    padding-left: 200px;

  }
</style>