<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <label>TAMBAH KATEGORI</label>
        </div>
        <div class="col-md-6">
          <div class="kembali">
            <router-link to="category">
              <button type="button">&#8592; Kembali</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <p class="judul">Nama Kategori</p>
      <form @submit.prevent="save">
        <input type="hidden" v-model="form.id" name="" value="" />
        <input type="text" v-model="form.name" name="" value="" /><br />
        <input type="hidden" v-model="form.store_id" name="" value="" />
        <button type="submit" v-show="!updateSubmit" name="button">SAVE</button>
      </form>
      <!-- <input type="text" class="form-control" id="namakategori"  placeholder="Masukkan Nama Kategori..">
            <router-link to="/category"><button type="button" class="btn-save">Simpan</button></router-link> -->
    </div>
  </div>
</template>

<style scoped>
label {
  padding-top: 90px;
  margin-bottom: 15px;
  color: #4caf50;
  font-size: 20px;
  font-weight: bold;
  font-family: sans-serif;
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
  color: #4caf50;
  font-family: sans-serif;
  font-size: 18px;
  padding-top: 10px;
  margin-bottom: 5px;
}

.btn-save {
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
<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        id: "",
        name: "",
        store_id: "",
      },
      categories: [],
      updateSubmit: false,
    };
  },
  methods: {
    save() {
      axios
        .post(
          "https://api-kasirin.jaggs.id/api/category/store",
          {
              name: this.form.name,
              store_id: 1,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.access_token,
            },
          }
        )
        .then(res => {
            console.log(res.data);
        //   this.load();
          this.form.name = "";
          alert("saving...");
           this.$router.push({
          name:'Category'
        })
        })
        .catch(err => {
            console.log(err);
          alert("saving error");
        });
    },
  },
};
</script>