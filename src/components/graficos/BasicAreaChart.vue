<template>
<div>
    <hr />
    <div class="chart-wrapper">
        <chart :options="chartOptionsBasicArea"></chart>
    </div>
</div>
</template>

<script>
export default {
    name: 'basicAreaChart',
    data() {
    return {
      chartOptionsBasicArea: {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            areaStyle: {}
          }
        ],
        title: {
          text: "Basic Area Chart",
          x: "center",
          textStyle: {
            fontSize: 24
          }
        },
      }
    };
  }
}
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