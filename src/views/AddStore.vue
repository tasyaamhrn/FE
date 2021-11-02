<template>
  <div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-6">
          <h3>TAMBAH TOKO</h3>
          <!-- <button @click="createStore" type="button" class="btn btn-success btn-lg">
            DAFTAR
          </button> -->
        </div>
      </div>
    </div>
    <div class="container">
      <p class="judul">
        Nama Toko
      </p>
      <input type="text" class="form-control" id="namatoko" v-model="form.name" placeholder="Masukkan Nama Toko.." />
      <p class="judul">
        Alamat Toko
      </p>
      <input type="text" class="form-control" id="alamattoko" v-model="form.address"
        placeholder="Masukkan Alamat Toko.." />
      <button @click="createStore" type="button" name="button" class="sv">
        SAVE
      </button>
    </div>

  </div>
</template>
<style scoped>
  .col-lg-12 {
    height: 34px;
  }

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
h3 {
  font-family: Arial, Helvetica, sans-serif;
  color: #4caf50;
  font-size: 18px;
  font-weight: bold;
  padding-top: 75px;
}
  .judul {
    color: #4caf50;
    font-family: sans-serif;
    font-size: 18px;
    padding-top: 10px;
    margin-bottom: 5px;
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
        this.alertSuccess();
        this.$router.push({
            name: 'Store'
          })
          .catch(() => console.log("gagal"))
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