<script>
  import { Line } from 'vue-chartjs'
  import axios from 'axios'
   import moment from 'moment';
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
    this.$root.$refs.transactionchart = this;
  },
    mounted () {
      // this.renderChart(this.chartData, this.options)
    },
    methods: {
 
             getTransactionWeekly(bulan,storeId,tahun) {
      axios
        .get(
          "http://127.0.0.1:8000/api/trend/transaction/weekly?month= "+ bulan + " &store_id="+ storeId +"&year="+ tahun ,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        )
        .then((res) => {
          const { data } = res.data;
          // const data = res.data.data;
         
          
          this.chartData.labels = [];
          this.chartData.datasets[0].data = [];

          data.forEach(item => {
             
            this.chartData.labels.push(moment(item.waktu).format('DD/MM/YYYY'));
            this.chartData.datasets[0].data.push(item.total_transaksi);
          });
console.log(data)
          this.renderChart(this.chartData, this.options);
        })
        .catch((err) => {
          console.log(err);
        });
    },
             getTransactionMonthly(storeId,tahun,bulan) {
      axios
        .get(
          "http://127.0.0.1:8000/api/trend/transaction/monthly?store_id="+ storeId +"&year="+ tahun + "&month="+ bulan ,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        )
        .then((res) => {
          const { data } = res.data;
          // const data = res.data.data;
         
          
          this.chartData.labels = [];
          this.chartData.datasets[0].data = [];

          data.forEach(item => {
             
            this.chartData.labels.push(moment(item.waktu).format('DD/MM/YYYY'));
            this.chartData.datasets[0].data.push(item.total_transaksi);
          });
console.log(data)
          this.renderChart(this.chartData, this.options);
        })
        .catch((err) => {
          console.log(err);
        });
    },
             getTransactionDaily(storeId,tanggal) {
      axios
        .get(
          "http://127.0.0.1:8000/api/trend/transaction/daily?store_id=" + storeId+ "&tanggal="+ tanggal   ,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        )
        .then((res) => {
          const { data } = res.data;
          // const data = res.data.data;
         
          
          this.chartData.labels = [];
          this.chartData.datasets[0].data = [];

          data.forEach(item => {
             
            this.chartData.labels.push(moment(item.waktu).format('LT'));
            this.chartData.datasets[0].data.push(item.total_transaksi);
          });
console.log(data)
          this.renderChart(this.chartData, this.options);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    },
  }
</script>