<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <label>EDIT PRODUK</label>
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
                Nama Produk/Layanan
            </p>
            <input type="text" class="form-control" id="namaproduk" placeholder="Masukkan Nama Produk..">
            <p class="judul">
                Nomor Barcode
            </p>
            <input type="text" class="form-control" id="nomorbarcode" placeholder="Masukkan Nomor Barcode..">
            <p class="judul">
                Harga
            </p>
            <input type="number" class="form-control" id="harga" placeholder="Rp 0">
            <p class="judul">
                Stok Produk
            </p>
            <input type="number" class="form-control" id="stokproduk" placeholder="0">
            <p class="judul">
                Kategori Produk
            </p>
            <select class="col-lg-12" aria-label=".form-select-lg example">
                <option selected>Pilih Kategori Produk..</option>
                <option value="1">Barang Pokok</option>
                <option value="2">Barang Impulsif</option>
                <option value="3">Barang Darurat</option>
            </select>
            <p class="judul">
                Foto Produk
            </p>
            <input class="form-control" type="file" id="fotoproduk" placeholder="Masukkan foto produk">
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