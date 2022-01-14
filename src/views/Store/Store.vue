<template>
  <div class="container">
    <div class="store">
      <div class="row">
        <div class="col-md-8">
          <h1>TOKO</h1>
        </div>
        <div class="col-md-4">
          <div class="add">
            <router-link to="/AddStore"><button type="button" id="btn-add">+ Tambah</button>
            </router-link>
          </div>
        </div>
        <div class="card-body">
          <table class="table table-bordered" v-show="!updateSubmit" :disabled="loading">
            <thead class="tbl">
              <tr>
                <th>Store Name</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in stores" :key="item.id">
                <td>{{ item.store.name }}</td>
                <td>{{ item.store.address }}</td>
                <td>
                  <router-link :to="{ name: 'EditStore', params: { id: item.store.id } }">
                    <button type="button" class="btn btn-primary">
                      Edit
                    </button>
                  </router-link>
                  <button type="button" class="btn btn-danger" @click="deleteData(item.store.id)">
                    Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  h1 {
    font-family: Arial, Helvetica, sans-serif;
    color: #5D9EFE;
    font-size: 18px;
    font-weight: bold;
    padding-top: 75px;
  }

  .add {
    margin-top: 65px;
    float: right;
    text-align: center;
  }

  .tbl {
    background-color: #5D9EFE;
    color: white;
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
   #btn-add:hover {
    background: #82CCFE;
    text-decoration: none;
  }
</style>
<script>
  import axios from "axios";

  import Swal from "sweetalert2";
  import {
    mapGetters
  } from "vuex";

  export default {
    computed: {
      ...mapGetters({
        isLoggedIn: "isLoggedIn",
        user: "user",
      }),
    },
    data() {
      return {
        stores: {
          id: "",
          name: "",
          address: "",
        },
        updateSubmit: false,
        loading: false,
      };
    },
    methods: {
      load() {
        axios
          .get(
            "http://127.0.0.1:8000/api/user-stores?user_id=" +
            localStorage.getItem("id"), {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
              },
            }
          )
          .then(({
            data
          }) => {
            this.stores = data.data;
          })
          .catch((err) => {
            console.log(err);
            Swal.fire("Gagal", "Anda Belum Mempunyai Store", "warning");

          });
      },
      deleteData(id) {
        Swal.fire({
          title: "Anda Yakin Ingin Menghapus Store Ini ?",
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
              .delete("http://127.0.0.1:8000/api/stores/" + id)
              .then((res) => {
                Swal.fire("Terhapus", res.data.message, "success");
                this.load();
              })
              .catch((err) => {
                Swal.fire("Gagal", err.data.message, "warning");
                console.log(err)
              });
          } else {
            Swal.fire("Gagal", "Store Anda Gagal Terhapus", "warning");
          }
        });
      },
    },
    mounted() {
      this.load();
    },
  };
</script>