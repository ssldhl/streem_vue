<script>
export default {
  props: {
    modelValue: String,
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
    <option value="ms">milliseconds</option>
    <option value="s">seconds</option>
    <option value="m">minutes</option>
    <option value="h">hours</option>
    <option value="d">days</option>
    <option value="w">week</option>
    <option value="M">month</option>
    <option value="y">year</option>
  </select>
</template>