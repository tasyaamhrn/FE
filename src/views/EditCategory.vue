<template>
    <div>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <label>EDIT KATEGORI</label>
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
        <input type="text" class="form-control" id="namakategori" placeholder="Masukkan Nama Kategori..">
         <router-link to="/category"><button type="button" class="btn-save">Simpan</button></router-link>
    </div>
    </div>
</template>
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
    }
    .kembali{
        text-align: right;
    }
    .judul{
        color: #4CAF50;
        font-family: sans-serif;
        font-size: 18px;
        padding-top: 10px;
        margin-bottom: 5px;
    }
.btn-save{
    margin-top: 20px;
        border-radius: 10px;
        background-color: #4CAF50;
        float: right;
        /* height: 30px; */
        color: white;
        border-color: transparent;
}
    
</style>