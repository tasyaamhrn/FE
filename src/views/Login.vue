<template>
  <div>
    <section class="vh-100" style="background: linear-gradient(to top right, #4A87FE, #4D8AFE, #82CCFE);
;" v-if="!toggle">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-lg-12 col-xl-11">
            <div class="card text-black" style="border-radius: 25px;">
              <div class="card-body p-md-5">
                <div class="row justify-content-center">
                  <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p class="login-title">
                      Silahkan Login
                    </p>
                    <div class="alert alert-danger" v-for="(error, index) in errors" :key="index">
                      {{ error[0] }}
                    </div>
                    <form @submit.prevent="userLogin" method="post" class="mx-1 mx-md-4">
                      <div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                        <input class="input100" v-model="form.email" type="text" name="email" placeholder="Email">
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                          <i class="fa fa-envelope" aria-hidden="true"></i>
                        </span>
                      </div>
                      <div class="wrap-input100 validate-input" data-validate="Password is required">
                        <input class="input100" type="password" v-model="form.password" name="pass"
                          placeholder="Password">
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                          <i class="fa fa-lock" aria-hidden="true"></i>
                        </span>
                      </div>


                      <div class="container-login100-form-btn">
                        <button class="login100-form-btn">
                          Login
                        </button>
                      </div>
                    </form>
                    <p>
                      Don't have an account?
                      <span style="color: #337ab7;text-decoration: none;" @click="toggleBtn">
                        Register
                      </span>
                    </p>
                    
                  </div>
                  <div class="col-md-10 col-lg-6 col-xl-6 d-flex">
                    <img src="../assets/logo-pelaris-06.png" class="img-fluid" alt="Sample image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <the-register v-else> </the-register>
  </div>
</template>

<script>
  import TheRegister from "./Register.vue";
  export default {
    components: {
      TheRegister
    },
    data() {
      return {
        form: {
          email: "",
          password: "",
        },
        toggle: false,
        errors: null,
      };
    },
    methods: {
      toggleBtn() {
        this.toggle = !this.toggle;
      },
      userLogin() {
        this.$store
          .dispatch("login", this.form)
          .then((response) => {
            console.log(response);
            this.alertSuccess();
            this.$router.push({
              name: "Home",
            });
          })
          .catch((error) => {
            this.alertError();
            this.errors = error.response.data.errors;
          });
      },
      alertSuccess() {
        this.$swal({
          type: "success",
          title: "Success",
          text: "Login Berhasil!",
        });
      },
      alertError() {
        this.$swal({
          type: "error",
          title: "Oops...",
          text: "Login gagal! periksa email dan password anda",
        });
      },
    },
  };
</script>

<style scoped>
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
    width: 60%;
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