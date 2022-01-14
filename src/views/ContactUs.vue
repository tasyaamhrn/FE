<template>

    <div class="faq_area section_padding_130" id="faq">
        <div class="container">

            <div class="row justify-content-center">

                <div class="col-12 col-sm-8 col-lg-6">
                    <!-- Section Heading-->
                    <div class="section_heading text-center wow fadeInUp" data-wow-delay="0.2s"
                        style="visibility: visible; animation-delay: 0.2s; animation-name: fadeInUp;">
                        <h3><span>Contact Us </span></h3>
                        <div class="line"></div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center">
                <!-- FAQ Area-->
                <div class="col-12 col-sm-10 col-lg-8">
                    <div class="accordion faq-accordian" id="faqAccordion">

                        <div class="card border-0 wow fadeInUp" data-wow-delay="0.2s"
                            style="visibility: visible; animation-delay: 0.2s; animation-name: fadeInUp;"
                            v-for="item in contact" :key="item.id">
                            <div class="card-header" id="headingOne">
                                <div class="container">
                                    <div class="col-md-2">
                                        <img :src="item.image_url" alt="">
                                    </div>
                                    <div class="col-md-10">
                                        <h5 class="mb-0 collapsed" data-toggle="collapse" data-target="#collapseOne"
                                            aria-expanded="true" aria-controls="collapseOne">{{item.name}}<span
                                                class="lni-chevron-up"></span></h5>
                                    </div>
                                </div>
                            </div>
                            <div class="collapse" id="collapseOne" aria-labelledby="headingOne"
                                data-parent="#faqAccordion">
                                <div class="card-body">
                                    <!-- <router-link :to="item.content">
                                        <i class="fas fa-phone-square-alt"></i>
                                        <span class="links_name">Hubungi Kami</span>
                                    </router-link> -->
                                    <a :href="item.content" target="_blank" rel="noopener noreferrer">Hubungi Kami</a>
                                    <!-- <p>Klik disini {{item.content}} </p> -->

                                    <!-- <router-link :to="item.content" target="_blank">
                                        <p>Klik disini </p>
                                    </router-link> -->



                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Support Button-->
                    <!-- <div class="support-button text-center d-flex align-items-center justify-content-center mt-4 wow fadeInUp" data-wow-delay="0.5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInUp;">
                    <i class="lni-emoji-sad"></i>
                    <p class="mb-0 px-2">Can't find your answers?</p>
                    <a href="#" id="contact"> Contact us</a>
                </div> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    export default {
        data() {
            return {
                // form: {
                //   questions: "",
                //   answer: "",
                // },
                contact: [{
                    id: "",
                    image: "",
                    content: "",
                }]
            };
        },
        mounted() {
            this.getContact();
        },
        methods: {
            getContact() {
                axios
                    .get(
                        "http://127.0.0.1:8000/api/contact", {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("access_token"),
                            },
                        }
                    )
                    .then((res) => {

                        this.contact = res.data.data;
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            //   save() {
            //     axios
            //       .post(
            //         "https://api-kasirin.jaggs.id/api/faq/store", {
            //           questions: this.form.questions,
            //           answer: this.form.answer,
            //         }, {
            //           headers: {
            //             Authorization: "Bearer " + localStorage.access_token,
            //           },
            //         }
            //       )
            //       .then((res) => {
            //         console.log(res);
            //         this.$router.push({
            //           name: "FAQ",
            //         });

            //       })
            //       .catch((err) => {
            //         console.log(err);
            //         alert("saving error");
            //       });
            //   },
        },
    };
</script>
<style scoped>
    #faq {
        background-size: cover;
    }

    img {
        width: 50px;
        height: 50px;
    }

    body {
        margin-top: 20px;
    }

    .section_padding_130 {
        padding-top: 130px;
        padding-bottom: 300px;
    }

    .faq_area {
        position: relative;
        z-index: 1;
        background-color: #f5f5ff;
        background-color: cover;
    }

    h5 {
        font-size: 14px;
    }

    h3 {
        margin-bottom: 40px;
        font-weight: bold;
        color: #0870CA;
    }

    .faq-accordian {
        position: relative;
        z-index: 1;
    }

    .faq-accordian .card {
        position: relative;
        z-index: 1;
        margin-bottom: 1.5rem;
    }

    .faq-accordian .card:last-child {
        margin-bottom: 0;
    }

    #contact {
        color: #0870CA;
    }

    .faq-accordian .card .card-header {
        background-color: #F5F5FF;
        padding: 0;
        border-bottom-color: #ebebeb;
    }

    .faq-accordian .card .card-header h5 {
        cursor: pointer;
        padding: 1.75rem 2rem;
        color: #5D9EFE;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -ms-grid-row-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
    }

    .faq-accordian .card .card-header h6 span {
        font-size: 1.5rem;
    }

    .faq-accordian .card .card-header h6.collapsed {
        color: #070a57;
    }

    .faq-accordian .card .card-header h6.collapsed span {
        -webkit-transform: rotate(-180deg);
        transform: rotate(-180deg);
    }

    .faq-accordian .card .card-body {
        padding: 1.75rem 2rem;
    }

    .faq-accordian .card .card-body p:last-child {
        margin-bottom: 0;
    }

    .add {
        margin-left: 50%;

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

    @media only screen and (max-width: 575px) {
        .support-button p {
            font-size: 14px;
        }
    }

    .support-button i {
        color: #3f43fd;
        font-size: 1.25rem;
    }

    @media only screen and (max-width: 575px) {
        .support-button i {
            font-size: 1rem;
        }
    }

    .support-button a {
        text-transform: capitalize;
        color: #2ecc71;
    }

    @media only screen and (max-width: 575px) {
        .support-button a {
            font-size: 13px;
        }
    }
</style>