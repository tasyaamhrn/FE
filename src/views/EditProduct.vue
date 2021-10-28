<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <button  type="button" class="btn btn-success btn-lg">
                        Edit Product
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
             <div class="mb-3">
                <label for="exampleInputProduct" class="form-label">Nama Produk</label>
                <input type="text" class="form-control" id="exampleProduct" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="exampleInputCategory" class="form-label">Nama Kategori</label>
                <select class="col-lg-12" aria-label=".form-select-lg example">
                <option selected>Pilih Kategori Produk..</option>
                <option value="1">Barang Pokok</option>
                <option value="2">Barang Impulsif</option>
                <option value="3">Barang Darurat</option>
            </select>
            </div>
            <div class="mb-3">
                <label for="exampleInputPhotoProduct" class="form-label">Foto Produk</label>
                <input type="file" class="form-control" id="examplePhotoProduct">
            </div>
            <div class="mb-3">
                <label for="examplePriceProduct" class="form-label">Harga Produk</label>
                <input type="text" class="form-control" id="examplePriceProduct">
            </div>
            <div class="mb-3">
                <label for="exampleStockProduct" class="form-label">Stok Produk</label>
                <input type="text" class="form-control" id="exampleStockProduct">
            </div>
            <div class="mb-3">
                <label for="exampleBarcodeProduct" class="form-label">Barcode</label>
                <input type="integer" class="form-control" id="exampleBarcode">
            </div>
        </div>
    </div>
</template>
<style scoped>
    .btn-success{
        font-size: 16px;
    }
    .col-lg-12 {
        height: 34px;
    }

    label {
        color: #4caf50;
        font-family: sans-serif;
        font-size: 16px;
        padding-top: 10px;
        margin-bottom: 5px;
    }

    button {
        margin-top: 90px;
        border-radius: 15px;
        background-color: #376caf;
        width: 150px;
        height: 40px;
        color: white;
        border-color: transparent;
    }

    .kembali {
        text-align: right;
        font-size: 16px;
    }

    .form-label {
        color: #4caf50;
        font-family: sans-serif;
        font-size: 16px;
        padding-top: 10px;
        margin-bottom: 5px;
    }
</style>