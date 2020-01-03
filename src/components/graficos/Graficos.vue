<template>
  <div>
    <BarraChart />
    <BasicLineChart />
    <BasicAreaChart />
    <MixLineAndBarChart />
    <XBarra />
  </div>
</template>

<script>
import BasicAreaChart from './BasicAreaChart'
import BasicLineChart from './BasicLineChart'
import BarraChart from './BarraChart'
import MixLineAndBarChart from './MixLineAndBarChart'
import XBarra from './XBarra'

export default {
  name: "graficos",
  components: { BasicAreaChart, BasicLineChart, BarraChart, MixLineAndBarChart, XBarra },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>