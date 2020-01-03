<template>
  <div>
    <hr />
    <div class="chart-wrapper">
      <chart :options="chartOptionsBar"></chart>
    </div>
  </div>
</template>

<script>
export default {
  name: "barraChart",
  data() {
    return {
      chartOptionsBar: {
        xAxis: {
          data: ["Q1", "Q2", "Q3", "Q4"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            type: "bar",
            data: [63, 75, 24, 110]
          }
        ],
        title: {
          text: "Quarterly Sales Results",
          x: "center",
          textStyle: {
            fontSize: 24
          }
        },
        color: ["#127ac2"]
      }
    };
  }
};
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
  height: 500px;

  background: rgb(230, 233, 236);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

/* .echarts {
    width: 100%;
    height: 100%;
  } */
</style>