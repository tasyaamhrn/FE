<template>
  <div class="container">
    <div class="home">
      <h1>BERANDA</h1>
      <div class="choose-store mt-2">
    <div class="col-md-12">
                    <div class="form-group">
                        <select v-model="store_id" class="form-control" @change="getChartData()">
                            <option value="">Pilih Toko</option>
                            <option :value="store.store.id" v-for="(store, index) in stores" :key="index">
                                {{ store.store.name }}
                            </option>
                        </select>
                    </div>
                </div>
  </div>
      <div class="btn-filter">

        <button type="button" class="btn btn-outline-primary">Hari Ini</button>
        <button type="button" class="btn btn-outline-primary">Minggu Ini</button>
        <button type="button" class="btn btn-outline-primary">Bulan Ini</button>
      </div>
 
      <div class="container hasil">
        <div class="row hsl">
          <div class="col-md-6">
            <p class="omset">Omset</p>
            <p class="pendapatan"> {{omset}}</p>
            <p class="transaksi">4 Transaksi</p>
          </div>
          <div class="col-md-6">
            <div class="app">
              <p class="tanggal">
                {{currentDateTime()}}
                
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="tren-transaksi">
          <h2>Tren Transaksi</h2>
          <transaction-chart></transaction-chart>

        </div>
      </div>
      <div class="container">
        <div class="kategori">
          <h2>Kategori paling sering dibeli</h2>
          <category-chart></category-chart>
        </div>
      </div>
      <div class="container">
        <div class="produk">
          <h2>Produk paling sering dibeli</h2>
          <product-chart></product-chart>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
  import CategoryChart from './Chart/CategoryChart.vue'
  import TransactionChart from './Chart/TransactionChart.vue'
  import ProductChart from './Chart/ProductChart.vue'
  export default {
      data() {
            return {
              tanggal: "2021-11-18",
                stores: [],
                store_id: "",
                omset:0
            };
        },
    components: {
      CategoryChart,
      TransactionChart,
      ProductChart
    },
     mounted() {
        this.getStore();
        
      },
    methods: {
      getChartData() {
        this.$root.$refs.productchart.getProduct(this.tanggal, this.store_id);
         this.$root.$refs.categorychart.getCategory(this.tanggal, this.store_id);
         this.getOmset();
      },
      currentDateTime() {
        const current = new Date();
        const date = current.getDate() + '-' + (current.getMonth() + 1) + '-' + current.getFullYear();
        const dateTime = date;

        return dateTime;
      },
       getOmset() {
      axios
        .get(
          "https://api-kasirin.jaggs.id/api/stats/income?tanggal="+ this.tanggal +"&store_id=" + this.store_id,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        )
        .then((res) => {
          // const { data } = res.data;
          // const data = res.data.data;
          this.omset = res.data.data;
          
          

         
        })
        .catch((err) => {
          console.log(err);
        });
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
                      console.log(res)
                        this.stores = res.data.data;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
    }
  };
</script>

<style scoped>
  h2 {
    color: black;
    font-size: 18px;
    text-align: center;
    font-family: Poppins;
    padding-top: 20px;

  }

  h3 {
    color: #FFD700;
    margin: auto;
    font-size: 16px;
    text-align: center;
    padding-top: 100px;


  }

  /* *{
  
  font-family: Arial, Helvetica, sans-serif;
} */
  h1 {
    font-family: Arial, Helvetica, sans-serif;
    color: #4CAF50;
    font-size: 18px;
    font-weight: bold;
    padding-top: 75px;
    /* margin-left:30px; */
  }

  .home .tren-transaksi,
  .kategori,
  .produk {
    /* width:650px; */
    height: auto;
    box-shadow: 2px 2px 2px 2px rgba(193, 193, 193, 0.8);
    background-color: #fff;
    margin-top: 40px;
    border-radius: 25px;
    /* margin-left:10px; */

  }

  .home button {
    margin-left: 5px;
    border-radius: 10px;
    border: 1px solid #4CAF50;
    color: #1E6E22;
    /* margin: auto; */

  }

  .home button:hover {
    background-color: #1E6E22;
    color: #fff;
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
    padding-top: 20px;

    padding-left: 11px;
  }

  .home .hasil .pendapatan {
    font-size: 20px;
    color: #fff;
    font-weight: bold;
    padding-left: 11px;
    padding-top: -10px;
  }

  .home .hasil .transaksi {
    font-size: 18px;
    color: #fff;
    font-weight: 200px;
    margin-bottom: 69px;
    padding-left: 11px;
  }

  .home .hasil .tanggal {
    font-size: 18px;
    color: #fff;
    padding-top: 60px;
    padding-left: 200px;

  }
</style>