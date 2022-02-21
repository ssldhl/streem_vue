<script>
export default {
  props: {
    type: String,
    modelValue: String,
    label: {
      type: String,
      required: true
    },
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
  <div class="input-group">
    <label :for="id">{{ label }}</label>
    <input
        :id="id"
        :type="type"
        v-model="value"
    />
  </div>
</template>

<style scoped>
.input-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}
input {
  padding: 5px;
}
</style>
