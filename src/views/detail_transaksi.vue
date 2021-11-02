<template>
  <div class="container">
    <div class="detail">
      <h1>DETAIL TRANSAKSI</h1>
      <div class="daftar-produk">
        <label>Daftar Produk Dibeli</label>
        <div class="list-group produk">

          <router-link to="/detail_transaksi">
            <li class="list-group-item list-group-item-action"><img src="../assets/telur.jpg"><span
                class="nama">Telur</span>
              <br /> <span class="jml">Rp15.000</span>
              <span class="jml-produk">1 item</span>
            </li>
          </router-link>
          <router-link to="/detail_transaksi">
            <li class="list-group-item list-group-item-action"><img src="../assets/beras.png"><span
                class="nama">Beras</span>
              <br /> <span class="jml">Rp60.000</span>
              <span class="jml-produk">1 item</span>
            </li>
          </router-link>
          <router-link to="/detail_transaksi">
            <li class="list-group-item list-group-item-action"><img src="../assets/minyak.jpg"><span class="nama">Minyak
                Goreng</span>
              <br /> <span class="jml">Rp25.000</span>
              <span class="jml-produk">1 item</span>
            </li>
          </router-link>
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
                <p class="transaksi">Rp.100.000</p>
              </span><br />
              <span>
                <p class="transaksi">Rp.100.000</p>
              </span><br />
              <span>
                <p class="transaksi">Rp.0</p>
              </span><br />
              <span>
                <p class="transaksi">9:43,12 Oktober 2021</p>
              </span><br />
              <button type="button" class="btn btn-success btn-lg">Cetak Struk</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
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
    color: #4CAF50;
    font-size: 18px;
    font-weight: bold;
    padding-top: 75px;
    /* margin-left:30px; */
  }

  .produk {
    padding-top: 20px;
  }

  .produk i {
    color: #4CAF50;
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