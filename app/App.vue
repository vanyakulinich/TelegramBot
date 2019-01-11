<template>
    <div id="app">
      <header class="header">
            <div class="nav-container">
                <h1 class="title">Reminders Manager</h1>
                <nav class="nav">
                  <router-link :to="`/app/${token}/reminder_manager`">Reminder Manager</router-link>
                  <router-link :to="`/app/${token}/personal_info`">Personal Information</router-link>
                </nav>
            </div>
        </header>
      
      <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
      </transition>
    </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    token () {
      return this.$route.params.token
    }
  }
}
</script>

<style>
  .header{
    background-color: #515E7E;
    padding: 1.5rem 1rem;
    text-align: center;
  }
  .nav-container{
    max-width: 1000px;
    margin: auto;
  }
  .title{
    font-size: 2rem;
    line-height: 1.5;
    font-weight: 900;
    color: #F1EDEC;
    display: inline-block;
    margin-right: 5rem;
  }
  .nav{
    display: inline-block;
  }
</style>
