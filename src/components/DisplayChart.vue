<script>
import {Chart} from 'highcharts-vue'

export default {
  props: ['chartData'],
  components: {
    highcharts: Chart
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Streem'
        },
        xAxis: {
          type: 'datetime',
          title: {
            text: 'timestamp'
          }
        },
        yAxis: {
          title: {
            text: 'Count of records'
          }
        },
        plotOptions: {
          column: {
            stacking: 'normal',
            dataLabels: {
              enabled: true
            }
          }
        },
        series: this.chartData
      }
    }
  }
}
</script>

<template>
  <div class="chart">
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>