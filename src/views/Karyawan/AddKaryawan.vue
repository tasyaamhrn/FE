<template>
    <div>
        <div class="container">
            <div class="row">
        <div class="col-md-8" style="padding-top:75px; padding-bottom:30px; padding-left:80.5%;">
          <span class="label info"><i class="bx bx-plus"></i> Tambah Karyawan</span>
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
                    <the-error :errors="errors.name"></the-error>
                </div>

                <div class="wrap-input100 validate-input">
                      <input class="input200" type="file" accept="avatar/*" @change="onImageSelected" name="avatar">
                      <span class="focus-input100"></span>
                      <span class="symbol-input100">
                        <i class="far fa-image" aria-hidden="true"></i>
                      </span>
                    </div>

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

                <div class="form-group">
                    <label>Alamat</label>
                    <input class="form-control" id="address" type="text" placeholder="Masukkan Alamat"
                        v-model="form.address" />
                </div>
                <div class="form-group">
                    <label>Telepon</label>
                    <input class="form-control" id="phone" type="text" placeholder="Masukkan Telepon"
                        v-model="form.phone" />
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Masukkan Email" v-model="form.email" class="form-control" />
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" placeholder="Masukkan Password" v-model="form.password"
                        class="form-control" />
                </div>
                <button @click="karyawan" type="button" name="button" class="sv">
                    SAVE
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    // import InputForm from "../../components/inputForm.vue";
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
            // InputForm
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

<style scoped>
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
        background-color: #376caf;
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
        background: grey;
    }

    .kembali {
        font-size: 16px;
        text-align: right;
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
