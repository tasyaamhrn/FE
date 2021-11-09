<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <button type="button" @click="update" class="btn btn-success btn-lg">
                        Edit Karyawan
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
            <input type="file" accept="avatar/*" class="form-control" @change="onImageSelected" />
            <div class="mb-3">
                <label for="examplePriceProduct" class="form-label">Alamat</label>
                <input type="text" class="form-control" v-model="form.address" id="examplePriceProduct">
            </div>
            <div class="mb-3">
                <label for="exampleStockProduct" class="form-label">Jenis Kelamin</label>
                <input type="text" class="form-control" id="exampleStockProduct" v-model="form.gender">
            </div>
            <div class="mb-3">
                <label for="exampleBarcodeProduct" class="form-label">Telepon</label>
                <input type="integer" class="form-control" id="exampleBarcode" v-model="form.phone">
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
                    address: "",
                    gender: "",
                    avatar: "",
                    phone: "",
                },
                employee_id: this.$route.params.id,
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            onImageSelected(e) {
                this.form.avatar = e.target.files[0];
            },
            getData() {
                axios
                    .get("https://api-kasirin.jaggs.id/api/karyawan/" + this.employee_id, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("access_token"),
                        },
                    })
                    .then((res) => {
                        this.form.name = res.data.data.name;
                        this.form.address = res.data.data.address;
                        this.form.gender = res.data.data.gender;
                        this.form.avatar = res.data.data.avatar;
                        this.form.phone = res.data.data.phone;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            update() {
                let formData = new FormData();
                formData.set("name", this.form.name);
                formData.set("address", this.form.address);
                formData.set("gender", this.form.gender);
                formData.set("avatar", this.form.avatar);
                formData.set("phone", this.form.phone);
                console.log(formData.get('avatar'));
                axios
                    .post(
                        "https://api-kasirin.jaggs.id/api/karyawan/edit/" + this.employee_id,
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
                            name: "Karyawan"
                        });
                        Swal.fire("Terupdate", res.data.message, "success");
                    })
                    .catch((err) => {
                        this.errors = err.response.data;
                        Swal.fire("Gagal", "Karyawan Anda Gagal diupdate", "warning");
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