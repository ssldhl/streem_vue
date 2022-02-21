<script>
import NormalInput from "./inputs/NormalInput.vue";
import SelectInput from "./inputs/SelectInput.vue";

export default {
  props: ['submitButtonStatus'],
  data() {
    return {
      query: "",
      dateFrom: "",
      dateTo: "",
      interval: "",
      intervalRange: "d",
      selectOptions: [
        {value: 'ms', label: 'milliseconds'},
        {value: 's', label: 'seconds'},
        {value: 'm', label: 'minutes'},
        {value: 'h', label: 'hours'},
        {value: 'd', label: 'days'},
        {value: 'w', label: 'week'},
        {value: 'M', label: 'month'},
        {value: 'y', label: 'year'},
      ]
    }
  },
  components: {
    NormalInput,
    SelectInput
  },
  emits: ['submitAPIRequest'],
  methods: {
    valueUpdate(key, value) {
      this[key] = value
    },
    submitForm() {
      let intervalConcat = '', fromDateMilli = '', toDateMilli = ''
      if(this.interval){
        intervalConcat = this.interval + this.intervalRange
      }
      if(this.dateFrom){
        fromDateMilli = Date.parse(this.dateFrom) / 1000
      }
      if(this.dateTo){
        toDateMilli = Date.parse(this.dateTo) / 1000
      }
      this.$emit('submitAPIRequest', this.query, fromDateMilli, toDateMilli, intervalConcat)
    }
  }
}
</script>

<template>
  <form class="form" @submit.prevent="submitForm">
    <NormalInput type="text" label="Query" v-model="query" id="query" @updateParent="valueUpdate"/>
    <div>
      <NormalInput type="date" label="Date From" v-model="dateFrom" id="dateFrom" @updateParent="valueUpdate"/>
      <NormalInput type="date" label="Date To" v-model="dateTo" id="dateTo" @updateParent="valueUpdate"/>
    </div>
    <div>
      <NormalInput type="number" label="Interval" v-model="interval" id="interval" @updateParent="valueUpdate"/>
      <SelectInput v-model="intervalRange" id="intervalRange" @updateParent="valueUpdate"
                   :options="selectOptions"/>
    </div>
    <button type="submit" :disabled="submitButtonStatus">Submit</button>
  </form>
</template>

<style>

</style>
