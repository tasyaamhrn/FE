<template>
  <div class="container">
    <div class="category">
      <div class="row">
        <div class="col-md-8">
          <h1>KATEGORI</h1>
        </div>
        <div class="col-md-4">
          <div class="add">
            <router-link :to="{ name: 'AddCategory' }"><button type="button" id="btn-add">+ Tambah</button>
            </router-link>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group">
            <select v-model="store_id" class="form-control" @change="load">
              <option value="" disabled>Pilih Toko</option>
              <option :value="store.store.id" v-for="(store, index) in stores" :key="index">
                {{ store.store.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <table class="table table-bordered" v-show="!updateSubmit" :disabled="loading">
      <thead class="thead tbl">
        <tr>
          <th scope="col">Nama Kategori</th>
          <th scope="col">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in categories" :key="item.id">
          <td>{{ item.name }}</td>
          <td>
            <router-link :to="{ name: 'EditCategory', params: { id: item.id } }">
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
    <form v-show="updateSubmit">
      <div class="form-group">
        <label class="judul"> Nama Kategori </label>
        <input type="text" class="form-control" id="namakategori" placeholder="Masukkan Nama Kategori.."
          v-model="form.name" />
      </div>

      <button type="submit" @click="update(form)" class="btn-save">
        Update
      </button>
    </form>
  </div>
</template>

<script>
  import axios from "axios";
  import Swal from "sweetalert2";
  export default {
    data() {
      return {
        form: {
          name: "",
          store_id: "",
        },
        stores: [],
        store_id: "",
        categories: {},
        loading: false,
        updateSubmit: false,
      };
    },
    mounted() {
      this.getStore();
    },
    methods: {
      getStore() {
        axios
          .get(
            "http://127.0.0.1:8000/api/user-stores?user_id=" +
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
      load() {
        axios
          .get(
            "http://127.0.0.1:8000/api/category?store_id=" + this.store_id, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
              },
            }
          )
          .then((res) => {
            console.log(res);
            this.categories = res.data.data;
          })
           .catch((err) => {
                        Swal.fire(
                            "Anda Belum Mempunyai Kategori",
                            "Silahkan Tambahkan Kategori Terlebih Dahulu",
                            "warning"
                        );
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
              .delete("http://127.0.0.1:8000/api/category/delete/" + id)
              .then((res) => {
                Swal.fire("Terhapus", "Kategori Anda Berhasil Terhapus", "success");
                this.load();
                console.log(res);
              })
              .catch((err) => {
                Swal.fire("Gagal", "Kategori Anda Gagal Terhapus", "warning");
                console.log(err);
              });
          } else {
            Swal.fire("Gagal", "Kategori Anda Gagal Terhapus", "warning");
          }
        });
      },
    },
  };
</script>
<style scoped>
  h1 {
    font-family: Arial, Helvetica, sans-serif;
    color: #5D9EFE;
    font-size: 18px;
    font-weight: bold;
    padding-top: 75px;
  }

  .tbl {
    background-color: #5D9EFE;
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
    background-color: #5D9EFE;
    float: right;
    font-weight: bold;
    color: white;
    border-color: transparent;
    width: 150px;
    height: 40px;
  }

  #btn-add {
    background-color: #5D9EFE;
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
    background-color: #5D9EFE;
  }

  #hapus {
    margin-left: 120px;
    background-color: #fd7b7b;
  }

  .modal-body {
    color: #5D9EFE;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
  }

  .close {
    color: #5D9EFE;
    font-weight: bold;
    font-size: 24px;
  }

  .list-group li {
    border-bottom: 4px solid #5D9EFE;
  }
</style>