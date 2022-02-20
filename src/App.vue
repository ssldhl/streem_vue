<script>
import Form from './components/Form.vue'
import DisplayChart from './components/DisplayChart.vue'

export default {
  components: {
    Form,
    DisplayChart
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
          labels: {
            format: '{value:%Y-%b-%e}'
          },
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
            stacking: 'normal'
          }
        },
        series: []
      }
    }
  },
  methods: {
    sendRequest(query, after, before, interval) {
      const data = {query, after, before, interval}
      const url = new URL('http://localhost:4000/results')
      Object.keys(data).forEach((k) => url.searchParams.append(k, data[k]))
      fetch(url)
          .then(response => response.json())
          .then(data => {
            const result = data.result
            if(result.error){
              alert(result.error)
            }else{
              const categories = []
              const chartResponse = []
              result.aggregations.first_agg.buckets.forEach((first_bucket) => {
                const date = first_bucket.key

                first_bucket.second_agg.buckets.forEach((second_bucket) => {
                  const media = second_bucket.key
                  const count = second_bucket.doc_count

                  const media_obj = chartResponse.find((resp) => resp.name === media)
                  if(media_obj){
                    media_obj.data.push([date, count])
                  }else{
                    chartResponse.push({
                      name: media,
                      data: [[date, count]]
                    })
                  }
                })
              })

              this.chartOptions.xAxis.categories = categories
              this.chartOptions.series = chartResponse
            }
          });
    }
  }
}
</script>

<template>
  <header>
    <div class="wrapper">
      <Form @submitAPIRequest="sendRequest"/>
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
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
