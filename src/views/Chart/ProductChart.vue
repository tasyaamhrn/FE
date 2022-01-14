<script>
import { Bar } from "vue-chartjs";
import axios from "axios";
export default {
  extends: Bar,
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Product",
            borderWidth: 1,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            pointBorderColor: "#2554FF",
            data: [],
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  created() {
    this.$root.$refs.productchart = this;
  },
  mounted() {
    // this.getProduct();
  },
  methods: {
    getProductDaily(tanggal, storeId) {
      axios
        .get(
          "http://127.0.0.1:8000/api/stats/product/daily?tanggal="+ tanggal +"&store_id=" + storeId,
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
            this.chartData.labels.push(item.name);
            this.chartData.datasets[0].data.push(item.Dibeli);
          });
console.log(data)
          this.renderChart(this.chartData, this.options);
        })
        .catch((err) => {
          console.log(err);
        });
    },
     getProductWeekly(tanggal, storeId) {
      axios
        .get(
          "http://127.0.0.1:8000/api/stats/product/weekly?tanggal="+ tanggal +"&store_id=" + storeId,
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
            this.chartData.labels.push(item.name);
            this.chartData.datasets[0].data.push(item.Dibeli);
          });
console.log(data)
          this.renderChart(this.chartData, this.options);
        })
        .catch((err) => {
          console.log(err);
        });
    },
     getProductMonthly(tanggal, storeId) {
      axios
        .get(
          "http://127.0.0.1:8000/api/stats/product/monthly?tanggal="+ tanggal +"&store_id=" + storeId,
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
            this.chartData.labels.push(item.name);
            this.chartData.datasets[0].data.push(item.Dibeli);
          });
console.log(data)
          this.renderChart(this.chartData, this.options);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  }
};
</script>