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
      seriesData: [{
        name: 'John',
        data: [5, 3, 4, 7, 2]
      }, {
        name: 'Jane',
        data: [2, 2, 3, 2, 1]
      }, {
        name: 'Joe',
        data: [3, 4, 4, 2, 5]
      }]
    }
  },
  methods: {
    sendRequest(query, dateFrom, dateTo, interval) {
      console.log(query, dateFrom, dateTo, interval)
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
    <DisplayChart :chartData="seriesData"/>
  </main>
</template>

<style>
@import './assets/base.css';

#app {
  max-width: 1280px;
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
    grid-template-columns: 1fr 1fr;
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
