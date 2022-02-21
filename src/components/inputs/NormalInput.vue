<script>
// props - type: input type
// props - modelValue: default name for child input if no name is passed from parent
// props - label: label to assign input to
// props - id: should be same as parent data key, used to link label with input as well
// emits - update:modelValue: default method to update current input value
// emits - updateParent: method to pass current input id and value to parent
// computed value get and set methods to receive and pass values to current input as well as parent component
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
        // toString() to fix warning for input type number
        this.$emit('update:modelValue', value.toString())
        this.$emit('updateParent', this.id, value.toString())
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
