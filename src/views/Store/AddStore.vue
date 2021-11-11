<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <h1>TAMBAH TOKO</h1>
        </div>
      </div>
      <div class="form-group">
        <label>Nama Toko</label>
        <input
          type="text"
          class="form-control"
          v-model="form.name"
          placeholder="Masukkan Nama Toko.."
        />
        <the-error :errors="errors.name"></the-error>
      </div>
      <div class="form-group">
        <label>Alamat Toko</label>
        <textarea
          v-model="form.address"
          placeholder="Masukkan Alamat Toko"
          class="form-control"
        ></textarea>
        <the-error :errors="errors.address"></the-error>
      </div>
      <button @click="createStore" type="button" name="button" class="sv">
        SAVE
      </button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import TheError from "../../components/ErrorForm.vue";
export default {
  name: "AddStore",
  components: { TheError },
  data() {
    return {
      form: {
        user_id: this.$store.state.auth.user.id,
        name: "",
        address: "",
      },
      errors: [],
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
        .then(() => {
          this.alertSuccess();
          this.$router.push({ name: "Store" });
        })
        .catch((err) => {
          this.errors = err.response.data;
          console.log(err.response.data);
        });
    },
    alertSuccess() {
      // Use sweetalert2
      this.$swal({
        type: "success",
        title: "Success",
        text: "Toko berhasil ditambahkan",
      });
    },
    alertError() {
      // Use sweetalert2
      this.$swal({
        type: "error",
        title: "Oops...",
        text: "Toko gagal ditambahkan, silahkan coba lagi",
      });
    },
  },
};
</script>
<style scoped>
label {
  color: #4caf50;
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
h1 {
  font-family: Arial, Helvetica, sans-serif;
  color: #4caf50;
  font-size: 18px;
  font-weight: bold;
  padding-top: 75px;
}
.sv {
  margin-top: 20px;
  border-radius: 10px;
  background-color: #4caf50;
  float: right;
  /* height: 30px; */
  color: white;
  border-color: transparent;
  font-weight: bold;
}
</style>
