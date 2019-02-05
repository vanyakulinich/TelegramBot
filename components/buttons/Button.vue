<template>
  <v-btn :color="btnColor" @click="clickCB">{{title}}</v-btn>
</template>

<script>
export default {
  name: "custom_button",
  props: {
    btnColor: {
      type: String,
      default: ""
    },
    clickCB: {
      type: Function,
      default: () => {}
    },
    title: {
      type: String,
      default: ""
    }
  }
};
</script>

