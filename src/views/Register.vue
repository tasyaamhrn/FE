<template>
  <section class="register">
    <div class="container ">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    Daftar
                  </p>

                  <form class="mx-1 mx-md-4">
                    <input-form fa="fas fa-user" :errors="errors.name">
                      <template v-slot:form>
                        <input
                          type="text"
                          placeholder="Masukkan Nama"
                          v-model="form.name"
                          class="form-control"
                        />
                      </template>
                    </input-form>
                    <input-form fa="fas fa-envelope" :errors="errors.email">
                      <template v-slot:form>
                        <input
                          type="email"
                          placeholder="Masukkan Email"
                          v-model="form.email"
                          class="form-control"
                        />
                      </template>
                    </input-form>
                    <input-form
                      fa="fas fa-map-marker-alt"
                      :errors="errors.address"
                    >
                      <template v-slot:form>
                        <textarea
                          class="form-control"
                          placeholder="Masukkan Alamat Toko Anda"
                          v-model="form.address"
                        />
                      </template>
                    </input-form>
                    <input-form
                      
                      fa="fas fa-venus-mars" :errors="errors.gender" >
                      <template v-slot:form>
                              <select class="form-control" v-model="form.gender">
                                <option value="">Jenis Kelamin</option>
                                <option> Male </option>
                                <option> Female </option>
                              </select>
                      </template>
                    </input-form>
                    <input-form  fa="far fa-image" :errors="errors.avatar"  >
                      <template v-slot:form>
                        <input type="file" accept="avatar/*" class="form-control" @change="onImageSelected" />
                      </template>
                    </input-form>
                    <input-form fa="fas fa-phone" :errors="errors.phone">
                      <template v-slot:form>
                        <input
                          type="number"
                          placeholder="Masukkan Nomor Telepon"
                          v-model="form.phone"
                          class="form-control"
                        />
                      </template>
                    </input-form>
                    <input-form fa="fas fa-lock" :errors="errors.password">
                      <template v-slot:form>
                        <input
                          type="password"
                          placeholder="Masukkan Password"
                          v-model="form.password"
                          class="form-control"
                        />
                      </template>
                    </input-form>
                    
                    <div
                      class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                    >
                      <button
                        @click="register"
                        type="button"
                        class="btn btn-success btn-lg"
                      >
                        Daftar
                      </button>
                    </div>
                  </form>
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
</template>
<style scoped>
.register {
  height: 100vh;
  background-color: #eee;
}

.container {
  height: 100%;
}

.text-black {
  border-radius: 25px;
}
</style>
<script>

// import axios from "axios";
// import InputForm from "../components/inputForm.vue";
// export default {
//   data() {
//     return {
//       form: {
//         name: "",
//         email: "",
//         address: "",
//         gender: "Male",
//         avatar: "",
//         phone: "",
//         password: "",
//       },
//       errors: [],
//     };
//   },
//   components: { InputForm },
//   methods: {
//     register() {
//       axios
//         .post("https://api-kasirin.jaggs.id/api/register", this.form)
//         .then((res) => console.log(res));
//         this.$router.push({
//           name:'Login'
//         })
//         .catch((err) => {
//           this.errors = err.response.data;
//         });
//     },
//   },
// };
 import axios from "axios";
  import InputForm from "../components/inputForm.vue";
import Swal from 'sweetalert2';

  export default {
    data() {
      return {
        form: {       
        id: 2,    
        name: "",
        email: "",
        fcm_token: null,
        address: "",
        gender: "Male",
        avatar: "",
        phone: "",
        password: "",
        },
        errors: [],
      };
    },
    components: {
      InputForm
    },
    methods: {
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
          })
          .catch((err) => {
            this.errors = err.response.data;
              Swal.fire("Gagal", err.data.message, "warning");
          });
      },
    },
    mounted() {
      this.load()
    },
  };
</script>
