<script>
import {Chart} from 'highcharts-vue'

export default {
  props: ['chartOptions'],
  components: {
    highcharts: Chart
  },
  data() {
    return {
      chartDataAvailable: false
    }
  }
}
</script>

<template>
  <div class="chart">
    <div v-if="this.chartOptions.series.length > 0">
      <highcharts :options="chartOptions"></highcharts>
    </div>
    <div v-else>
      <p>
        No data to display.
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>