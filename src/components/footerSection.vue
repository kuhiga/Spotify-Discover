<template>
  <div id="footerSection">
    <hr />
    <a target="_blank" href="https://www.kurthiga.com">©2020 Kurt Higa</a>
  </div>
</template>
<script>
export default {
  props: [""],
  name: "footerSection",
  components: {},
  created() {},
  data() {
    return {};
  },
};
</script>
<style scoped>
#footerSection {
  color: Black;
  text-align: left;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px; /* Height of the footer */
}
hr {
  width: 100%;
  border-bottom: 2.5px solid #228b22;
}
a {
  text-decoration: none;
  color: black;
}
</style>