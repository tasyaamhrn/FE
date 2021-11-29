<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <h1>TAMBAH KATEGORI</h1>
        </div>
        <div class="col-md-4">
          <div class="kembali">
            <router-link to="faq">
              <button type="button">&#8592; Kembali</button>
            </router-link>
          </div>
        </div>
        <div class="col-md-12">
          <form @submit.prevent="save">
            <div class="form-group">
              <label>Pertanyaan</label>
              <input type="text" class="form-control" id="namakategori" v-model="form.name" name="" value="" />
            </div>
            <div class="form-group">
              <label>Jawaban</label>
              <input type="text" class="form-control" id="namakategori" v-model="form.name" name="" value="" />
            </div>
            <button type="submit" v-show="!updateSubmit" name="button" class="sv">
              SAVE
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

  button {
    margin-top: 75px;
    border-radius: 10px;
    background-color: #376caf;
    width: 150px;
    height: 40px;
    color: white;
    border-color: transparent;
    font-weight: bold;
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
<script>
  import axios from "axios";
  export default {
    data() {
      return {
        form: {
          name: "",
          store_id: "",
        },
        categories: [],
        stores: [],
      };
    },
    mounted() {
      this.getStore();
    },
    methods: {
      getStore() {
        axios
          .get(
            "https://api-kasirin.jaggs.id/api/user-stores?user_id=" +
            localStorage.getItem("id"), {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
              },
            }
          )
          .then((res) => {
            this.stores = res.data.data;
          })
          .catch((err) => {
            console.log(err);
          });
      },
      save() {
        axios
          .post(
            "https://api-kasirin.jaggs.id/api/category/store", {
              name: this.form.name,
              store_id: this.form.store_id,
            }, {
              headers: {
                Authorization: "Bearer " + localStorage.access_token,
              },
            }
          )
          .then(() => {
            this.$router.push({
              name: "Category",
            });
          })
          .catch((err) => {
            console.log(err);
            alert("saving error");
          });
      },
    },
  };
</script>