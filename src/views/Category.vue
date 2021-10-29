<template>
  <div class="container">
    <div class="category">
      <div class="row">
        <div class="col-8">
          <h1>KATEGORI</h1>
        </div>
        <div class="col-4">
          <div class="add">
            <router-link to="/AddCategory"><button type="button" id="btn-add">+ Tambah</button></router-link>
          </div>
        </div>
      </div>
      <ul class="list-group list-group-flush" v-for="item in categories" :key="item.id">
        <li class="list-group-item d-flex justify-content-between align-items-center">
          {{ item.name }}

          <a href="#" @click="deleteData(item.id)" class="text-danger">
                            <i class="fas fa-trash-alt red"></i></a>
        </li>
        <!-- <li class="list-group-item d-flex justify-content-between align-items-center">
                    Barang Implusif
                    <span class="hapus" data-toggle="modal" data-target="#myModal"><i class='bx bx-trash'></i></span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    Barang Darurat
                    <span class="hapus" data-toggle="modal" data-target="#myModal"><i class='bx bx-trash'></i></span>
                </li> -->
      </ul>

    </div>
    <!-- Modal -->

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
          <div class="modal-body" >
            Apakah Anda yakin ingin menghapus kategori ini?
          </div>
          <div class="modal-footer">
            <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
            
            <router-link to="EditCategory"> <button type="button" id="edit"
                class="btn btn-primary  btn-lg center-block"><i class='bx bx-edit'>Edit</i></button>
            </router-link>
          </div>
        </div>
      </div>
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
        categories: {},
      }
    },

    methods: {
      load(){
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