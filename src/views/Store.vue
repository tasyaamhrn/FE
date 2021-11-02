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
                  <table id="datatable" class="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Store Name</th>
                        <th>Address</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in stores" :key="item.id">
                        <td>{{ item.store.id }}</td>
                        <td>{{ item.store.name }}</td>
                        <td>{{ item.store.address }}</td>
                        <td>
                          <a href="#"><i class="fas fa-edit blue" style="padding-right:10px;"></i></a>
                          <a href="#" @click="deleteData(item.store.id)" class="text-danger">
                            <i class="fas fa-trash-alt red"></i></a>
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
  color: #4caf50;
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
  background-color: #4caf50;
  border-color: transparent;
  color: white;
  border-radius: 10px;
  width: 150px;
  height: 40px;
  font-weight: bold;
}
</style>
<script>
 import axios from "axios";

 import Swal from 'sweetalert2';
import { mapGetters } from "vuex";

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
          address: ""
        },
    }
  },
  methods: {
    load() {
      axios
        .get(
          "https://api-kasirin.jaggs.id/api/user-stores?user_id=" + localStorage.getItem('id'),
          {
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
            console.log(err)
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
          confirmButtonText: "Hapus"
        }).then(result => {
          if (result.value) {
            axios.delete('https://api-kasirin.jaggs.id/api/stores/' + id)
              .then(res => {
                Swal.fire(
                  "Terhapus",
                  "Store Anda Sudah Terhapus",
                  "success"
                );
                this.load();
                console.log(res);
              })
              .catch((err) => {
                Swal.fire(
                  "Gagal",
                  "Store Anda Gagal Terhapus",
                  "warning"
                );
                console.log(err)
              })
          } else {
            Swal.fire(
              "Gagal",
              "Store Anda Gagal Terhapus",
              "warning"
            );
          }
        })
      }
    
  },
mounted(){
this.load()
}
};


</script>
