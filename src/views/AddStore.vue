<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <button 
                        @click="product"
                        type="button"
                        class="btn btn-success btn-lg"
                      >
                        TAMBAH
                      </button>
                    <!-- <label>TAMBAH PRODUK</label> -->
                </div>
                <div class="col-md-6">
                    <div class="kembali">
                        <router-link to="product">
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
                Nama Toko
            </p>
            <input-form :errors="errors.name">
            <template v-slot:form>
                <input
                    class="form-control"
                    id="namatoko"
                    type="text"
                    placeholder="Masukkan Nama Toko"
                    v-model="form.name"
                />
            </template>  
            </input-form> 
            <p class="judul">
                Alamat Toko
            </p>
            <input-form :errors="errors.address">
            <template v-slot:form>
                <input
                    class="form-control"
                    id="alamattoko"
                    type="text"
                    placeholder="Masukkan Alamat Toko"
                    v-model="form.address"
                />
            </template>  
            </input-form>
            <p class="judul">
                ID Toko
            </p>
            <input-form :errors="errors.store_id">
            <template v-slot:form>
                <input
                    class="form-control"
                    id="idtoko"
                    type="text"
                    placeholder="Masukkan ID Toko"
                    v-model="form.store_id"
                />
            </template>  
            </input-form>
            
            <!-- <input-form :errors="errors.category_id">
            <template v-slot:form>
                <select
                    class="form-control"
                    id="kategoriproduk"
                    type="text"
                    placeholder="Masukkan Jenis Kategori"
                    v-model="form.category_id"
                />
            </template>  
            </input-form> -->

            <!-- <select class="col-lg-12" aria-label=".form-select-lg example">
                <option selected>Pilih Kategori Produk..</option>
                <option value="1">Barang Pokok</option>
                <option value="2">Barang Impulsif</option>
                <option value="3">Barang Darurat</option>
            </select> -->
            
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
        address: "",
        user_id:"",
      },
      errors: [],
    };
  },
  components: { InputForm },
  methods: {
    product() {
      axios
        .post("http://127.0.0.1:8000/api/stores", this.form)
        .then((res) => console.log(res));
        this.$router.push({
          name:'Store'
        })
        .catch((err) => {
          this.errors = err.response.data;
        });
    },
  },
};
</script>
<style scoped>
    .col-lg-12{
        height: 34px;
    }
    label {
        padding-top: 90px;
        margin-bottom: 15px;
        color: #4CAF50;
        font-size: 20px;
        font-weight: bold;
        font-family: sans-serif;
    }

    button {
        margin-top: 90px;
        border-radius: 15px;
        background-color: #376CAF;
        width: 150px;
        height: 40px;
        color: white;
        border-color: transparent;
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
</style>
<script>