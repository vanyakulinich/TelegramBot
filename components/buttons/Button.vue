<template>
  <v-btn :color="btnColor" flat @click="clickCB">{{title}}</v-btn>
</template>

<script>
export default {
  name: "button",
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

