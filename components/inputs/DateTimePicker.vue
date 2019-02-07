<template>
  <div>
    <datetime
      :type="datepickerType"
      input-class="picker"
      v-model="datetime"
      @input="changeDate"
      :min-datetime="minDate"
      :value-zone="timeZone"
      :zone="timeZone"
    />
  </div>
</template>

<script>
export default {
  name: "date_time_picker",
  props: {
    datepickerType: {
      type: String,
      default: "datetime"
    },
    minDate: {
      type: String,
      default: `${new Date().toISOString()}`
    },
    changeDate: {
      type: Function,
      default: () => {}
    },
    startDate: {
      type: String,
      default: `${new Date().toISOString()}`
    }
  },
  data() {
    return {
      datetime: this.startDate,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  }
};
</script>

<style>
.picker {
  height: 40px;
  background: rgba(126, 125, 125, 0.5);
  width: 250px;
  font-size: 20px;
  box-shadow: 0px 0px 34px 7px rgba(126, 125, 125, 0.75);
  font-size: 20px;
  cursor: pointer;
  padding-left: 15px;
}
.vdatetime-popup__header {
  display: none;
}
.vdatetime-calendar__month__day--selected > span > span,
.vdatetime-calendar__month__day--selected:hover > span > span {
  background: rgba(48, 48, 48, 0.8);
}
.vdatetime-popup {
  font-family: "Indie Flower", cursive;
}
.vdatetime-popup__actions__button {
  font-family: "Indie Flower", cursive;
  font-weight: 500;
  font-size: 25px;
  color: #444;
}
</style>


