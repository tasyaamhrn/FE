<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <h1>Daftar Langganan</h1>
        </div>
      </div>
      <div class="form-group">
        <label>Foto Struck</label>
         <input type="file" accept="foto_struk/*" class="form-control" @change="onImageSelected" />
      </div>
      <button @click="addLangganan" type="button" name="button" class="sv">
        SAVE
      </button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "AddLangganan",
  data() {
    return {
      form: {
        subscription_id: this.$route.params.id,
        foto_struk: "",
      },
    };
  },
  methods: {
     onImageSelected(e) {
                this.form.foto_struk = e.target.files[0];
            },
    addLangganan() {
         let formData = new FormData();
                formData.set("subscription_id", this.form.subscription_id);
                formData.set("foto_struk", this.form.foto_struk);
                console.log(formData.get('foto_struk'));
      axios
        .post("https://api/subscriber/edit/" + this.$route.params.id, formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then(() => {
          this.alertSuccess();
          this.$router.push({ name: "Langganan" });
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
