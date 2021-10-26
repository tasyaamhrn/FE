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
                            <button type="button">
                                &#8592; Kembali
                            </button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <p class="judul">
                Nama Kategori
            </p>
            <form>
               <input-form :errors="errors.name">
                      <template v-slot:form>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Masukkan Nama Kategori"
                          v-model="form.name"
                        
                        />
                      </template>
               </input-form>
                    <button
                        @click="add"
                        type="button"
                        class="btn-save"
                      >
                        Simpan
                      </button>
            <!-- <input type="text" class="form-control" id="namakategori"  placeholder="Masukkan Nama Kategori..">
            <router-link to="/category"><button type="button" class="btn-save">Simpan</button></router-link> -->
            </form> 
        </div>
    </div>
</template>
<script>
import axios from "axios";
import InputForm from "../components/inputForm.vue";
export default {
  data() {
    return {
      form: {
        name: "",
        
      },
      errors: [],
    };
  },
  components: { InputForm },
  methods: {
    add() {
      axios
        .post("https://api-kasirin.jaggs.id/api/category", this.form)
        .then((res) => console.log(res));
        this.$router.push({
          name:'Category'
        })
        .catch((err) => {
          this.errors = err.response.data;
        });
    },
  },
};
</script>

<style scoped>
    label {
        padding-top: 90px;
        margin-bottom: 15px;
        color: #4CAF50;
        font-size: 20px;
        font-weight: bold;
        font-family: sans-serif;
    }

    button {
        margin-top: 75px;
        border-radius: 10px;
        background-color: #376CAF;
        width: 150px;
        height: 40px;
        color: white;
        border-color: transparent;
        font-weight:bold;
    }

    .kembali {
        text-align: right;
    }

    .judul {
        color: #4CAF50;
        font-family: sans-serif;
        font-size: 18px;
        padding-top: 10px;
        margin-bottom: 5px;
    }

    .btn-save {
        margin-top: 20px;
        border-radius: 10px;
        background-color: #4CAF50;
        float: right;
        /* height: 30px; */
        color: white;
        border-color: transparent;
         font-weight:bold;
    }
</style>