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
        <input type="file" accept="image/*" class="form-control" @change="onImageSelected" />
      </div>
      <button @click="addLangganan" type="submit" name="button" class="sv">
        SAVE
      </button>
    </div>
  </div>
</template>
<script>
  import axios from "axios";
  import Swal from 'sweetalert2';

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
        console.log(formData.get('subscription_id'));
        axios
          .post("https://api-kasirin.jaggs.id/api/subscriber/edit/" + this.$route.params.id, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          })
          .then((res) => {
            this.$router.push({
              name: "Langganan"
            });
            console.log(res);
            Swal.fire("Terupdate", res.data.message, "success");
          })
          .catch((err) => {
            this.errors = err.response.data;
            console.log(err.response.data);
            Swal.fire("Gagal", "Anda Gagal Mendaftar", "warning");

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
</style>