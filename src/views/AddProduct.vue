<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <button @click="product" type="button" class="btn btn-success btn-lg">
            Tambah
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
      <p class="judul1">
        Nama Produk/Layanan
      </p>
      <input-form :errors="errors.name">
        <template v-slot:form>
          <input
            class="form-control"
            id="namaproduk"
            type="text"
            placeholder="Masukkan Nama Barang"
            v-model="form.name"
          />
        </template>
      </input-form>
      <p class="judul">
        Pilih Kategori
      </p>
      <input-form :errors="errors.category_id">
        <template v-slot:form>
          <input
            class="form-control"
            id="kategoriproduk"
            type="int"
            placeholder="Pilih Kategori Barang"
            v-model="form.category_id"
          />
        </template>
      </input-form>
      <p class="judul">
        Foto Produk/Layanan
      </p>
      <input-form :errors="errors.image">
        <template v-slot:form>
          <input
            class="form-control"
            id="fotoproduk"
            type="file"
            placeholder="Masukkan Foto Barang"
          />
        </template>
      </input-form>
      <p class="judul">
        Harga Produk/Layanan
      </p>
      <input-form :errors="errors.price">
        <template v-slot:form>
          <input
            class="form-control"
            id="namaproduk"
            type="text"
            placeholder="Masukkan Harga Barang"
            v-model="form.price"
          />
        </template>
      </input-form>
      <p class="judul">
        Stock Produk/Layanan
      </p>
      <input-form :errors="errors.stock">
        <template v-slot:form>
          <input
            class="form-control"
            id="stockproduk"
            type="int"
            placeholder="Masukkan Stock Barang"
            v-model="form.stock"
          />
        </template>
      </input-form>
      <p class="judul">
        Barcode Produk/Layanan
      </p>
      <input-form :errors="errors.barcode">
        <template v-slot:form>
          <input
            class="form-control"
            id="barcodeproduk"
            type="int"
            placeholder="Masukkan Nomor Barcode"
            v-model="form.barcode"
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
<style scoped>
.col-md-6{
    padding-left: 45px;
}
.tambahproduk{
    width: 100%;
}
.col-lg-12 {
  height: 34px;
}
label {
  padding-top: 90px;
  margin-bottom: 15px;
  color: #4caf50;
  font-size: 20px;
  font-weight: bold;
  font-family: sans-serif;
}

button {
  font-size: 16px;
  margin-top: 90px;
  border-radius: 15px;
  background-color: #376caf;
  width: 150px;
  height: 40px;
  color: white;
  border-color: transparent;
}

.kembali {
    font-size: 16px;
  text-align: right;
}

.judul {
  padding-left: 28px;
  color: #4caf50;
  font-family: sans-serif;
  font-size: 18px;
  margin-bottom: 5px;
}
.judul1 {
  padding-left: 28px;
  padding-top: 20px;
  color: #4caf50;
  font-family: sans-serif;
  font-size: 18px;
  margin-bottom: 5px;
}
</style>
<script>
import axios from "axios";
import InputForm from "../components/inputForm.vue";
export default {
  data() {
    return {
      form: {
        name: "",
        category_id: "",
        image: "",
        price: "",
        stock: "",
        barcode: "",
      },
      errors: [],
    };
  },
  components: { InputForm },
  methods: {
    product() {
      axios
        .post("https://api-kasirin.jaggs.id/api/product/store", this.form)
        .then((res) => {
          console.log(res);
          this.$router.push({
            name: "Product",
          });
        })
        .catch((err) => {
          this.errors = err.response.data;
        });
    },
  },
};
</script>