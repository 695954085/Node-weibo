<template>
  <div id="app">
    <transition name="fadein" mode='out-in'>
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.fadein-enter-active, .fadein-leave-active {
  transition: opacity .5s;
}
.fadein-enter, .fadein-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
