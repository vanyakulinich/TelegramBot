<template>
  <div>
    <ContentHeader text="My Reminders"/>
    <div>filters by date and by expired</div>
    <v-list>
      <h3 class="header_list">
        <div class="item_date_time">
          <div>Date</div>
          <div>Time</div>
        </div>
        <div class="item_text">Reminder Text</div>
      </h3>
      <v-divider class="header_divider"></v-divider>
      <template v-for="(item, itemKey) in reminders">
        <v-list-content :key="itemKey" class="item">
          <div class="item_inner">
            <div class="item_date_time">
              <div>{{item.date}}</div>
              <div>{{item.time}}</div>
            </div>
            <div class="item_text">{{ item.text }}</div>
          </div>

          <v-divider></v-divider>
          <v-spacer></v-spacer>
        </v-list-content>
      </template>
    </v-list>
  </div>
</template>

<script scopped>
import { mapGetters } from "vuex";
import ContentHeader from "../../../../components/headers/ContentHeader.vue";
export default {
  name: "all_reminders",
  components: {
    ContentHeader
  },
  computed: {
    ...mapGetters(["reminders"])
  }
};
</script>

<style>
.header_list,
.header_list *,
.item,
.item * {
  display: flex;
}
.item {
  flex-direction: column;
}
.item_inner {
  color: rgba(255, 255, 255, 0.6);
}
.item_date_time {
  justify-content: space-around;
}
.item_text {
  padding-left: 10px;
}
v-divider {
  height: 2px;
  width: 100%;
}
.header_divider {
  margin-bottom: 20px;
  background-color: rgb(206, 208, 223);
}
</style>


