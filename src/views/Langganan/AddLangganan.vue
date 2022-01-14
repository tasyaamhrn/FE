<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <h1>Daftar Langganan</h1>
          <p class="panduan">1. Kirimkan uang sejumlah harga langganan yang anda pilih ke nomor rekening Bank BCA 123456789011.</p>
          <p class="panduan">2. Upload foto bukti transfer pada tombol dibawah dan kirimkan.</p>
          <p class="panduan">3. Tunggu hingga admin mengkonfirmasi pembayaran anda. Bila terdapat keluhan atau pertanyaan silahkan hubungi dokterapps.mail@gmail.com.</p>
        </div>
      </div>
      <div class="wrap-input100 validate-input">
        <input class="input200" type="file" accept="image/*" @change="onImageSelected" name="avatar">
        <span class="focus-input100"></span>
        <span class="symbol-input100">
          <i class="far fa-image" aria-hidden="true"></i>
        </span>
      </div>
      <div id="preview" v-if="url">
        <img v-if="url" :src="url" />
      </div>

      <button @click="addLangganan" type="submit" name="button" class="sv">
         <i class="bx bx-plus"></i> Tambah Langganan
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
        url: null,
      };
    },
    methods: {
      onImageSelected(e) {
        this.form.foto_struk = e.target.files[0];
        this.url = URL.createObjectURL(this.form.foto_struk);
      },
      addLangganan() {
        let formData = new FormData();
        formData.set("subscription_id", this.form.subscription_id);
        formData.set("foto_struk", this.form.foto_struk);
        console.log(formData.get('foto_struk'));
        console.log(formData.get('subscription_id'));
        axios
          .post("http://127.0.0.1:8000/api/subscriber/edit/" + localStorage.getItem("id"), formData, {
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

  .panduan{
    font-family: Arial, Helvetica, sans-serif;
    color: black;
    font-size: 15px;
    padding-bottom: 5px;
  }
</style>