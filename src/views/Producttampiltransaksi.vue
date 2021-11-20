<template>
    <div class="container">
        <div class="category">
            <div class="row">
                <div class="col-md-8">
                    <h1>TRANSAKSI</h1>
                </div>
                <div class="col-md-4">
                    <div class="add">
                        <router-link :to="{ name: 'Pembelian2' }"><button type="button" id="btn-add">+ Tambah</button>
                        </router-link>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <select v-model="store_id" class="form-control" @change="getTransaksi">
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
                    <th scope="col">Tanggal Transaksi</th>
                    <th scope="col">Produk</th>
                    <th scope="col">Harga</th>
                    <th scope="col">Jumlah</th>
                    <th scope="col">Diskon</th>
                    <th scope="col">Bayar</th>
                    <th scope="col">Kembalian</th>
                    <th scope="col">Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in transaction" :key="item.id">
                    <td>{{ new Date(item.created_at).toLocaleDateString()}}</td>
                    <td v-for="(item) in detail_transaction" :key="item.id" >{{ item.product.name}} </td>
                    <td>{{ item.price }}</td>
                    <td v-for="(item) in detail_transaction" :key="item.id">{{ item.qty }}</td>
                    <td>{{ item.discount}}</td>
                    <td>{{ item.pay}}</td>
                    <td>{{ item.change}}</td>
                    <td>
                        <!-- <router-link :to="{ name: 'EditKaryawan', params: { id: item.id } }"> -->
                        <button type="button" class="btn btn-primary">
                            <div class="detailtransaksi" data-toggle="modal" data-target="#myModal">
                                Detail Produk
                            </div>
                        </button>
                        <!-- </router-link> -->
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" data-backdrop="false"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <!-- <h5 class="modal-title" id="exampleModalLabel">Kategori</h5> -->
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-makanan2 text-center" v-for="item in detail_transaction" :key="item.id" >

                            <img :src="item.product.image_url"  align="middle" alt="">

                            <p class="makanan2">
                                {{item.product.name}}
                                <br>
                                Stock : {{item.product.stock}}</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="hapus" class="btn btn-danger btn-lg center-block">
                            <i class="bx bx-minus-circle" data-dismiss="modal">Batal</i>
                        </button>

                        <button type="button" id="edit" class="btn btn-primary btn-lg center-block">
                            <i class="bx bx-check" data-dismiss="modal">Pilih</i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import Swal from "sweetalert2";

    export default {
        data() {
            return {
                stores: [],
                transaction: [{
                    id:"",
                }],
                store_id: "",
                price: "",
                pay: "",
                discount: "",
                change: "",
                counter: "",
                tanggal: "",
                detail_transaction: [{
                    product_id:"",
                    qty:"",
                    transaction_id:"",
                    product:[{
                        name:"",
                        image_url:"",
                        stock:"",
                    }]
                }],
            };
        },
        mounted() {
            this.getStore()
            this.getTransaksi()
            this.getDetailTransaksi()
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
            getTransaksi() {
                axios
                    .get(
                        "https://api-kasirin.jaggs.id/api/transaction?tanggal=&store_id=" + this.tanggal + this
                        .store_id, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("access_token"),
                            },
                        }
                    )
                    .then((res) => {
                        console.log(res);
                        this.transaction = res.data.data;
                    })
                    .catch((err) => {
                        this.transaction = "";
                        Swal.fire(
                            "Anda Belum Mempunyai Transaksi",
                            "Silahkan Tambahkan Transaksi Terlebih Dahulu",
                            "warning"
                        );
                        console.log(err);
                    });
            },
            getDetailTransaksi() {
                axios
                    .get(
                        "https://api-kasirin.jaggs.id/api/detail-transaction?transaction_id=73", 
                        localStorage.getItem("id"), {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("access_token"),
                            },
                        }
                    )
                    .then((res) => {
                        this.detail_transaction = res.data.data;
                        this.transaction_id = res.data.data
                    })
                    .catch((err) => {
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
                                Swal.fire("Terhapus", "Karyawan Anda Sudah Terhapus", "success");
                                this.getEmployee();
                                console.log(res);
                            })
                            .catch((err) => {
                                Swal.fire("Gagal", "Karyawan Anda Gagal Terhapus", "warning");
                                console.log(err);
                            });
                    } else {
                        Swal.fire("Gagal", "Karyawan Anda Gagal Terhapus", "warning");
                    }
                });
            },
        },
    };
</script>
<style scoped>
    img {
        width: 70px;
        height: 70px;
        margin-top: 10px;
    }

    .makanan2 {
        font-weight: bold;
        color: #4CAF50;
        text-align: center;
        font-size: 15px;
    }

    .container-makanan2 {
        /* width: 100px; */
        height: 100px;
        margin: auto;

    }

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