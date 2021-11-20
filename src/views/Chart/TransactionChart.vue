<script>
  import { Line } from 'vue-chartjs'
  import axios from 'axios'
  export default {
    extends: Line,
    data () {
      return {
        chartData: {
          labels: ["09/10/2021","10/10/2021","11/10/2021","12/10/2021","13/10/2021"],
          datasets: [
            {
              label: 'Transaction',
              data: [0,10000, 15000, 9000,12000],
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