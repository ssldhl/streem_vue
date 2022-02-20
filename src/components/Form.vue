<script>
import TextInput from "./inputs/TextInput.vue";
import DateInput from "./inputs/DateInput.vue";
import NumberInput from "./inputs/NumberInput.vue";
import SelectInput from "./inputs/SelectInput.vue";

export default {
  data() {
    return {
      query: "",
      dateFrom: "",
      dateTo: "",
      interval: "",
      intervalRange: "d"
    }
  },
  components: {
    TextInput,
    DateInput,
    NumberInput,
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
    <TextInput label="Query" v-model="query" id="query" @updateParent="valueUpdate"/>
    <div>
      <DateInput label="Date From" v-model="dateFrom" id="dateFrom" @updateParent="valueUpdate"/>
      <DateInput label="Date To" v-model="dateTo" id="dateTo" @updateParent="valueUpdate"/>
    </div>
    <div>
      <NumberInput label="Interval" v-model="interval" id="interval" @updateParent="valueUpdate"/>
      <SelectInput v-model="intervalRange" id="intervalRange" @updateParent="valueUpdate"/>
    </div>
    <button type="submit">Submit</button>
  </form>
</template>
