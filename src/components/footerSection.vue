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