<template>
  <div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-6">
          <h3>EDIT KATEGORI</h3>
        </div>
      </div>
      <div class="form-group">
        <label>Nama Kategori</label>
        <input type="text" class="form-control" v-model="form.name" placeholder="Masukkan Nama Kategori.." />
        <the-error :errors="errors.name"></the-error>
      </div>

      <button @click="update" type="button" name="button" class="sv">
        SAVE
      </button>
    </div>
  </div>
</template>
<script>
  import axios from "axios";
  import TheError from "../components/ErrorForm.vue";
  import Swal from "sweetalert2";

  export default {
    name: "EditCategory",
    components: {
      TheError
    },
    data() {
      return {
        form: {
          // user_id: this.$store.state.auth.user.id,
          name: "",
          store_id: "",
        },

        errors: [],
        //   user: this.$store.state.auth.user,
        category_id: this.$route.params.id,
      };
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        axios
          .get("https://api-kasirin.jaggs.id/api/category/" + this.category_id, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          })
          .then((res) => {
            this.form.name = res.data.data.name;
            this.form.store_id = res.data.data.store_id

          })
          .catch((err) => {
            console.log(err);
          });
      },
      update() {
        axios
          .post(
            "https://api-kasirin.jaggs.id/api/category/edit/" + this.category_id,
            this.form, {
              headers: {
                Authorization: "Bearer " + localStorage.access_token,
              },
            }
          )
          .then((res) => {
            this.$router.push({
              name: "Category"
            });
            Swal.fire("Terupdate", res.data.message, "success");
          })
          .catch((err) => {
            this.errors = err.response.data;
            Swal.fire("Gagal", "Kategori Anda Gagal diupdate", "warning");
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
    color: #5D9EFE;
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
    color: #5D9EFE;
    font-size: 18px;
    font-weight: bold;
    padding-top: 75px;
  }

  .sv {
    margin-top: 20px;
    border-radius: 10px;
    background-color: #5D9EFE;
    float: right;
    color: white;
    border-color: transparent;
    font-weight: bold;
  }
</style>