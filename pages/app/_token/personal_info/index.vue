<template>
  <div>
    <div class="title_personal">Personal Info</div>

    <div class="names">
      <span class="field_title">name:</span>
      {{personal.firstName}} {{personal.lastName}}
    </div>
    <div v-if="personal.extra" class="extraInfo">
      <div>
        <div class="extra_item" v-for="(item, itemKey) in personal.extra" :key="item">
          <span class="field_title">{{itemKey}}:</span>
          {{item}}
        </div>
      </div>
      <PersonalInfoModal buttonText="Add more info" buttonColor="rgb(48, 48, 48)"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PersonalInfoModal from "../../../../components/modals/PersonalInfoModal.vue";
export default {
  name: "personal",
  components: {
    PersonalInfoModal
  },
  computed: {
    ...mapGetters({ personal: "personalInfo" })
  }
};
</script>

<style scoped>
.title_personal {
  font-family: "Indie Flower", cursive;
  opacity: 0.5;
  font-size: 34px;
  text-decoration: underline;
  text-align: right;
}
.names {
  font-size: 27px;
}
.field_title {
  font-size: 21px;
  opacity: 0.7;
}
.extra_item {
  width: fit-content;
  font-size: 22px;
}
.extraInfo {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.button {
  text-transform: lowercase;
  opacity: 0.5;
  font-size: 16px;
}
</style>
