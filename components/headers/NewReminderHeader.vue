<template>
  <h4>{{ title }}</h4>
</template>

<script>
export default {
  name: "NewReminderTitle",
  props: {
    title: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
h4 {
  margin: 15px 0;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.85);
}
</style>

