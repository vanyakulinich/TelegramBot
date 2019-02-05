<template>
  <div>
    <h3>{{title}}</h3>
    <v-date-picker :min="todayDate" no-title @input="changeDate" width="100%"/>
  </div>
</template>

<script>
export default {
  name: "datepicker",
  props: {
    title: {
      type: String,
      default: "Datepicker"
    },
    todayDate: {
      type: String,
      default: ""
    },
    changeDate: {
      type: Function,
      default: () => {}
    }
  }
};
</script>

