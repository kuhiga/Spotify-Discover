<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-top: 60px;
}
html {
  height: 100%;
}
body {
  height: 100%;
  margin: 0;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
html,
body {
  margin: 0;
  height: 100%;
  overflow: scroll;
}
body {
  background-repeat: no-repeat !important;
  background: floralwhite;
}
</style>
