<template>

    <div class="container">
        <h1>TENTANG KAMI</h1>
        <p class="awal" v-for="item in privacy" :key="item.id"> {{item.content}} </p>
        <p class="awal" v-for="item in privacy" :key="item.id"> {{item.content}} </p>


<!--         
        <p class="kebijakan">Kebijakan Privasi</p>
        <p class="akhir">Semua data pengguna hanya disimpan di penyimpanan lokal di gadget masing-masing.
            Kami tidak mengambil data apapun untuk kepentingan kami. Semua data tersimpan lokal
            termasuk foto yang digunakan untuk produk.
        </p> -->
    </div>
</template>
<script>
    import axios from "axios";
    export default {
        data() {
            return {
                privacy: [{
                    content: "",
                }]
            };
        },
        mounted() {
            this.getPrivacy();
        },
        methods: {
            getPrivacy() {
                axios
                    .get(
                        "https://api-kasirin.jaggs.id/api/privacy", {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("access_token"),
                            },
                        }
                    )
                    .then((res) => {

                        this.privacy = res.data.data;
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
        },
    };
</script>
<style scoped>
h1 {
        font-family: Arial, Helvetica, sans-serif;
        color: #5D9EFE;
        font-size: 18px;
        font-weight: bold;
        padding-top: 75px;
    }

    .kebijakan {
        font-weight: bold;
    }
</style>