<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <h1>EDIT TOKO</h1>
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
      <button @click="update" type="button" name="button" class="sv">
        SAVE
      </button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import TheError from "../../components/ErrorForm.vue";
import Swal from "sweetalert2";

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
      store_id: this.$route.params.id,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get("https://api-kasirin.jaggs.id/api/stores/" + this.store_id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then((res) => {
          this.form.name = res.data.data.name;
          this.form.address = res.data.data.address;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    update() {
      axios
        .put(
          "https://api-kasirin.jaggs.id/api/stores/" + this.store_id,
          this.form,
          {
            headers: {
              Authorization: "Bearer " + localStorage.access_token,
            },
          }
        )
        .then((res) => {
          this.$router.push({ name: "Store" });
          Swal.fire("Terupdate", res.data.message, "success");
        })
        .catch((err) => {
          this.errors = err.response.data;
          Swal.fire("Gagal", "Store Anda Gagal diupdate", "warning");
        });
    },
    alertSuccess() {
      this.$swal({
        type: "success",
        title: "Success",
        text: "Toko berhasil ditambahkan",
      });
    },
    alertError() {
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
  color: white;
  border-color: transparent;
  font-weight: bold;
}
</style>
