<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-8" style="padding-bottom:25px; margin-top:-25px; padding-left:85.5%;">
            <router-link to="store">
              <button type="button">&#8592; Kembali</button>
            </router-link>
        </div>
      </div>
      <div class="wrap-input100 validate-input">
        <input class="input100" v-model="form.name" type="text" name="name"
          placeholder="Silahkan Masukkan Nama Toko Anda">
        <span class="focus-input100"></span>
        <span class="symbol-input100">
          <i class="fas fa-store" aria-hidden="true"></i>
        </span>
      </div>
        <the-error :errors="errors.name" class="error"></the-error>

      <div class="wrap-input100 validate-input">
        <input class="input100" v-model="form.address" type="text" name="address"
          placeholder="Silahkan Masukkan Alamat Toko Anda">
        <span class="focus-input100"></span>
        <span class="symbol-input100">
          <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
        </span>
      </div>
        <the-error :errors="errors.address" class="error"></the-error>
      <button @click="createStore" type="button" name="button" class="sv">
        <i class="bx bx-plus"></i> Tambah Toko
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
    components: {
      TheError
    },
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
          .then((res) => {
            Swal.fire("Berhasil", res.data.message, "success");
            this.$router.push({
              name: "Store"
            });
          })
          .catch((err) => {
            this.errors = err.response.data;
          });
      },
    },
  };
</script>
<style scoped>
  .error{
    padding-bottom: 10px;
  }

  button {
    margin-top: 90px;
    border-radius: 15px;
    background-color: #5D9EFE;
    width: 150px;
    height: 40px;
    color: white;
    border-color: transparent;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 25px;

    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
    padding: 0;
    border: none;
  }

  h1 {
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
    /* height: 30px; */
    color: white;
    border-color: transparent;
    font-weight: bold;
  }

  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');

  .img-fluid {
    width: 100%;
  }

  .wrap-input100 {
    position: relative;
    width: 100%;
    z-index: 1;
    margin-bottom: 10px;
  }

  .input100 {
    font-size: 15px;
    line-height: 1.5;
    color: black;

    display: block;
    width: 100%;
    background: whitesmoke;
    height: 50px;
    border-radius: 25px;
    padding: 0 30px 0 68px;
    border: none;
  }


  .focus-input100 {
    display: block;
    position: absolute;
    border-radius: 25px;
    bottom: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    box-shadow: 0px 0px 0px 0px;
    color: rgba(130, 204, 254, 0.8);
  }

  .input100:focus+.focus-input100 {
    -webkit-animation: anim-shadow 0.5s ease-in-out forwards;
    animation: anim-shadow 0.5s ease-in-out forwards;
  }

  @-webkit-keyframes anim-shadow {
    to {
      box-shadow: 0px 0px 70px 25px;
      opacity: 0;
    }
  }

  @keyframes anim-shadow {
    to {
      box-shadow: 0px 0px 70px 25px;
      opacity: 0;
    }
  }

  .symbol-input100 {
    font-size: 15px;

    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    position: absolute;
    border-radius: 25px;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding-left: 35px;
    pointer-events: none;
    color: #666666;

    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
  }

  .input100:focus+.focus-input100+.symbol-input100 {
    color: #82CCFE;
    padding-left: 28px;
  }

  button:hover {
    background: #82CCFE;
    text-decoration: none;
  }
</style>