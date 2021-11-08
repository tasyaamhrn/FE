<template>
    <div class="container">
        <div class="category">
            <div class="row">
                <div class="col-md-8">
                    <h1>KARYAWAN</h1>
                </div>
                <div class="col-md-4">
                    <div class="add">
                        <router-link :to="{ name: 'AddKaryawan' }"><button type="button" id="btn-add">+ Tambah</button>
                        </router-link>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <select v-model="store_id" class="form-control" @change="getEmployee">
                            <option value="">Pilih Toko</option>
                            <option :value="store.store.id" v-for="(store, index) in stores" :key="index">
                                {{ store.store.name }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <table class="table table-bordered">
            <thead class="thead tbl">
                <tr>
                    <th scope="col">Nama</th>
                    <th scope="col">Email</th>
                    <th scope="col">Alamat</th>
                    <th scope="col">Kelamin</th>
                    <th scope="col">Avatar</th>
                    <th scope="col">Telepon</th>
                    <th scope="col">Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in employees" :key="item.id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.address }}</td>
                    <td>{{ item.gender }}</td>
                    <td><img :src="item.avatar_url" style="width: 20%" alt="Product Image" /></td>
                    <td>{{ item.phone }}</td>
                    <td>
                        <router-link :to="{ name: '', params: { id: item.id } }">
                            <button type="button" class="btn btn-primary">
                                Edit
                            </button>
                        </router-link>
                        <button type="button" class="btn btn-danger" @click="deleteData(item.id)">
                            Hapus
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    import axios from "axios";
    import Swal from "sweetalert2";

    export default {
        data() {
            return {
                stores: [],
                store_id: "",
                employees: {},

            };
        },
        mounted() {
            this.getStore()
        },
        methods: {
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
            getEmployee() {
                axios
                    .get(
                        "https://api-kasirin.jaggs.id/api/karyawan?store_id=" + this.store_id, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("access_token"),
                            },
                        }
                    )
                    .then((res) => {
                        console.log(res);
                        this.employees = res.data.data;
                    })
                    .catch((err) => {
                        this.employees = "";
                        console.log(err);
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
                    confirmButtonText: "Hapus",
                }).then((result) => {
                    if (result.value) {
                        axios
                            .delete("https://api-kasirin.jaggs.id/api/karyawan/delete/" + id)
                            .then((res) => {
                                Swal.fire("Terhapus", "Produk Anda Sudah Terhapus", "success");
                                this.getEmployee();
                                console.log(res);
                            })
                            .catch((err) => {
                                Swal.fire("Gagal", "Produk Anda Gagal Terhapus", "warning");
                                console.log(err);
                            });
                    } else {
                        Swal.fire("Gagal", "Produk Anda Gagal Terhapus", "warning");
                    }
                });
            },
        },
    };
</script>
<style scoped>
    h1 {
        font-family: Arial, Helvetica, sans-serif;
        color: #4caf50;
        font-size: 18px;
        font-weight: bold;
        padding-top: 75px;
    }

    .tbl {
        background-color: #4caf50;
        color: white;
    }

    .add {
        margin-top: 65px;
        float: right;
        text-align: center;
    }

    .btn-save {
        margin-top: 20px;
        border-radius: 10px;
        background-color: #4caf50;
        float: right;
        font-weight: bold;
        color: white;
        border-color: transparent;
        width: 150px;
        height: 40px;
    }

    #btn-add {
        background-color: #4caf50;
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
        background-color: #4caf50;
    }

    #hapus {
        margin-left: 120px;
        background-color: #fd7b7b;
    }

    .modal-body {
        color: #4caf50;
        font-weight: bold;
        font-size: 16px;
        text-align: center;
    }

    .close {
        color: #4caf50;
        font-weight: bold;
        font-size: 24px;
    }

    .list-group li {
        border-bottom: 4px solid #4caf50;
    }
</style>