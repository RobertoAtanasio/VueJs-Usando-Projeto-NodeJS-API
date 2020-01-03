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
  name: "xbarra",
  data() {
    return {
      chartOptionsBar: {
        title: {
          text: "ECharts",
          x: "left",
          textStyle: {
            fontSize: 24
          }
        },
        tooltip: {},
        legend: {
          data: ["ABC", 'DEF']
        },
        xAxis: {
          data: ["A", "B", "C", "D", "E", "F"]
        },
        yAxis: {},
        series: [
          {
            name: "ABC",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          },
          {
            name: "DEF",
            type: "bar",
            data: [15, 25, 26, 20, 17, 18]
          }
        ]
      }
    };
  }
};
</script>

<style>
.chart-wrapper {
  width: 100%;
  height: 500px;

  background: rgb(230, 233, 236);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>