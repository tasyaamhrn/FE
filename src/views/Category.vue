<template>
    <div class="container">
        <div class="category">
            <div class="row">
                <div class="col-8">
                    <h1>KATEGORI</h1>
                </div>
                <div class="col-4">
                    <div class="add">
                        <router-link to="/AddCategory"><button type="button" id="btn-add">+ Tambah</button>
                        </router-link>
                    </div>
                </div>
            </div>
            <ul class="list-group list-group-flush" v-for="item in categories" :key="item.id" v-show="!updateSubmit"
                :disabled="loading">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    {{item.store_id}} {{ item.name }}

                    <a href="#" @click="deleteData(item.id)" style="padding-left:85%;" class="text-danger">
                        <i class="fas fa-trash-alt red"></i>
                    </a>
                    <a href="#" @click="edit(item)"><i class="far fa-edit"></i></a>


                </li>

            </ul>

        </div>
        <div class="container">
            <form @submit.prevent="updateData()" v-show="updateSubmit" @click="update(form)">
                <div class="form-group">
                    <label class="judul">
                        Nama Kategori
                    </label>
                    <input type="text" class="form-control" id="namakategori" placeholder="Masukkan Nama Kategori.."
                        v-model="form.name">
                </div>
                <select class="form-control" v-model="form.store_id">

                    <option>Pilih Toko</option>
                    <option class="dropdown-item" href="#" v-for="(store, index) in user_store" :key="index">
                        {{ store.store_id}} {{ store.store.name }}</option>


                </select>
                <button type="submit" class="btn-save">Update</button>

            </form>

        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Swal from 'sweetalert2';
    import {
        mapGetters
    } from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                isLoggedIn: 'isLoggedIn',
                user: 'user',
            })
        },
        data() {
            return {
                form: {
                    name: "",
                    store_id: "",

                },
                categories: {},
                user_store: this.$store.state.auth.user.user_store,
                loading: false,
                updateSubmit: false
            }
        },

        methods: {
            load() {
                axios
                    .get('https://api-kasirin.jaggs.id/api/category?store_id=37', {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('access_token')

                        }
                    })
                    .then(({
                        data
                    }) => (this.categories = data.data))
                    .catch((err) => {
                        console.log(err)
                    });
            },
            edit(item) {
                this.updateSubmit = true
                this.form.name = item.name
                this.form.store_id = item.store_id
            },
            update(form) {
                axios({
                        method: 'put',
                        url: 'https://api-kasirin.jaggs.id/api/category/edit/' + form.id,
                        data: {
                            id: form.id,
                            name: this.form.name,
                            store_id: this.form.store_id
                        }
                    })
                    .then(() => {
                        this.load()
                        this.form.id = ''
                        this.form.name = ''
                        this.form.store_id = ''
                        this.updateSubmit = false
                        alert("saving...");
                    })
                    .catch(err => {
                        console.log(err);
                        alert("saving error");
                    });
            },
            deleteData(id) {
                Swal.fire({
                    title: "Anda Yakin Ingin Menghapus Data Ini ?",
                    text: "Klik Batal untuk Membatalkan Penghapusan",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    cancelButtonText: "Batal",
                    confirmButtonText: "Hapus"
                }).then(result => {
                    if (result.value) {
                        axios.delete('https://api-kasirin.jaggs.id/api/category/delete/' + id)
                            .then(res => {
                                Swal.fire(
                                    "Terhapus",
                                    "Produk Anda Sudah Terhapus",
                                    "success"
                                );
                                this.load();
                                console.log(res);
                            })
                            .catch((err) => {
                                Swal.fire(
                                    "Gagal",
                                    "Produk Anda Gagal Terhapus",
                                    "warning"
                                );
                                console.log(err)
                            })
                    } else {
                        Swal.fire(
                            "Gagal",
                            "Produk Anda Gagal Terhapus",
                            "warning"
                        );
                    }
                });
            }
        },

        mounted() {
            this.load()
        },
    }
</script>
<style scoped>
    h1 {
        font-family: Arial, Helvetica, sans-serif;
        color: #4CAF50;
        font-size: 18px;
        font-weight: bold;
        padding-top: 75px;

    }

    .add {
        margin-top: 65px;
        float: right;
        text-align: center;
    }

    .btn-save {
        margin-top: 20px;
        border-radius: 10px;
        background-color: #4CAF50;
        float: right;
        font-weight: bold;
        color: white;
        border-color: transparent;
        width: 150px;
        height: 40px;
    }

    #btn-add {
        background-color: #4CAF50;
        border-color: transparent;
        color: white;
        border-radius: 10px;
        width: 150px;
        height: 40px;
        font-weight: bold;
    }

    .hapus i {
        color: red;
    }

    #edit {
        margin-right: 150px;
        background-color: #4CAF50;
    }

    #hapus {
        margin-left: 120px;
        background-color: #FD7B7B;

    }

    .modal-body {
        color: #4CAF50;
        font-weight: bold;
        font-size: 16px;
        text-align: center;
    }

    .close {
        color: #4CAF50;
        font-weight: bold;
        font-size: 24px;
    }

    .list-group li {
        border-bottom: 4px solid #4CAF50;
    }
</style>