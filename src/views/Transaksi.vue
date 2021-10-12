<template>
  <div class="container">
    <div class="home">
      <h1>TRANSAKSI</h1>
      <div class="container hasil">
        <div class="row hsl">
          <div class="col-md-6">
            <p class="omset">Omset</p>
            <p class="pendapatan"> Rp.1. 234.567,00</p>
            <p class="transaksi">123 Transaksi</p>
            <p class="omset-bulanan">Total omset bulan
              {{myFunction()}} :
            </p>

          </div>
          <div class="col-md-6">
            <div class="app">
              <p class="tanggal">
                {{currentDateTime()}}
              </p>
              <p class="total-omset"> Rp.1. 234.567,00</p>
            </div>
          </div>
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

            <router-link to="">
              <li class="list-group-item list-group-item-action"><i class='bx bx-bar-chart-alt'></i><span class="jml">Rp10.000</span>
              <span class="waktu">10.00</span>
              <p>1 item</p></li>
            </router-link>
            <router-link to="">
              <li class="list-group-item list-group-item-action"><i class='bx bx-bar-chart-alt'> </i><span class="jml">Rp25.000</span>
               <span class="waktu">13.00</span>
              <p>1 item</p></li>
            </router-link>
            <router-link to="">
              <li class="list-group-item list-group-item-action"><i class='bx bx-bar-chart-alt'> </i><span class="jml">Rp10.000</span>
               <span class="waktu">13.10</span>
              <p>1 item</p></li>
            </router-link>

          </div>

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
      }
    }
  };
</script>

<style scoped>
  .search {

    border-radius: 10px;
    background-color: #4CAF50;
    width: 35%;

    height: 30px;
    color: white;
    border-color: transparent;
  }
.list-transaksi{
  padding-top:20px;
}
.list-transaksi i{
     color: #4CAF50;
     font-size: 18px;
     font-weight: bold;
}
.list-transaksi p{
  color: gray;
}
.list-transaksi .jml{
  color: black;
  font-weight: bold;

}
.list-transaksi .waktu{
  float:right;
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
    color: #4CAF50;
    font-weight: bold;
  }

  .filter-btn {
    margin-top: 35px;

  }


  h1 {
    font-family: Arial, Helvetica, sans-serif;
    color: #4CAF50;
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