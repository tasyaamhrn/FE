<template>
  <div class="container">
    <div class="store">
      <div class="row">
        <div class="col-md-8">
          <h1>List Langganan</h1>
        </div>
        <div class="col-md-4" style="visibility:hidden;">
          <div class="add">
            <router-link to=""><button type="button" id="btn-add">+ Tambah</button>
            </router-link>
          </div>
        </div>
        <div class="card-body">
          <table class="table table-bordered" v-show="!updateSubmit" :disabled="loading">
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
                <td data-toggle="modal" data-target="#myModal">{{ item.name }}</td>
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
        <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" data-backdrop="false"
          aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <tr v-for="i in subscription" :key="i.id">
                  <td>{{i.description}}</td>
                </tr>

              </div>
              <div class="modal-footer">
                <button type="button" id="hapus" class="btn btn-danger btn-lg center-block">
                  <i class="bx bx-minus-circle" data-dismiss="modal">Batal</i>
                </button>

                <button type="button" id="edit" class="btn btn-primary btn-lg center-block">
                  <i class="bx bx-check" data-dismiss="modal">Pilih</i>
                </button>
              </div>
            </div>
          </div>
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

  .add {
    margin-top: 65px;
    float: right;
    text-align: center;
  }

  .tbl {
    background-color: #5D9EFE;
    color: white;
  }

  .btn-save {
    margin-top: 20px;
    border-radius: 10px;
    background-color: #5D9EFE;
    float: right;
    font-weight: bold;
    color: white;
    border-color: transparent;
    width: 150px;
    height: 40px;
  }

  #btn-add {
    background-color: #5D9EFE;
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

  import {
    mapGetters
  } from "vuex";

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
            "http://127.0.0.1:8000/api/subscription", {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
              },
            }
          )
          .then(({
            data
          }) => {
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