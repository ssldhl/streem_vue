<script>
import {Chart} from 'highcharts-vue'

export default {
  props: ['chartOptions'],
  components: {
    highcharts: Chart
  },
  data() {
    return {
      chartDataAvailable: this.chartOptions.series.length > 0
    }
  }
}
</script>

<template>
  <div class="chart">
    <div v-if="chartDataAvailable">
      <highcharts :options="chartOptions"></highcharts>
    </div>
    <div v-else>
      No result
    </div>
  </div>
</template>