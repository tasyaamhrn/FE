<template>
    <div>
        <div class="container">
            <label>TAMBAH TRANSAKSI</label>
        </div>
        <div class="container">
            <div class="container-product2">
                <div class="col-makan">
                    <h6>BARANG POKOK</h6>
                    <hr />
                    <div class="row">
                        <div class="col">
                            <div class="container-barang" data-toggle="modal" data-target="#myModal">
                                <img src="../assets/beras.png" alt="">
                                <p class="makanan">Beras <br> 65.000 <br>Stok:98</p>
                            </div>
                        </div>
                        <div class="col">
                            <div class="container-barang" data-toggle="modal" data-target="#myModal">

                                <img src="../assets/miesedap.png">

                                <p class="makanan">Mie Sedap <br> 2.500 <br>Stok:98</p>
                            </div>
                        </div>
                        <div class="col">
                            <div class="container-barang" data-toggle="modal" data-target="#myModal">
                                <img src="../assets/telur.jpg" alt="">
                                <p class="makanan">Telur <br> 1.500 <br>Stok:98 </p>
                            </div>
                        </div>
                        <div class="col">
                            <div class="container-barang" data-toggle="modal" data-target="#myModal">
                                <img src="../assets/gula.jpg" alt="">
                                <p class="makanan">Gula <br> 12.500 <br>Stok:98</p>
                            </div>
                        </div>
                        <div class="col">
                            <div class="container-barang" data-toggle="modal" data-target="#myModal">
                                <img src="../assets/minyak.jpg" alt="">
                                <p class="makanan">Minyak Goreng <br> 36.000 <br>Stok:98</p>
                            </div>
                        </div>
                    </div>
                    <h6>BARANG DARURAT</h6>
                    <hr />
                    <div class="row">
                        <div class="col">
                            <div class="container-barang" data-toggle="modal" data-target="#myModal">
                                <img src="../assets/payung.jpg" alt="">
                                <p class="makanan">Payung <br> 100.000 <br>Stok:98</p>
                            </div>
                        </div>
                        <div class="col">
                            <div class="container-barang" data-toggle="modal" data-target="#myModal">
                                <img src="../assets/jashujan.jpg" alt="">
                                <p class="makanan">Jas Hujan <br> 450.000 <br>Stok:98</p>
                            </div>
                        </div>
                        <div class="col">
                            <div class="container-barang" data-toggle="modal" data-target="#myModal">
                                <img src="../assets/kacamata.jpg" alt="">
                                <p class="makanan">Kacamata radiasi <br> 200.000 <br>Stok:98</p>
                            </div>
                        </div>
                        <div class="col">
                            <div class="container-barang" data-toggle="modal" data-target="#myModal">
                                <img src="../assets/pembalut.jpg" alt="">
                                <p class="makanan">Pembalut <br> 13.000<br>Stok:98</p>
                            </div>
                        </div>
                        <div class="col">
                            <div class="container-barang" data-toggle="modal" data-target="#myModal">
                                <img src="../assets/hansaplas.jpg" alt="">
                                <p class="makanan">Hansaplast <br> 10.000<br>Stok:98</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Modal -->

            <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" data-backdrop="false"
                aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <!-- <h5 class="modal-title" id="exampleModalLabel">Kategori</h5> -->
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <img src="../assets/beras.png" alt="">
                            <p class="makanan">Beras <br> 65.000 <br> Stok:98</p>
                            <div id="vue-counter">
                    
                                <p id="tambah"> 
                                    <i class='bx bx-plus' @click="increase"></i> 
                                    &nbsp;&nbsp;
                                    {{ counter }}
                                    &nbsp;&nbsp;
                                    <i class='bx bx-minus' @click="decrease"></i>
                                </p>
                                
                               
                                <!-- <button type="button" @click="increase">Increase By 1</button>  -->
                                <!-- <button type="button" @click="decrease">Decrease By 1</button>  -->
                                <!-- <button type="button" @click="reset">Reset Counter</button> -->
                            </div>
                           
                        </div>
                        <div class="modal-footer">
                            <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
                            <button type="button" id="hapus" class="btn btn-danger  btn-lg center-block"><i
                                    class='bx bx-trash'>Batal</i></button>
                            <router-link to="EditCategory"> <button type="button" id="edit"
                                    class="btn btn-primary  btn-lg center-block"><i class='bx bx-edit'>Pilih</i></button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: "CreateTransaction",
    data(){
        return {
            counter: 0
        }
    },
    methods:{
        increase(){
            this.counter++;
        },
        decrease(){
            this.counter--;
        }
    },
  };
</script>

<style scoped>
    .col-md-6 {
        padding-left: 0px;
    }

    .makanan {
        font-weight: bold;
        color: #4CAF50;
        text-align: center;

    }
#tambah{
    padding-top:30px;
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
        height: 140px;
        background-color: white;
        z-index: 1;
    }

    #edit {
        margin-right: 150px;
        background-color: #4CAF50;
    }

    #hapus {
        margin-left: 120px;
        background-color: #FD7B7B;

    }

    .modal-body {
        color: #4CAF50;
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

    .close {
        color: #4CAF50;
        font-weight: bold;
        font-size: 24px;
    }
</style>