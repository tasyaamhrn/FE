<template>
  <div class="container">
    <div class="store">
      <div class="row">
        <div class="col-md-8">
          <h1>Langganan</h1>
        </div>
        <div class="col-md-4" style="visibility:hidden;">
          <div class="add">
            <router-link to=""
              ><button type="button" id="btn-add">+ Tambah</button>
            </router-link>
          </div>
        </div>
        <div class="card-body">
          <table
            class="table table-bordered"
            v-show="!updateSubmit"
            :disabled="loading"
          >
            <thead class="tbl">
              <tr>
                <th>Jenis Langganan</th>
                <th>Deskripsi</th>
                <!-- <th>Image</th> -->
                <th>Harga</th>
                <th>Durasi</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in subscription" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.description }}</td>
                <!-- <td><img :src="item.image_url" style="width: 20%" alt="Subscription Image" /></td> -->
                <td>Rp. {{ item.price }}</td>
                <td>{{ item.duration }} hari</td>
               <router-link :to="{ name: 'AddLangganan', params: { id: item.id } }">
              <button type="button" class="btn btn-primary">
                Daftar
              </button>
            </router-link>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
h1 {
  font-family: Arial, Helvetica, sans-serif;
  color: #4caf50;
  font-size: 18px;
  font-weight: bold;
  padding-top: 75px;
}

.add {
  margin-top: 65px;
  float: right;
  text-align: center;
}
.tbl {
  background-color: #4caf50;
  color: white;
}
.btn-save {
  margin-top: 20px;
  border-radius: 10px;
  background-color: #4caf50;
  float: right;
  font-weight: bold;
  color: white;
  border-color: transparent;
  width: 150px;
  height: 40px;
}

#btn-add {
  background-color: #4caf50;
  border-color: transparent;
  color: white;
  border-radius: 10px;
  width: 150px;
  height: 40px;
  font-weight: bold;
}
</style>
<script>
import axios from "axios";

import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn",
      user: "user",
    }),
  },
  data() {
    return {
      subscription: {},
      updateSubmit: false,
      loading: false,
    };
  },
  methods: {
    load() {
      axios
        .get(
          "https://api-kasirin.jaggs.id/api/subscription",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        )
        .then(({ data }) => {
          this.subscription = data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.load();
  },
};
</script>
