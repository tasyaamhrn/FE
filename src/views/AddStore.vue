<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <button 
                        @click="store"
                        type="button"
                        class="btn btn-success btn-lg"
                      >
                        TAMBAH
                      </button>
                    <!-- <label>TAMBAH PRODUK</label> -->
                </div>
                <div class="col-md-6">
                    <div class="kembali">
                        <router-link to="product">
                            <button type="button">
                                &#8592; Kembali
                            </button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <p class="judul">
                Id User
            </p>
            <input type="integer" class="form-control" id="harga" placeholder="Masukkan Id User">
            <p class="judul">
                Nama Toko
            </p>
            <input type="text" class="form-control" id="namatoko" placeholder="Masukkan Nama Toko..">
            <p class="judul">
                Alamat Toko
            </p>
            <input type="text" class="form-control" id="alamattoko" placeholder="Masukkan Alamat Toko..">
            
        </div>
    </div>
</template>
<style scoped>
    .col-lg-12{
        height: 34px;
    }
    label {
        padding-top: 90px;
        margin-bottom: 15px;
        color: #4CAF50;
        font-size: 20px;
        font-weight: bold;
        font-family: sans-serif;
    }

    button {
        margin-top: 90px;
        border-radius: 15px;
        background-color: #376CAF;
        width: 150px;
        height: 40px;
        color: white;
        border-color: transparent;
    }

    .kembali {
        text-align: right;
    }

    .judul {
        color: #4CAF50;
        font-family: sans-serif;
        font-size: 18px;
        padding-top: 10px;
        margin-bottom: 5px;
    }
</style>