<template>
  <div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-6">
          <h3>TAMBAH KATEGORI</h3>
        </div>
        <div class="col-md-6">
          <div class="kembali">
            <router-link to="category">
              <button type="button">&#8592; Kembali</button>
            </router-link>
          </div>
        </div>
        <div class="col-md-12">
          <form @submit.prevent="save">
            <div class="form-group">
              <label>Pilih Toko</label>
              <select class="form-control" v-model="form.store_id">
                <option>Pilih Store</option>
                <option
                  class="dropdown-item"
                  v-for="(store, index) in user_store"
                  :key="index"
                  :value="store.store.id"
                >
                  {{ store.store.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Nama Kategori</label>
              <input
                type="text"
                class="form-control"
                id="namakategori"
                v-model="form.name"
                name=""
                value=""
              />
            </div>
            <button
              type="submit"
              v-show="!updateSubmit"
              name="button"
              class="sv"
            >
              SAVE
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
label {
  color: #4caf50;
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
