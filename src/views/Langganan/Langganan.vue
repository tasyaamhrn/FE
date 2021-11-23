<template>
    <div class="container">
        <div class="store">
            <div class="row">
                <div class="col-md-8">
                    <h1>Langganan Anda</h1>
                </div>
                <div class="col-md-4">
                    <div class="add">
                        <router-link to="ListLangganan"><button type="button" id="btn-add">+ Daftar</button>
                        </router-link>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table table-bordered" v-show="!updateSubmit" :disabled="loading">
                        <thead class="tbl">
                            <tr>
                                <th>Jenis Langganan</th>
                                <th>Mulai </th>
                                <th>Berakhir </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{ user.subscription_name}}</td>
                                <td>{{ user.subscription_start_at}}</td>
                                <td>{{user.subscription_stopped_at}}</td>
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
                user_store: this.$store.state.auth.user.user_store,
            };
        },
        name: "Langganan"
    }
</script>