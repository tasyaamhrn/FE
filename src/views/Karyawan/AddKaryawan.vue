<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <button @click="karyawan" type="button" class="btn btn-success btn-lg">
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
            <p class="judul1">
                Nama Karyawan
            </p>
            <input-form :errors="errors.name">
                <template v-slot:form>
                    <input class="form-control" id="namakaryawan" type="text" placeholder="Masukkan Nama Karyawan"
                        v-model="form.name" />
                </template>
            </input-form>

            <p class="judul">
                Foto Karyawan
            </p>
            <input-form :errors="errors.image">
                <template v-slot:form>
                    <input type="file" accept="avatar/*" class="form-control" @change="onImageSelected" />
                </template>
                <select class="form-control"></select>
            </input-form>
            <p class="judul">
                Toko
            </p>
            <div class="form-group" style="margin-left:30px;">
                <select v-model="form.store_id" class="form-control" @change="getEmployee">
                    <option value="">Pilih Toko</option>
                    <option :value="store.store.id" v-for="(store, index) in stores" :key="index">
                        {{ store.store.name }}
                    </option>
                </select>
            </div>
            <p class="judul">
                Jenis Kelamin
            </p>
            <input-form>
                <template v-slot:form>

                    <select class="form-control" v-model="form.gender">
                        <option value="">Jenis Kelamin</option>
                        <option> Male </option>
                        <option> Female </option>
                    </select>
                </template>
            </input-form>
            <p class="judul">
                Alamat
            </p>
            <input-form :errors="errors.price">
                <template v-slot:form>
                    <input class="form-control" id="address" type="text" placeholder="Masukkan Alamat"
                        v-model="form.address" />
                </template>
            </input-form>
            <p class="judul">
                Telepon
            </p>
            <input-form :errors="errors.price">
                <template v-slot:form>
                    <input class="form-control" id="phone" type="text" placeholder="Masukkan Telepon"
                        v-model="form.phone" />
                </template>
            </input-form>
            <p class="judul">
                Email
            </p>
            <input-form :errors="errors.email">
                <template v-slot:form>
                    <input type="email" placeholder="Masukkan Email" v-model="form.email" class="form-control" />
                </template>
            </input-form>
            <p class="judul">
                Password
            </p>
            <input-form :errors="errors.password">
                <template v-slot:form>
                    <input type="password" placeholder="Masukkan Password" v-model="form.password"
                        class="form-control" />
                </template>
            </input-form>
        </div>
    </div>
</template>
<style scoped>
    .col-md-6 {
        padding-left: 45px;
    }

    .tambahproduk {
        width: 100%;
    }

    label {
        padding-top: 90px;
        margin-bottom: 15px;
        color: #4caf50;
        font-size: 20px;
        font-weight: bold;
        font-family: sans-serif;
    }

    button {
        font-size: 16px;
        margin-top: 90px;
        border-radius: 15px;
        background-color: #376caf;
        width: 150px;
        height: 40px;
        color: white;
        border-color: transparent;
    }

    .kembali {
        font-size: 16px;
        text-align: right;
    }

    .judul {
        padding-left: 28px;
        color: #4caf50;
        font-family: sans-serif;
        font-size: 18px;
        margin-bottom: 5px;
    }

    .judul1 {
        padding-left: 28px;
        padding-top: 20px;
        color: #4caf50;
        font-family: sans-serif;
        font-size: 18px;
        margin-bottom: 5px;
    }
</style>
<script>
    import axios from "axios";
    import InputForm from "../../components/inputForm.vue";
    import Swal from 'sweetalert2';

    export default {
        data() {
            return {
                form: {
                    name: "",
                    email: "",
                    address: "",
                    gender: "",
                    avatar: "",
                    phone: "",
                    password: "",
                    store_id: "",
                },
                stores: {},
                errors: [],
            };
        },
        components: {
            InputForm
        },
        mounted() {
            this.getStore();
        },
        methods: {
            onImageSelected(event) {
                this.form.avatar = event.target.files[0];
            },
            getStore() {
                axios
                    .get(
                        "https://api-kasirin.jaggs.id/api/user-stores?user_id=" +
                        localStorage.getItem("id"), {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("access_token"),
                            },
                        }
                    )
                    .then((res) => {
                        this.stores = res.data.data;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            karyawan() {
                let formData = new FormData();
                formData.set("name", this.form.name);
                formData.set("email", this.form.email);
                formData.set("address", this.form.address);
                formData.set("gender", this.form.gender);
                formData.set("avatar", this.form.avatar);
                formData.set("phone", this.form.phone);
                formData.set("password", this.form.password);
                formData.set("store_id", this.form.store_id);
                axios
                    .post("https://api-kasirin.jaggs.id/api/karyawan/add", formData)
                    .then((res) => {
                        Swal.fire("Berhasil", res.data.message, "success");
                        console.log(res);
                        this.$router.push({
                            name: "Karyawan",
                        });
                    })
                    .catch((err) => {
                        this.errors = err.response.data;
                        Swal.fire("Gagal", err.data.message, "warning");
                    });
            },
        },
    };
</script>