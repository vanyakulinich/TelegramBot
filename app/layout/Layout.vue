<template>
  <div class="root">
    <header class="header">
      <div class="header_title">
        <MenuIcon />
        <h1 class="title">Reminders Manager</h1>
      </div>

      <nav class="nav">
        <router-link :to="`/app/${token}/reminder_manager`">Reminder Manager</router-link>
        <router-link :to="`/app/${token}/personal_info`">Personal Information</router-link>
      </nav>
    </header>
    <div class="layout">
      <ReminderLogo />
      <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
      </transition>
    </div>
  </div>
  
</template>

<script>
import ReminderLogo from '../components/icons/ReminderLogo.vue';
import MenuIcon from '../components/icons/MenuIcon.vue';

export default {
  name: 'layout',
  components: {
    ReminderLogo,
    MenuIcon
  },
  computed: {
    token () {
      return this.$route.params.token
    }
  }
}
</script>


<style>
  .root{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .layout{
    position: relative;
    height: auto;
    min-height: 78vh;
    border: 1px solid black;
    width: 90%;
    background: #232526;
    background: -webkit-linear-gradient(to right, #414345, #232526);
    background: linear-gradient(to right, rgba(65, 67, 69, 0.5), rgba(35, 37, 38, 0.9));
    border-radius: 11px;
  }
  .header{
    width: 90%;
  }
  .header_title{
    display: flex;
    align-items: center;
  }
  .title{
    color: rgba(128, 0, 128, 0.945);
    font-size: 67px;
    font-weight: 900;
    margin-left: 3%;
    text-decoration: underline;
  }
  .nav{
    display: inline-block;
    font-size: 18px;
  }
</style>
