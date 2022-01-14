<template>
  <div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-8" style="padding-bottom:25px; margin-top:-25px; padding-left:85.5%;">
            <button type="button" @click="back">&#8592; Kembali</button>
        </div>
      </div>
      <div class="wrap-input100 validate-input">
        <input class="input100" v-model="form.name" type="text" name="name"
          placeholder="Silahkan Masukkan Nama Kategori">
        <span class="focus-input100"></span>
        <span class="symbol-input100">
          <i class="fas fa-list-ul" aria-hidden="true"></i>
        </span>
      </div>
                <the-error :errors="errors.name" class="error"></the-error>


      <button @click="update" type="button" name="button" class="sv">
                <i class="fas fa-pencil-alt fa-fw"></i> Edit Kategori
        
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
      back(){
        this.$router.push({
              name: "Category"
            });
      },
      getData() {
        axios
          .get("http://127.0.0.1:8000/api/category/" + this.category_id, {
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
            "http://127.0.0.1:8000/api/category/edit/" + this.category_id,
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
  #preview {
    border: 2px dashed grey;
    padding: 1rem;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #preview img {
    width: 30%;
    object-fit: cover;
  }

  .error {
    padding-bottom: 5px;
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

  h1 {
    font-family: Arial, Helvetica, sans-serif;
    color: #5D9EFE;
    font-size: 18px;
    font-weight: bold;
    padding-top: 75px;
  }

  .col-md-6 {
    padding-left: 45px;
  }

  .tambahproduk {
    width: 100%;
  }

  .label {
    color: white;
    padding: 10px 18px;
    font-size: 17px;
    border-radius: 10px;
    font-family: Arial, Helvetica, sans-serif;
  }

  .info {
    background-color: #5D9EFE;
  }

  /* Blue */

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

  .kembali {
    text-align: right;
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

  .judul {
    padding-left: 28px;
    color: #5D9EFE;
    font-family: sans-serif;
    font-size: 18px;
    margin-bottom: 5px;
  }

  .judul1 {
    padding-left: 28px;
    padding-top: 20px;
    color: #5D9EFE;
    font-family: sans-serif;
    font-size: 18px;
    margin-bottom: 5px;
  }

  .input200 {
    font-size: 15px;
    line-height: 2.5;
    color: black;

    display: block;
    width: 100%;
    background: whitesmoke;
    border-radius: 25px;
    padding: 0 30px 0 68px;
  }

  h1 {
    font-family: Arial, Helvetica, sans-serif;
    color: #5D9EFE;
    font-size: 18px;
    font-weight: bold;
    padding-top: 75px;
  }

  label {
    color: #5D9EFE;
  }


  .kembali {
    text-align: right;
  }

  .judul {
    color: #5D9EFE;
    font-family: sans-serif;
    font-size: 18px;
    padding-top: 10px;
    margin-bottom: 5px;
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
</style>