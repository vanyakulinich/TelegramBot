<template>
  <div>
    <datetime
      :type="datepickerType"
      :input-class="disabled ? 'picker disabled' : 'picker'"
      v-model="datetime"
      @input="changeDate"
      :min-datetime="minDate"
      :value-zone="timeZone"
      :zone="timeZone"
    />
  </div>
</template>

<script>
import {
  createTodayISODate,
  getCurrentTimeZone
} from "../../utils/ISOStringsUtils";
import { Settings } from "luxon";

Settings.defaultLocale = "en";

export default {
  name: "DateTimePicker",
  props: {
    datepickerType: {
      type: String,
      default: "datetime"
    },
    minDate: {
      type: String,
      default: `${createTodayISODate()}`
    },
    changeDate: {
      type: Function,
      default: () => {}
    },
    startDate: {
      type: String,
      default: `${createTodayISODate()}`
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      datetime: this.startDate,
      timeZone: getCurrentTimeZone()
    };
  }
};
</script>

<style>
.picker {
  height: 40px;
  background: rgba(126, 125, 125, 0.5);
  width: 100%;
  font-size: 25px;
  box-shadow: 0px 0px 34px 7px rgba(126, 125, 125, 0.75);
  cursor: pointer;
  padding-left: 15px;
}
.vdatetime-popup__header {
  display: none;
}
.vdatetime-calendar__month__day--selected > span > span,
.vdatetime-calendar__month__day--selected:hover > span > span {
  background: rgba(48, 48, 48, 0.9);
}
.vdatetime-calendar__month__day {
  color: rgba(48, 48, 48, 1);
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
.disabled {
  pointer-events: none;
  box-shadow: none;
  background: none;
}
</style>


