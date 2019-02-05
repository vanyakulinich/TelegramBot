<template>
  <div>
    <h3>{{title}}</h3>
    <v-time-picker width="100%" @input="changeTime" :allowed-hours="allowedHours"/>
  </div>
</template>

<script>
export default {
  name: "timepicker",
  props: {
    changeTime: {
      type: Function,
      default: () => {}
    },
    title: {
      type: String,
      default: ""
    },
    minTimeHours: {
      type: Number | Boolean,
      default: () => {}
    }
  },
  methods: {
    allowedHours(v) {
      console.log(this.minTimeHours);
      return this.minTimeHours && v >= this.minTimeHours;
    }
  }
};
</script>

