<template>
  <div>
    <ContentHeader text="My Reminders"/>
    <div v-if="reminders">
      <v-divider class="header_divider"></v-divider>
      <template v-for="(item, itemKey) in reminders">
        <div :key="itemKey" class="item">
          <div class="item_inner">
            <div class="item_date_time">
              <div>{{item.date}}</div>
              <div>{{item.time}}</div>
              <div class="expired" v-if="item.expired">expired</div>
            </div>
            <div class="item_text">{{ item.text }}</div>
          </div>
          <div class="icon">
            <ReminderModal :reminder="item"/>
          </div>

          <v-divider></v-divider>
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
export default {
  name: "all_reminders",
  components: {
    ContentHeader,
    ReminderModal
  },
  computed: {
    ...mapGetters(["reminders"])
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
  justify-content: space-around;
  width: 60%;
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
v-divider {
  height: 2px;
  width: 100%;
}
.header_divider {
  margin-bottom: 20px;
  background-color: rgb(206, 208, 223);
}
.expired {
  position: absolute;
  top: -6px;
  right: -44px;
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
</style>


