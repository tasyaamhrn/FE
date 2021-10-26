<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <label>PRODUK</label>
                </div>
                <div class="col-md-6">
                    <div class="tambah">
                        <router-link to="AddProduct"><button type="button">+Tambah</button></router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="cariproduk">
                        <input type="text" class="form-control" placeholder="Cari Produk" aria-label="First name">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="carikategori">
                        <input type="text" class="form-control" placeholder="Cari Kategori" aria-label="Last name">
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
        <div class="container-product2">
            <div class="col-makan">
                <h6 >BARANG POKOK</h6>
                <hr />
                <div class="row">
                    <div class="col-md-3" v-for="item in products" :key="item.id">
                        <div class="container-barang" >
                            <img :src="item.image_url" style="width:20%;" alt="Product Image">
                            <!-- <img src="../assets/beras.png" alt=""> -->
                            <p class="makanan">{{ item.name }}</p>
                            <p class="makanan">{{ item.price }}</p>
                        </div>
                    </div>
                    <!-- <div class="col">
                        <div class="container-barang">
                            <router-link to="DetailProduct">
                                <img src="../assets/miesedap.png">
                            </router-link>
                            <p class="makanan">Mie Sedap <br> 2.500</p>
                        </div>
                    </div>
                    <div class="col">
                        <div class="container-barang">
                            <img src="../assets/telur.jpg" alt="">
                            <p class="makanan">Telur <br> 1.500</p>
                        </div>
                    </div>
                    <div class="col">
                        <div class="container-barang">
                            <img src="../assets/gula.jpg" alt="">
                            <p class="makanan">Gula <br> 12.500</p>
                        </div>
                    </div>
                    <div class="col">
                        <div class="container-barang">
                            <img src="../assets/minyak.jpg" alt="">
                            <p class="makanan">Minyak Goreng <br> 36.000</p>
                        </div>
                    </div> -->
                </div>
                <!-- <h6>BARANG DARURAT</h6>
                <hr />
                <div class="row">
                    <div class="col">
                        <div class="container-barang">
                            <img src="../assets/payung.jpg" alt="">
                            <p class="makanan">Payung <br> 100.000</p>
                        </div>
                    </div>
                    <div class="col">
                        <div class="container-barang">
                            <img src="../assets/jashujan.jpg" alt="">
                            <p class="makanan">Jas Hujan <br> 450.000</p>
                        </div>
                    </div>
                    <div class="col">
                        <div class="container-barang">
                            <img src="../assets/kacamata.jpg" alt="">
                            <p class="makanan">Kacamata radiasi <br> 200.000</p>
                        </div>
                    </div>
                    <div class="col">
                        <div class="container-barang">
                            <img src="../assets/pembalut.jpg" alt="">
                            <p class="makanan">Pembalut <br> 13.000</p>
                        </div>
                    </div>
                    <div class="col">
                        <div class="container-barang">
                            <img src="../assets/hansaplas.jpg" alt="">
                            <p class="makanan">Hansaplast <br> 10.000</p>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
        </div>
    </div>
    
</template>
<style scoped>
    .col-md-6{
        padding-left: 0px;
    }
    .makanan {
        font-weight: bold;
        color: #4CAF50;
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
        padding-left: 0px;
        margin-top: 90px;
        margin-bottom: 15px;
        color: #4CAF50;
        font-size: 20px;
        font-weight: bold;
        font-family: sans-serif;
    }

    button {
        margin-top: 90px;
        border-radius: 15px;
        background-color: #4CAF50;
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
    .container{
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
        background-color: #4CAF50;
    }

    img {
        width: 70px;
        height: 70px;
        margin-top: 10px;
        margin-left: 25px;
    }

    .container-barang {
        margin-top: 12px;
        margin-bottom: 20px;
        border-radius: 10px;
        width: 120px;
        height: 130px;
        background-color: white;
        z-index: 1;
    }
</style>
<script>
import axios from 'axios'
export default {
    data() {
      return {
        products: {},
      }
    },

    mounted() {
      axios
        .get("https://api-kasirin.jaggs.id/api/product", {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')

          }
        })
        .then(({
          data
        }) => (this.products = data.data))
        .catch((err) => {
          console.log(err)
        });
    },
  }
</script>