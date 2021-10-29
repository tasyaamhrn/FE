<template>
  <div>
    <div class="sidebar open">
      <div class="logo-details">
        <img src="../../assets/logo-kasirin.png" />
        <div class="logo_name">Kasirin Toko</div>
      </div>
      <ul class="nav-list">
        <label>{{ user.name }}</label>
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="bx bx-store"></i>
            <span class="links_name" style="font-size:18px;">Pilih Store</span>
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a
              class="dropdown-item"
              href="#"
              v-for="(store, index) in user_store"
              :key="index"
              >{{ store.store.name }}</a
            >
          </div>
        </div>
        <li>
          <router-link :to="{ name: 'AddStore' }">
            <i class="bx bx-plus"></i>
            <span class="links_name">Tambah Toko</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'AddTransaksi' }">
            <i class="bx bx-plus"></i>
            <span class="links_name">Tambah Transaksi</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Home' }">
            <i class="bx bx-plus"></i>
            <span class="links_name">Beranda</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Product' }">
            <i class="bx bx-plus"></i>
            <span class="links_name">Produk</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Category' }">
            <i class="bx bx-plus"></i>
            <span class="links_name">Kategori</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Transaksi' }">
            <i class="bx bx-plus"></i>
            <span class="links_name">Transaksi</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'About' }">
            <i class="bx bx-plus"></i>
            <span class="links_name">Tentang Kami</span>
          </router-link>
        </li>

        <li>
          <a href="mailto:dokterapps.mail@gmail.com">
            <i class="bx bx-plus"></i>
            <span class="links_name">Hubungi Kami</span>
          </a>
        </li>
        <li class="out" @click="peringatan">
          <router-link to="">
            <i class="bx bx-log-out"></i>
            <span class="links_name">Keluar</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
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
      user_store: this.$store.state.auth.user.user_store,
    };
  },
  name: "Sidebar",
  methods: {
    peringatan() {
      this.$swal({
        title: "Anda yakin ingin logout?",
        showDenyButton: true,

        showCancelButton: false,
        confirmButtonText: "Ya",
        denyButtonText: `Batal`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.$store
            .dispatch("logout")
            .then((response) => {
              console.log(response);
              this.$router.push({ path: "/" });
            })
            .catch((error) => {
              this.errors = error.response.data.errors;
            });
        } else if (result.isDenied) {
          // Swal.fire('Changes are not saved', '', 'info')
        }
      });
    },
  },
};
</script>

// global
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 78px;
  background: #4caf50;

  padding: 6px 14px;
  z-index: 99;
  transition: all 0.5s ease;
}

.sidebar.open {
  width: 250px;
}

.sidebar .logo-details {
  height: 60px;
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 50px;
}

.sidebar .logo-details img {
  width: 40%;
  border-radius: 10px;
}

.sidebar .logo-details .icon {
  opacity: 0;
  transition: all 0.5s ease;
}

.sidebar .logo-details .logo_name {
  color: #fff;
  font-size: 25px;
  font-weight: 600;
  margin-left: 15px;
  opacity: 0;
  transition: all 0.5s ease;
}

.sidebar.open .logo-details .icon,
.sidebar.open .logo-details .logo_name {
  opacity: 1;
}

.sidebar .logo-details #btn {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  font-size: 22px;
  transition: all 0.4s ease;
  font-size: 23px;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s ease;
}

.sidebar.open .logo-details #btn {
  text-align: right;
}

.sidebar i {
  color: #fff;
  height: 60px;
  min-width: 50px;
  font-size: 28px;
  text-align: center;
  line-height: 60px;
}

.sidebar .nav-list {
  margin-top: 30px;
  height: 100%;
}

.sidebar .nav-list p {
  color: #fff;
}

.sidebar .transaksi a {
  background-color: #8bc34a;
}

.sidebar .transaksi a:hover {
  background-color: #8bc34a;
}

.sidebar .out a {
  background: #fd7b7b;
}

.sidebar .out a:hover {
  background: #fd7b7b;
}

.sidebar li {
  position: relative;
  margin: 12px 0;
  list-style: none;
}

.sidebar li .tooltip {
  position: absolute;
  top: -20px;
  left: calc(100% + 15px);
  z-index: 3;
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 400;
  opacity: 0;
  white-space: nowrap;
  pointer-events: none;
  transition: 0s;
}

.sidebar li:hover .tooltip {
  opacity: 1;
  pointer-events: auto;
  transition: all 0.4s ease;
  top: 50%;
  transform: translateY(-50%);
}

.sidebar.open li .tooltip {
  display: none;
}

.sidebar input {
  font-size: 15px;
  color: #fff;
  font-weight: 400;
  outline: none;
  height: 50px;
  width: 100%;
  width: 50px;
  border: none;
  border-radius: 12px;
  transition: all 0.5s ease;
  background: #1d1b31;
}

.sidebar.open input {
  padding: 0 20px 0 50px;
  width: 100%;
}

.sidebar .bx-search {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  font-size: 22px;
  background: #1d1b31;
  color: #fff;
}

.sidebar.open .bx-search:hover {
  background: #1d1b31;
  color: #fff;
}

/* .sidebar.open p{
  color:#fff;
  
} */
.sidebar .bx-search:hover {
  background: #fff;
  color: #11101d;
}

.sidebar li a {
  display: flex;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  align-items: center;
  text-decoration: none;
  transition: all 0.4s ease;
  background: #4caf50;
  padding-top: 5px;
  border: 1px solid #fff;
}

.sidebar li a:hover {
  /* background: #FFF; */
  background-color: rgba(255, 255, 255, 0.3);
  color: #fff;
}

.sidebar li a .links_name {
  color: #fff;
  font-size: 18px;
  font-weight: 400;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: 0.4s;
}
#dropdownMenuButton {
  display: flex;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  align-items: center;
  text-decoration: none;
  transition: all 0.4s ease;
  background: #4caf50;
  padding-top: 5px;
  border: 1px solid #fff;
}
#dropdownMenuButton:hover {
  color: #fff;
}
.dropdown-item {
  color: #4caf50;
}
.sidebar.open li a .links_name {
  opacity: 1;
  pointer-events: auto;
}

.sidebar li a:hover .links_name,
.sidebar li a:hover i {
  transition: all 0.5s ease;
  color: #fff;
}

.sidebar li i {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  border-radius: 12px;
}

.sidebar li.profile {
  position: fixed;
  height: 60px;
  width: 78px;
  left: 0;
  bottom: -8px;
  padding: 10px 14px;
  background: #1d1b31;
  transition: all 0.5s ease;
  overflow: hidden;
}

.sidebar.open li.profile {
  width: 250px;
}

.sidebar li .profile-details {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}

.sidebar li img {
  height: 45px;
  width: 45px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 10px;
}

.sidebar li.profile .name,
.sidebar li.profile .job {
  font-size: 15px;
  font-weight: 400;
  color: #fff;
  white-space: nowrap;
}

.sidebar li.profile .job {
  font-size: 12px;
}

.sidebar .profile #log_out {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background: #1d1b31;
  width: 100%;
  height: 60px;
  line-height: 60px;
  border-radius: 0px;
  transition: all 0.5s ease;
}

.sidebar.open .profile #log_out {
  width: 50px;
  background: none;
}

.home-section {
  position: relative;
  background: #e4e9f7;
  min-height: 100vh;
  top: 0;
  left: 78px;
  width: calc(100% - 78px);
  transition: all 0.5s ease;
  z-index: 2;
}

.sidebar.open ~ .home-section {
  left: 250px;
  width: calc(100% - 250px);
}

.home-section .text {
  display: inline-block;
  color: #11101d;
  font-size: 25px;
  font-weight: 500;
  margin: 18px;
}

@media (max-width: 420px) {
  .sidebar li .tooltip {
    display: none;
  }
}
</style>
<style scoped>
label {
  color: #fff;
  font-size: 20px;
}
</style>
