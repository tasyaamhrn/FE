<template>
  <div class="container">
    <div class="category">
      <div class="row">
        <div class="col-md-8">
          <h1>KATEGORI</h1>
        </div>
        <div class="col-md-4">
          <div class="add">
            <router-link :to="{ name: 'AddCategory' }"
              ><button type="button" id="btn-add">+ Tambah</button>
            </router-link>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group">
            <select class="form-control" v-model="store_id" @change="load">
              <option value="">Pilih Toko</option>
              <option
                :value="store.store_id"
                v-for="(store, index) in user_store"
                :key="index"
              >
                {{ store.store.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <table
      class="table table-bordered"
      v-show="!updateSubmit"
      :disabled="loading"
    >
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
            <button type="button" class="btn btn-primary" @click="edit(item)">
              Edit
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteData(item.id)"
            >
              Hapus
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <form v-show="updateSubmit">
      <div class="form-group">
        <label class="judul"> Nama Kategori </label>
        <input
          type="text"
          class="form-control"
          id="namakategori"
          placeholder="Masukkan Nama Kategori.."
          v-model="form.name"
        />
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
      form: {
        name: "",
        store_id: "",
      },
      store_id: "",
      categories: {},
      user_store: this.$store.state.auth.user.user_store,
      loading: false,
      updateSubmit: false,
    };
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
    load() {
      axios
        .get(
          "https://api-kasirin.jaggs.id/api/category?store_id=" + this.store_id,
          {
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
          this.categories = "";
          Swal.fire(
            "Anda Belum Mempunyai Kategori",
            "Silahkan Tambahkan Kategori Terlebih Dahulu",
            "warning"
          );
          console.log(err);
        });
    },
    edit(item) {
      this.updateSubmit = true;
      this.form.id = item.id;
      this.form.name = item.name;
    },
    update(form) {
      axios
        .post(
          "https://api-kasirin.jaggs.id/api/category/edit/" + form.id,
          {
            name: this.form.name,
            store_id: this.store_id,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.access_token,
            },
          }
        )
        .then(() => {
          this.load();

          this.form.name = "";
          this.updateSubmit = false;
          Swal.fire("Terupdate", "kategori Anda Sudah Terupdate", "success");
        })
        .catch(() => {
          Swal.fire("Gagal", "Produk Anda Gagal diupdate", "warning");
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
            .delete("https://api-kasirin.jaggs.id/api/category/delete/" + id)
            .then((res) => {
              Swal.fire("Terhapus", "Produk Anda Sudah Terhapus", "success");
              this.load();
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
