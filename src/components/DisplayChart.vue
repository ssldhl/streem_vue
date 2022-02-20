<script>
import {Chart} from 'highcharts-vue'

export default {
  props: ['chartOptions'],
  components: {
    highcharts: Chart
  }
}
</script>

<template>
  <div class="chart">
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>