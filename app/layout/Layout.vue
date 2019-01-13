<template>
  <div class="root">
    <header class="header">
      <div class="header_title">
        <MenuIcon
          v-on:click="toggleMenu"
          v-touch:tap="toggleMenu"
        />
        <h1 class="title">
          Reminders Manager
        </h1>
      </div>

      <nav 
        class="nav" 
        :style="{ height: this.isOpenMenu ? '180px' : '0px' }"
      >
        <router-link 
          :to="`/app/${token}/reminder_manager`"
        >
          Reminder Manager
        </router-link>
        <router-link 
          :to="`/app/${token}/personal_info`"
        >
          Personal Information
        </router-link>
      </nav>
    </header>
    <div class="content">
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
  data() {
    return {
      isOpenMenu: false,
    }
  },
  methods: {
    toggleMenu: function(event) {
      this.isOpenMenu = !this.isOpenMenu;
    }
  },
  computed: {
    token () {
      return this.$route.params.token;
    }
  },
  watch: {
    '$route' (to, from) {
      this.toggleMenu();
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
  .content{
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
    position: relative;
  }
  .header_title{
    display: flex;
    align-items: center;
  }
  .title{
    color: rgba(128, 0, 128, 0.945);
    font-size: 67px;
    font-weight: 900;
    margin: 0 0 0 3%;
    text-decoration: underline;
  }
  .nav{
    display: flex;
    flex-direction: column;
    transition: height 0.4s ease;
    overflow: hidden;
    font-size: 40px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 9px;
    position: absolute;
    width: 100%;
    z-index: 1;
  }
  .nav > a{
    text-decoration: none;
    color: rgba(49, 44, 44, 0.8);
    margin-left: 30px;
  }
</style>
