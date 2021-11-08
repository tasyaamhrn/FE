<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <button type="button" @click="update" class="btn btn-success btn-lg">
                        Transaksi
                    </button>
                    <!-- <label>TAMBAH PRODUK</label> -->
                </div>
                <div class="col-md-6">
                    <div class="kembali">
                        <router-link to="AddTransaksi">
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
                <label for="exampleProduct" class="form-label">Nama Produk</label>
                <input type="text" class="form-control" v-model="form.name" id="examplePriceProduct">
            </div>
             <div class="mb-3">
                <label for="exampleProduct" class="form-label">Nama Store</label>
                <input type="text" class="form-control" v-model="form.name" id="exampleStoreName">
            </div>
            <div class="mb-3">
                <label for="examplePriceProduct" class="form-label">Harga Produk</label>
                <input type="text" class="form-control" v-model="form.price" id="examplePriceProduct">
            </div>
            <div class="mb-3">
                <label for="exampleBarcodeProduct" class="form-label">Jumlah</label>
                <input type="integer" class="form-control" id="exampleBarcode" v-model="form.qty" placeholder="Masukkan Jumlah Barang">
            </div>
            <div class="mb-3">
                <label for="exampleStockProduct" class="form-label">Bayar</label>
                <input type="text" class="form-control" id="exampleStockProduct" v-model="form.pay" placeholder="Masukkan Nominal Pembayaran">
            </div>
            <div class="mb-3">
                <label for="exampleBarcodeProduct" class="form-label">Diskon</label>
                <input type="integer" class="form-control" id="exampleBarcode" v-model="form.discount" placeholder="Masukkan Potongan Harga">
            </div>
            <div class="mb-3">
                <label for="exampleBarcodeProduct" class="form-label">Kembalian</label>
                <input type="integer" class="form-control" id="exampleBarcode" v-model="form.change" placeholder="Kembalian Pelanggan">
            </div>
            
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import Swal from 'sweetalert2'


    export default {
        name: "Pembelian",
        data() {
            return {
                form: {
                    store_id:"",
                    qty: "",
                    price: "",
                    pay: "",
                    discount: "",
                    change: "",
                },
                product_id: this.$route.params.id,
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                axios
                    .get("https://api-kasirin.jaggs.id/api/transaction/" + this.product_id, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("access_token"),
                        },
                    })
                    .then((res) => {
                        this.form.product = res.data.data.product;
                        this.form.qty = res.data.data.qty;
                        this.form.price = res.data.data.price;
                        this.form.pay = res.data.data.pay;
                        this.form.discount = res.data.data.discount
                        this.form.change = res.data.data.change
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            update() {
                let formData = new FormData();
                formData.set("product", this.form.product);
                formData.set("qty", this.form.qty);
                formData.set("price", this.form.price);
                formData.set("pay", this.form.pay);
                formData.set("discount", this.form.discount);
                formData.set("change", this.form.change);
                axios
                    .post(
                        "https://api-kasirin.jaggs.id/api/transaction/" + this.product_id,
                        formData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                                Authorization: "Bearer " + localStorage.access_token,
                            },
                        }
                    )
                    .then((res) => {
                        console.log(res)
                        this.$router.push({
                            name: "AddTransaksi"
                        });
                        Swal.fire("Terupdate", res.data.message, "success");
                    })
                    .catch((err) => {
                        this.errors = err.response.data;
                        Swal.fire("Gagal", "Transaksi Anda Gagal diupdate", "warning");
                    });
            },

        },
    }
</script>

<style scoped>
    .btn-success {
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