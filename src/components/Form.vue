<script>
import NormalInput from "./inputs/NormalInput.vue";
import SelectInput from "./inputs/SelectInput.vue";

// props - submitButtonStatus: to enable or disable submit button, prevents multiple form submit
// data - query, dateFrom, dateTo, interval and intervalRange are used for form input
// data - selectOptions: list of select options to make it generic
// emits - submitAPIRequest: submit API request after converting the input values to required format
// methods - valueUpdate: update data value sent by child inputs matching the key as id
// methods - submitForm: method to clean up input values and trigger API method
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
      // key is sent as id to inputs
      this[key] = value
    },
    submitForm() {
      // initialize empty values
      let intervalConcat = '', fromDateMilli = '', toDateMilli = ''

      if(this.interval){
        // if it exits combine value with unit; ex: 1d
        intervalConcat = this.interval + this.intervalRange
      }

      if(this.dateFrom){
        // if the value exists convert to ms
        fromDateMilli = Date.parse(this.dateFrom) / 1000
      }

      if(this.dateTo){
        toDateMilli = Date.parse(this.dateTo) / 1000
      }

      // call the parent component API method
      this.$emit('submitAPIRequest', this.query, fromDateMilli, toDateMilli, intervalConcat)
    }
  }
}
</script>

<template>
  <form class="form" @submit.prevent="submitForm">
    <div class="inputs">
      <div class="input">
        <!-- all props required and id should match key in data-->
        <NormalInput type="text" label="Query" v-model="query" id="query" @updateParent="valueUpdate"/>
      </div>
      <div class="input center-input">
        <NormalInput type="date" label="Date From" v-model="dateFrom" id="dateFrom" @updateParent="valueUpdate"/>
        <NormalInput type="date" label="Date To" v-model="dateTo" id="dateTo" @updateParent="valueUpdate"/>
      </div>
      <div class="input">
        <NormalInput type="number" label="Interval" v-model="interval" id="interval" @updateParent="valueUpdate"/>
        <SelectInput v-model="intervalRange" id="intervalRange" @updateParent="valueUpdate"
                     :options="selectOptions"/>
      </div>
    </div>
    <div class="submit">
      <button type="submit" :disabled="submitButtonStatus">Submit</button>
    </div>
  </form>
</template>

<style scoped>
.inputs {
  display: flex;
}
.center-input {
  margin-right: 15px;
  margin-left: 15px;
}
.input select {
  margin-top: 5px;
}
.submit {
  text-align: center;
  margin-top: 15px;
}

.submit button {
  padding: 10px;
}
</style>
