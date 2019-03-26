<template>
  <div>
    <ContentHeader text="My Reminders"/>
    <div v-if="reminders">
      <Divider class="header_divider"/>
      <h2 class="filters_header">Reminders Filters:</h2>
      <div class="filters">
        <div 
          v-for="(value, filter) in filters" 
          :key="filter" 
          class="filter_item">
          <v-switch
            :input-value="value"
            :label="capitalizeFilterName(filter)"
            color="rgb(93, 141, 165)"
            @change="handleLastFilter(filter)"
          />
        </div>
      </div>
      <Divider/>
      <template v-for="(item, itemKey) in reminders">
        <div 
          :key="itemKey" 
          class="item">
          <div class="item_inner">
            <div class="item_date_time">
              <div>{{ item.date }}</div>
              <div>{{ item.time }}</div>
              <div 
                class="expired" 
                v-if="item.expired">expired</div>
            </div>
            <div class="item_text">{{ item.text }}</div>
          </div>
          <div class="icon">
            <ReminderModal :reminder="item"/>
          </div>

          <Divider/>
        </div>
      </template>
    </div>
    <div v-else>No reminders</div>
  </div>
</template>

<script scopped>
import { mapGetters } from "vuex";
import ContentHeader from "../../../../components/headers/ContentHeader.vue";
import ReminderModal from "../../../../components/modals/ReminderModal.vue";
import Divider from "../../../../components/divider/Divider.vue";
export default {
  name: "AllReminders",
  components: {
    ContentHeader,
    ReminderModal,
    Divider
  },
  data() {
    return {
      filterReflections: {
        all: "today",
        today: "all"
      },
      filters: { all: true, today: false, active: false, expired: false }
    };
  },
  methods: {
    capitalizeFilterName: function(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
    handleLastFilter: function(filter) {
      this.filters[filter] = !this.filters[filter];
      const reflection = this.filterReflections[filter];
      reflection && (this.filters[reflection] = !this.filters[reflection]);
    }
  },
  computed: {
    ...mapGetters(["filterReminders"]),
    reminders() {
      return this.filterReminders({ ...this.filters });
    }
  }
};
</script>

<style>
.item,
.item * {
  display: flex;
}
.item {
  flex-direction: column;
  position: relative;
}
.item_inner {
  color: rgba(255, 255, 255, 0.6);
  justify-content: space-between;
  font-size: 20px;
  flex-direction: column;
  margin: 30px 0;
}
.item_date_time {
  justify-content: space-between;
  width: 33%;
  position: relative;
  flex-direction: row;
}
.item_date_time > div:nth-child(1) {
  font-weight: 800;
  color: rgba(255, 255, 255, 1);
}
.item_text {
  padding-left: 10px;
  word-break: break-word;
}
.header_divider {
  margin-bottom: 20px;
  background-color: rgb(206, 208, 223);
}
.expired {
  position: absolute;
  top: -6px;
  right: -88px;
  color: red;
  transform: rotateZ(-15deg);
}
.icon {
  position: absolute;
  right: 24px;
  top: 30px;
  cursor: pointer;
  border-radius: 50%;
}
.icon:active {
  text-shadow: 0px 0px 20px #d3dfff;
}
.filters_header {
  font-weight: 400;
}
.filters {
  display: flex;
  flex-wrap: wrap;
}
.filter_item {
  margin: 0 20px;
}
@media (max-width: 480px) {
  .item_date_time {
    flex-direction: column;
  }
}
</style>


