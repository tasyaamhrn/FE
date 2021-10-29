<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <button @click="createProduct" type="button" class="btn btn-success btn-lg">
                        Tambah
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
                <input type="text" v-model="form.name" class="form-control" id="exampleProduct" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="exampleInputCategory" class="form-label">Nama Kategori</label>
                <select class="col-lg-12" v-model="form.category_id" aria-label=".form-select-lg example">
                <option selected>Pilih Kategori Produk..</option>
                <option value="1">2</option>
                <option value="2">Barang Impulsif</option>
                <option value="3">Barang Darurat</option>
            </select>
            </div>
            <div class="mb-3">
                <label for="exampleInputPhotoProduct" class="form-label">Foto Produk</label>
                <input type="file"  class="form-control" id="examplePhotoProduct">
            </div>
            <div class="mb-3">
                <label for="examplePriceProduct" class="form-label">Harga Produk</label>
                <input type="text" v-model="form.price" class="form-control" id="examplePriceProduct">
            </div>
            <div class="mb-3">
                <label for="exampleStockProduct" class="form-label">Stok Produk</label>
                <input type="text" v-model="form.stock" class="form-control" id="exampleStockProduct">
            </div>
            <div class="mb-3">
                <label for="exampleBarcodeProduct" class="form-label">Barcode</label>
                <input type="integer" v-model="form.barcode" class="form-control" id="exampleBarcode">
            </div>
        </div>
    </div>
</template>
<style scoped>
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
    .btn-success{
        font-size: 16px;
    }
</style>
<script>
    import axios from "axios";
    export default {
        name: "Product",
        data() {
            return {
                data: "test",
                form: {
                    name: "",
                    category_id: this.$store.state.auth.category_id,
                    image: "",
                    price: "",
                    stock: "",
                    barcode: "",
                },
                user: this.$store.state.auth.user,
            };
        },
        methods: {
            createProduct() {
                axios
                    .post("https://api-kasirin.jaggs.id/api/product/store", this.form, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("access_token"),
                        },
                    })
                    .then(() => console.log("sukses"))
                    .catch((err) => console.log(err));
            },
        },
    };
</script>