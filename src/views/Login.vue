<template>
  <div>
    <section class="vh-100" style="background-color: #eee;" v-if="!toggle">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-lg-12 col-xl-11">
            <div class="card text-black" style="border-radius: 25px;">
              <div class="card-body p-md-5">
                <div class="row justify-content-center">
                  <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Selamat Datang di Plaris
                    </p>
                    <div
                      class="alert alert-danger"
                      v-for="(error, index) in errors"
                      :key="index"
                    >
                      {{ error[0] }}
                    </div>
                    <form
                      @submit.prevent="userLogin"
                      method="post"
                      class="mx-1 mx-md-4"
                    >
                      <input-form fa="fas fa-envelope">
                        <input
                          type="email"
                          placeholder="Masukkan Email"
                          v-model="form.email"
                          class="form-control"
                        />
                      </input-form>
                      <input-form fa="fas fa-lock">
                        <input
                          type="password"
                          placeholder="Masukkan Password"
                          v-model="form.password"
                          class="form-control"
                        />
                      </input-form>

                      <div
                        class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                      >
                        <button type="submit" class="btn btn-success btn-lg">
                          Masuk
                        </button>
                      </div>
                    </form>
                    <p>
                      Don't have an account?
                      <span
                        style="color: #337ab7;text-decoration: none;"
                        @click="toggleBtn"
                      >
                        Register
                      </span>
                    </p>
                  </div>
                  <div
                    class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"
                  >
                    <img
                      src="../assets/shop.jpg"
                      class="img-fluid"
                      alt="Sample image"
                    />
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
<style scoped>
p {
  text-align: center;
}
.form-control {
  margin-top: 3%;
}
.btn-success {
  margin-top: 3%;
}
</style>

<script>
import TheRegister from "./Register.vue";
export default {
  components: { TheRegister },
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
