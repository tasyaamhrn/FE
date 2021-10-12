<template>
    <div class="container">
        <h1>TENTANG KAMI</h1>
        <p class="awal">Aplikasi Kasirin warung adalah aplikasi diperuntukan untuk kasir bagi warung atau 
            resto yang sedang membutuhkan pencatatan dalam setiap transaksi. Aplikasi di 
            kembangkan oleh Dokter Apps 
            <router-link to="`mailto:${dokterapps.mail@gmail.com}`">(dokterapps.mail@gmail.com) </router-link>
            
            
        </p>
        <p class="kebijakan">Kebijakan Privasi</p>
        <p class="akhir">Semua data pengguna hanya disimpan di penyimpanan lokal di gadget masing-masing.
            Kami tidak mengambil data apapun untuk kepentingan kami. Semua data tersimpan lokal 
            termasuk foto yang digunakan untuk produk.
        </p>
    </div>
</template>
<style scoped>
    h1{
        font-family: Arial, Helvetica, sans-serif;
        color: #4CAF50;
        font-size: 18px;
        font-weight: bold;
        padding-top: 75px;
    }
    .kebijakan{
        font-weight: bold;
    }
</style>