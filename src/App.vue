<script>
import Form from './components/Form.vue'
import DisplayChart from './components/DisplayChart.vue'
import {
  stackColumnChartOptions,
  stackColumnDataFromAggregate,
  getRequest
} from './lib/utils'

export default {
  components: {
    Form,
    DisplayChart
  },
  data() {
    return {
      disableSubmitButton: false,
      chartOptions: stackColumnChartOptions()
    }
  },
  methods: {
    sendRequest(query, after, before, interval) {
      const params = {query, after, before, interval}

      this.disableSubmitButton = true
      getRequest('results', params, (data) => {
        // response was a success, error is already handled by the getRequest function
        if(!data.error){
          const chartData = stackColumnDataFromAggregate(data.result)

          this.chartOptions.xAxis.categories = chartData.categories
          this.chartOptions.series = chartData.chartResponse
        }

        // enable the submit button once a request is complete; either success or failure
        this.disableSubmitButton = false
      })
    }
  }
}
</script>

<template>
  <header>
    <h1>Streem</h1>
    <hr>
    <div class="wrapper">
      <Form @submitAPIRequest="sendRequest" :submitButtonStatus="disableSubmitButton"/>
    </div>
  </header>

  <main>
    <DisplayChart :chartOptions="chartOptions"/>
  </main>
</template>

<style>
@import './assets/base.css';

#app {
  max-width: 100%;
  width: 100%;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
  display: flex;
  flex-direction: column;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

hr {
  width: 100%;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    place-items: center;
  }

  #app {
    display: grid;
  }

  header {
    display: flex;
    place-items: center;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    padding: 10px;

    margin-bottom: 2em;
  }

  main {
    border: 1px solid blue;
  }
}
</style>
