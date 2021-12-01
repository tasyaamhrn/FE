<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-8" style="padding-bottom:25px; margin-top:-25px; padding-left:85.5%;">
                    <router-link to="karyawan">
                        <button type="button">&#8592; Kembali</button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="col-md-12">
                <div class="wrap-input100 validate-input">
                    <input class="input100" v-model="form.name" type="text" name="name"
                        placeholder="Silahkan Masukkan Nama Karyawan Anda">
                    <span class="focus-input100"></span>
                    <span class="symbol-input100">
                        <i class="fas fa-user" aria-hidden="true"></i>
                    </span>
                </div>
                <the-error :errors="errors.name" class="error"></the-error>

                <div class="wrap-input100 validate-input">
                    <input class="input200" type="file" accept="avatar/*" @change="onImageSelected" name="avatar">
                    <span class="focus-input100"></span>
                    <span class="symbol-input100">
                        <i class="far fa-image" aria-hidden="true"></i>
                    </span>
                </div>
                <div id="preview" v-if="url">
                    <img v-if="url" :src="url" />
                </div>
                <the-error :errors="errors.avatar" class="error"></the-error>

                <div class="wrap-input100 validate-input">
                    <select class="input100" v-model="form.store_id">
                        <option value="" disabled>Pilih Toko</option>
                        <option :value="store.store.id" v-for="(store, index) in stores" :key="index">
                            {{ store.store.name }}
                        </option>
                    </select>
                    <span class="focus-input100"></span>
                    <span class="symbol-input100">
                        <i class="fas fa-store" aria-hidden="true"></i>
                    </span>
                </div>
                <the-error :errors="errors.store_id" class="error"></the-error>


                <div class="wrap-input100 validate-input">
                    <select class="input100" v-model="form.gender">
                        <option value="" disabled>Jenis Kelamin</option>
                        <option> Male </option>
                        <option> Female </option>
                    </select>
                    <span class="focus-input100"></span>
                    <span class="symbol-input100">
                        <i class="fas fa-venus-mars" aria-hidden="true"></i>
                    </span>
                </div>
                <the-error :errors="errors.gender" class="error"></the-error>

                <div class="wrap-input100 validate-input">
                    <input class="input100" v-model="form.address" type="text" name="name"
                        placeholder="Silahkan Masukkan Alamat Karyawan Anda">
                    <span class="focus-input100"></span>
                    <span class="symbol-input100">
                        <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                    </span>
                </div>
                <the-error :errors="errors.address" class="error"></the-error>


                <div class="wrap-input100 validate-input">
                    <input class="input100" v-model="form.phone" type="text" name="name"
                        placeholder="Silahkan Masukkan Nomor Telepon Karyawan Anda">
                    <span class="focus-input100"></span>
                    <span class="symbol-input100">
                        <i class="fas fa-phone" aria-hidden="true"></i>
                    </span>
                </div>
                <the-error :errors="errors.phone" class="error"></the-error>

                <div class="wrap-input100 validate-input">
                    <input class="input100" v-model="form.email" type="text" name="name"
                        placeholder="Silahkan Masukkan Email Karyawan Anda">
                    <span class="focus-input100"></span>
                    <span class="symbol-input100">
                        <i class="fas fa-envelope" aria-hidden="true"></i>
                    </span>
                </div>
                <the-error :errors="errors.email" class="error"></the-error>

                <div class="wrap-input100 validate-input">
                    <input class="input100" v-model="form.password" type="password" name="password"
                        placeholder="Silahkan Masukkan Password Email Karyawan Anda">
                    <span class="focus-input100"></span>
                    <span class="symbol-input100">
                        <i class="fas fa-lock" aria-hidden="true"></i>
                    </span>
                </div>
                <the-error :errors="errors.password" class="error"></the-error>
                <button @click="karyawan" type="button" style="" name="button" class="sv">
                    <i class="bx bx-plus"></i> Tambah Karyawan
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    // import InputForm from "../../components/inputForm.vue";
    import Swal from 'sweetalert2';
    import TheError from "../../components/ErrorForm.vue";


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
                url: null,
                stores: {},
                errors: [],
            };
        },
        components: {
            // InputForm
            TheError

        },
        mounted() {
            this.getStore();
        },
        methods: {
            onImageSelected(event) {
                this.form.avatar = event.target.files[0];
                this.url = URL.createObjectURL(this.form.avatar);
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
                        Swal.fire("Gagal", "Gagal Menambahkan Karyawan", "warning");
                    });
            },
        },
    };
</script>

<style scoped>
    #preview {
        border: 2px dashed grey;
        padding: 1rem;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #preview img {
        width: 30%;
        object-fit: cover;
    }

    .error {
        padding-bottom: 5px;
    }

    .sv {
        margin-top: 20px;
        border-radius: 10px;
        background-color: #5D9EFE;
        float: right;
        /* height: 30px; */
        color: white;
        border-color: transparent;
        font-weight: bold;
    }

    h1 {
        font-family: Arial, Helvetica, sans-serif;
        color: #5D9EFE;
        font-size: 18px;
        font-weight: bold;
        padding-top: 75px;
    }

    .col-md-6 {
        padding-left: 45px;
    }

    .tambahproduk {
        width: 100%;
    }

    .label {
        color: white;
        padding: 10px 18px;
        font-size: 17px;
        border-radius: 10px;
        font-family: Arial, Helvetica, sans-serif;
    }

    .info {
        background-color: #5D9EFE;
    }

    /* Blue */

    button {
        margin-top: 90px;
        border-radius: 15px;
        background-color: #5D9EFE;
        width: 150px;
        height: 40px;
        color: white;
        border-color: transparent;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 25px;

        -webkit-transition: all 0.4s;
        -o-transition: all 0.4s;
        -moz-transition: all 0.4s;
        transition: all 0.4s;
        padding: 0;
        border: none;
    }

    .kembali {
        text-align: right;
    }

    h1 {
        font-family: Arial, Helvetica, sans-serif;
        color: #5D9EFE;
        font-size: 18px;
        font-weight: bold;
        padding-top: 75px;
    }

    .sv {
        margin-top: 20px;
        border-radius: 10px;
        background-color: #5D9EFE;
        float: right;
        /* height: 30px; */
        color: white;
        border-color: transparent;
        font-weight: bold;
    }

    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');

    .img-fluid {
        width: 100%;
    }

    .wrap-input100 {
        position: relative;
        width: 100%;
        z-index: 1;
        margin-bottom: 10px;
    }

    .input100 {
        font-size: 15px;
        line-height: 1.5;
        color: black;

        display: block;
        width: 100%;
        background: whitesmoke;
        height: 50px;
        border-radius: 25px;
        padding: 0 30px 0 68px;
        border: none;
    }


    .focus-input100 {
        display: block;
        position: absolute;
        border-radius: 25px;
        bottom: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        box-shadow: 0px 0px 0px 0px;
        color: rgba(130, 204, 254, 0.8);
    }

    .input100:focus+.focus-input100 {
        -webkit-animation: anim-shadow 0.5s ease-in-out forwards;
        animation: anim-shadow 0.5s ease-in-out forwards;
    }

    @-webkit-keyframes anim-shadow {
        to {
            box-shadow: 0px 0px 70px 25px;
            opacity: 0;
        }
    }

    @keyframes anim-shadow {
        to {
            box-shadow: 0px 0px 70px 25px;
            opacity: 0;
        }
    }

    .symbol-input100 {
        font-size: 15px;

        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        align-items: center;
        position: absolute;
        border-radius: 25px;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding-left: 35px;
        pointer-events: none;
        color: #666666;

        -webkit-transition: all 0.4s;
        -o-transition: all 0.4s;
        -moz-transition: all 0.4s;
        transition: all 0.4s;
    }

    .input100:focus+.focus-input100+.symbol-input100 {
        color: #82CCFE;
        padding-left: 28px;
    }

    button:hover {
        background: #82CCFE;
        text-decoration: none;
    }

    .judul {
        padding-left: 28px;
        color: #5D9EFE;
        font-family: sans-serif;
        font-size: 18px;
        margin-bottom: 5px;
    }

    .judul1 {
        padding-left: 28px;
        padding-top: 20px;
        color: #5D9EFE;
        font-family: sans-serif;
        font-size: 18px;
        margin-bottom: 5px;
    }

    .input200 {
        font-size: 15px;
        line-height: 2.5;
        color: black;

        display: block;
        width: 100%;
        background: whitesmoke;
        border-radius: 25px;
        padding: 0 30px 0 68px;
    }
</style>