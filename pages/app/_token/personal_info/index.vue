<template>
  <div 
    v-if="personal" 
    @click="eraseSelected">
    <ContentHeader text="Personal Info"/>
    <div class="names">
      <span class="field_title">name:</span>
      {{ personal.firstName }} {{ personal.lastName }}
    </div>
    <Divider/>
    <div 
      v-if="personal.extra" 
      class="extraInfo">
      <div
        class="extra_item"
        v-for="(item, itemKey) in personal.extra"
        :key="item"
        @click="select(itemKey, item, $event)"
        :class="selected && selected.name === itemKey && selected.value === item ? 'active_item' : ''"
      >
        <div>
          <span class="field_title">{{ itemKey }}:</span>
          {{ item }}
        </div>
        <div
          class="edit_delete_wrap"
          v-if="selected && selected.name === itemKey && selected.value === item"
        >
          <div>
            <PersonalInfoModal 
              button-text="Edit" 
              button-color="#5d8da5" 
              :selected="selected"/>
          </div>
          <Button 
            :clickCB="deleteSelected" 
            title="'Delete'" 
            btnColor="red accent-1"/>
        </div>
      </div>
    </div>
    <div class="modal_wrap">
      <div>
        <PersonalInfoModal 
          button-text="Add more info" 
          button-color="#31343b"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PersonalInfoModal from "../../../../components/modals/PersonalInfoModal.vue";
import Button from "../../../../components/buttons/Button.vue";
import ContentHeader from "../../../../components/headers/ContentHeader.vue";
import Divider from "../../../../components/divider/Divider.vue";
export default {
  name: "Personal",
  components: {
    PersonalInfoModal,
    Button,
    ContentHeader,
    Divider
  },
  data() {
    return {
      selected: null
    };
  },
  methods: {
    select(itemKey, item, event) {
      event.stopPropagation();
      this.selected = {
        name: itemKey,
        value: item
      };
    },
    deleteSelected() {
      this.manager({
        method: "delete",
        target: "personal",
        payload: {
          [this.selected.name]: null
        }
      });
    },
    eraseSelected() {
      if (this.selected) this.selected = null;
    },
    ...mapActions(["manager"])
  },
  computed: {
    ...mapGetters({ personal: "personalInfo" })
  }
};
</script>

<style scoped>
.names {
  font-size: 27px;
  opacity: 0.5;
}
.field_title {
  font-size: 21px;
  opacity: 0.8;
}
.extra_item {
  width: fit-content;
  font-size: 22px;
  margin: 10px 0;
  cursor: pointer;
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
.modal_wrap {
  margin-top: 30px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}
.edit_delete_wrap {
  display: flex;
}
.active_item {
  text-shadow: 0px 0px 20px #d3dfff;
}
@media (max-width: 370px) {
  .names {
    font-size: 21px;
  }
  .field_title {
    font-size: 17px;
  }
  .extra_item {
    font-size: 18px;
  }
}
</style>
