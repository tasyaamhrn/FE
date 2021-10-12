<template>
  <div class="container">
    <div class="home">
      <h1>BERANDA</h1>
      <div class="btn-filter">

        <button type="button" class="btn btn-outline-primary">Hari Ini</button>
        <button type="button" class="btn btn-outline-primary">Minggu Ini</button>
        <button type="button" class="btn btn-outline-primary">Bulan Ini</button>
      </div>
      <div class="container hasil">
        <div class="row hsl">
          <div class="col-md-6">
            <p class="omset">Omset</p>
            <p class="pendapatan"> Rp.1. 234.567,00</p>
            <p class="transaksi">123 Transaksi</p>
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
          <h3>No chart data available</h3>
        </div>
      </div>
      <div class="container">
        <div class="kategori">
          <h2>Kategori paling sering dibeli</h2>
          <h3>No chart data available</h3>
        </div>
      </div>
      <div class="container">
        <div class="produk">
          <h2>Produk paling sering dibeli</h2>
          <h3>No chart data available</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      currentDateTime() {
        const current = new Date();
        const date = current.getDate() + '-' + (current.getMonth() + 1) + '-' + current.getFullYear();
        const dateTime = date;

        return dateTime;
      }
    }
  };
</script>

<style scoped>
  h2 {
    color: grey;
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
    height: 270px;
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