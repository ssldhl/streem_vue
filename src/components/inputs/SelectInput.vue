<script>
export default {
  props: {
    modelValue: String,
    options: Object,
    id: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue', 'updateParent'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
        this.$emit('updateParent', this.id, value)
      }
    }
  }
}
</script>

<template>
  <select v-model="value">
    <!-- iterate through the options and generate option tag-->
    <option v-for="option in options" :value="option.value">
      {{option.label}}
    </option>
  </select>
</template>

<style scoped>
select {
  padding: 5px;
}
</style>