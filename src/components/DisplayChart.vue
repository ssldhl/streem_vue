<script>
import {Chart} from 'highcharts-vue'

// props - chartOptions: informs highchart to show the chart in required format with supplied data
export default {
  props: ['chartOptions'],
  components: {
    highcharts: Chart
  }
}
</script>

<template>
  <div class="chart">
    <!-- Only show chart once the data is available-->
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