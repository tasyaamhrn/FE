<template>
  <section class="register">
    <div class="container ">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p class="login-title">
                    Registrasi
                  </p>
                  <form class="mx-1 mx-md-4">
                    <div class="wrap-input100 validate-input">
                      <input class="input100" v-model="form.name" type="text" name="name"
                        placeholder="Silahkan Masukkan Nama">
                      <span class="focus-input100"></span>
                      <span class="symbol-input100">
                        <i class="fas fa-user" aria-hidden="true"></i>
                      </span>
                    </div>

                    <div class="wrap-input100 validate-input">
                      <input class="input100" v-model="form.email" type="text" name="email"
                        placeholder="Silahkan Masukkan Email">
                      <span class="focus-input100"></span>
                      <span class="symbol-input100">
                        <i class="fas fa-envelope" aria-hidden="true"></i>
                      </span>
                    </div>

                    <div class="wrap-input100 validate-input">
                      <input class="input100" v-model="form.address" type="text" name="address"
                        placeholder="Silahkan Masukkan Alamat">
                      <span class="focus-input100"></span>
                      <span class="symbol-input100">
                        <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                      </span>
                    </div>

                    <div class="wrap-input100 validate-input">
                      <select class="input100" v-model="form.gender">
                        <option value="" disabled>Jenis Kelamin</option>
                        <option> Male </option>
                        <option> Female </option>
                      </select>
                      <span class="focus-input100"></span>
                      <span class="symbol-input100">
                        <i class="fas fa-venus-mars" aria-hidden="true"></i>
                      </span>
                    </div>

                    <div class="wrap-input100 validate-input">
                      <input class="input200" type="file" accept="avatar/*" @change="onImageSelected" name="avatar">
                      <span class="focus-input100"></span>
                      <span class="symbol-input100">
                        <i class="far fa-image" aria-hidden="true"></i>
                      </span>
                    </div>

                    <div class="wrap-input100 validate-input">
                      <input class="input100" v-model="form.phone" type="tel" name="phone"
                        placeholder="Silahkan Masukkan Nomor Telepon">
                      <span class="focus-input100"></span>
                      <span class="symbol-input100">
                        <i class="fas fa-phone" aria-hidden="true"></i>
                      </span>
                    </div>

                    <div class="wrap-input100 validate-input">
                      <input class="input100" v-model="form.password" type="password" name="password"
                        placeholder="Silahkan Masukkan Password">
                      <span class="focus-input100"></span>
                      <span class="symbol-input100">
                        <i class="fas fa-lock" aria-hidden="true"></i>
                      </span>
                    </div>
                  
                   <div class="container-login100-form-btn">
                        <button class="login100-form-btn"  @click="register" type="button">
                          Register
                        </button>
                      </div>
                  </form>
                  <div class="text-center">
                    <p>
                      Or
                      <span style="color: #337ab7;text-decoration: none;" @click="toggleBtn">
                        Login
                      </span>
                    </p>
                  </div>
                </div>
                <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-2 ">
                  <img src="../assets/logo-pelaris-07.png" class="img-fluid" alt="Sample image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import axios from "axios";
  import Swal from "sweetalert2";

  export default {
    data() {
      return {
        form: {
          name: "",
          email: "",
          fcm_token: null,
          address: "",
          gender: "",
          avatar: "",
          phone: "",
          password: "",
        },
        errors: [],
      };
    },
    methods: {
      toggleBtn() {
        this.$parent.toggle = !this.$parent.toggle;
      },
      onImageSelected(event) {
        this.form.avatar = event.target.files[0];
      },
      register() {
        let formData = new FormData();
        formData.set("name", this.form.name);
        formData.set("email", this.form.email);
        formData.set("address", this.form.address);
        formData.set("gender", this.form.gender);
        formData.set("avatar", this.form.avatar);
        formData.set("phone", this.form.phone);
        formData.set("password", this.form.password);
        axios
          .post("https://api-kasirin.jaggs.id/api/register", formData)
          .then((res) => {
            Swal.fire("Berhasil", res.data.message, "success");
            console.log(res);
            this.$router.push({
              name: "Login",
            });
            this.$parent.toggle = false;
          })
          .catch((err) => {
            this.errors = err.response.data;
            Swal.fire("Gagal", err.data.message, "warning");
          });
      },
    },
  };
</script>

<style scoped>
  .register {
    height: 100vh;
    background: linear-gradient(to top right, #4A87FE, #4D8AFE, #82CCFE);
  }

  .container {
    height: 100%;
  }

  .text-black {
    border-radius: 25px;
  }

  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');


  p {
    text-align: center;
    padding-top: 10px;
  }

  .form-control {
    margin-top: 3%;
  }

  .btn-success {
    margin-top: 3%;
  }

  .img-fluid {
    width: 100%;
  }

  .login-title {
    font-family: 'Poppins';
    font-size: 24px;
    color: #333333;
    line-height: 1.2;
    text-align: center;

    width: 100%;
    display: block;
    padding-bottom: 20px;
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

  .container-login100-form-btn {
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-top: 20px;
  }

  .login100-form-btn {
    font-family: Montserrat-Bold;
    font-size: 15px;
    line-height: 1.5;
    color: #fff;
    text-transform: uppercase;

    width: 100%;
    height: 50px;
    border-radius: 25px;
    background: #4D8AFE;
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

  .login100-form-btn:hover {
    background: grey;
  }
</style>