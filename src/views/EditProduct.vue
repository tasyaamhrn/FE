<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <button type="button" @click="update" class="btn btn-success btn-lg">
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
                <input type="text" v-model="form.name" class="form-control" id="exampleProduct"
                    aria-describedby="emailHelp">
            </div>
            <input type="file" accept="image/*" class="form-control" @change="onImageSelected" />
            <label for="">test</label>
            <!-- <div class="mb-3">
                <label for="exampleInputCategory" class="form-label">Nama Kategori</label>
                <select class="form-control" v-model="form.category_id">
                    <option selected>Pilih Kategori Produk..</option>
                </select>
            </div> -->
            <!-- <div class="mb-3">
                <label for="exampleInputPhotoProduct" class="form-label">Foto Produk</label>
                <input type="file" class="form-control" id="examplePhotoProduct">
            </div> -->
            <div class="mb-3">
                <label for="examplePriceProduct" class="form-label">Harga Produk</label>
                <input type="text" class="form-control" v-model="form.price" id="examplePriceProduct">
            </div>
            <div class="mb-3">
                <label for="exampleStockProduct" class="form-label">Stok Produk</label>
                <input type="text" class="form-control" id="exampleStockProduct" v-model="form.stock">
            </div>
            <div class="mb-3">
                <label for="exampleBarcodeProduct" class="form-label">Barcode</label>
                <input type="integer" class="form-control" id="exampleBarcode" v-model="form.barcode">
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import Swal from 'sweetalert2'


    export default {
        name: "EditProduct",
        data() {
            return {
                form: {
                    name: "",
                    category_id: "",
                    image: "",
                    price: "",
                    stock: "",
                    barcode: "",
                },
                product_id: this.$route.params.id,
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            onImageSelected(e) {
                this.form.image = e.target.files[0];
            },
            getData() {
                axios
                    .get("https://api-kasirin.jaggs.id/api/product/" + this.product_id, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("access_token"),
                        },
                    })
                    .then((res) => {
                        this.form.name = res.data.data.name;
                        this.form.price = res.data.data.price;
                        this.form.stock = res.data.data.stock;
                        this.form.barcode = res.data.data.barcode;
                        this.form.category_id = res.data.data.category_id
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            update() {
                let formData = new FormData();
                formData.set("name", this.form.name);
                formData.set("category_id", this.form.category_id);
                formData.set("image", this.form.image);
                formData.set("price", this.form.price);
                formData.set("stock", this.form.stock);
                formData.set("barcode", this.form.barcode);
                console.log(formData.get('image'));
                axios
                    .post(
                        "https://api-kasirin.jaggs.id/api/product/edit/" + this.product_id,
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
                            name: "Product"
                        });
                        Swal.fire("Terupdate", res.data.message, "success");
                    })
                    .catch((err) => {
                        this.errors = err.response.data;
                        Swal.fire("Gagal", "Product Anda Gagal diupdate", "warning");
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