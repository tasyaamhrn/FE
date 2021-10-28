<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <!-- <label>TAMBAH PRODUK</label> -->
        </div>
      </div>
    </div>
    <div class="container">
      <p class="judul">
        Nama Toko
      </p>
      <input
        type="text"
        class="form-control"
        id="namatoko"
        v-model="form.name"
        placeholder="Masukkan Nama Toko.."
      />
      <p class="judul">
        Alamat Toko
      </p>
      <input
        type="text"
        class="form-control"
        id="alamattoko"
        v-model="form.address"
        placeholder="Masukkan Alamat Toko.."
      />
      <button @click="createStore" type="button" class="btn btn-success btn-lg">
        Daftar
      </button>
    </div>
  </div>
</template>
<style scoped>
.col-lg-12 {
  height: 34px;
}
label {
  padding-top: 90px;
  margin-bottom: 15px;
  color: #4caf50;
  font-size: 20px;
  font-weight: bold;
  font-family: sans-serif;
}

button {
  margin-top: 90px;
  border-radius: 15px;
  background-color: #376caf;
  width: 150px;
  height: 40px;
  color: white;
  border-color: transparent;
}

.kembali {
  text-align: right;
}

.judul {
  color: #4caf50;
  font-family: sans-serif;
  font-size: 18px;
  padding-top: 10px;
  margin-bottom: 5px;
}
</style>
<script>
import axios from "axios";
export default {
  name: "AddStore",
  data() {
    return {
      data: "test",
      form: {
        user_id: this.$store.state.auth.user.id,
        name: "",
        address: "",
      },
      user: this.$store.state.auth.user,
    };
  },
  methods: {
    createStore() {
      axios
        .post("https://api-kasirin.jaggs.id/api/stores", this.form, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then(() => console.log("sukses"))
        .catch(() => console.log("gagal"));
    },
  },
};
</script>
