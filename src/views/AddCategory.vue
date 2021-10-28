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
     
      <form @submit.prevent="save">
       <!-- <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          > 
            <span class="links_name" style="font-size:18px;">Pilih Store</span>
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a
              class="dropdown-item"
              href="#"
              v-for="(store, index) in user_store"
              :key="index"
          
              >{{ store.store_id }}</a
            >
          </div>
        </div> -->
     
<select class="form-control"  v-model="form.store_id">
  <option>Pilih Store</option>
              <option class="dropdown-item"
              href="#"
             
              v-for="(store, index) in user_store"
              :key="index"
          >{{ store.store_id }}</option>
</select>
         <p class="judul">Nama Kategori</p>
        <input type="text"  class="form-control" id="namakategori" v-model="form.name" name="" value="" />
         <button type="submit" v-show="!updateSubmit" name="button" class="sv">SAVE</button>
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
#dropdownMenuButton {
  display: flex;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  align-items: center;
  text-decoration: none;
  transition: all 0.4s ease;
  background: #fff;
  color:#4caf50;
  padding-top: 5px;
  border: 1px solid #EDEDED;
}
#dropdownMenuButton:hover {
  color: #4caf50;
}
.dropdown-item {
  color: #4caf50;
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
<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        name: "",
        store_id: "",
        
      },
       user_store: this.$store.state.auth.user.user_store,
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
              store_id: this.form.store_id,
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