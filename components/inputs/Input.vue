<template>
  <v-text-field :disabled="disabled" :label="label" :color="color" @input="inputCB" :value="value"></v-text-field>
</template>

<script>
export default {
  name: "input",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "grey lighten-1"
    },
    inputCB: {
      type: Function,
      default: () => {}
    },
    value: {
      type: String,
      default: ""
    }
  }
};
</script>

