<script>
  import { Line } from 'vue-chartjs'
  import axios from 'axios'
  export default {
    extends: Line,
    data () {
      return {
        chartData: {
          labels: [],
          datasets: [
            {
              label: 'Transaction',
              data: [],
              fill: false,
              borderColor: '#2554FF',
              backgroundColor: '#2554FF',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    created() {
    this.$root.$refs.Transactionchart = this;
  },
    mounted () {
      this.renderChart(this.chartData, this.options)
    },
    methods: {
      getDetailTransaksi() {
                axios
                    .get(
                        "https://api-kasirin.jaggs.id/api/transaction?store_id=" +
                        localStorage.getItem("id"), {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("access_token"),
                            },
                        }
                    )
                    .then(() => {
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
    },
  }
</script>