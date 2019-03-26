<template>
  <v-text-field 
    :disabled="disabled" 
    :label="label" 
    :color="color" 
    @input="inputCB" 
    :value="value"/>
</template>

<script>
export default {
  name: "CustomInput",
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

