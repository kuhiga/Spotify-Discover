<!-- This component is responsible for the home screen -->
<template>
  <div class="home-page">
    <div id="header">
      <h1>🎶flute salad 🥗</h1>
      <h2>Discover new songs based on your favorite artists.</h2>
    </div>
    <div id="body">
      <searchArtists /><br /><br />
      <div v-if="this.chosen_artist_count > 0" id="playlist">
        <getPlaylist />
      </div>
      <div v-if="this.topTracks_count > 0" id="playlist">
        <doPlaylist />
      </div>
    </div>

  </div>
</template>
<script>
// import Vue from "vue";
import doPlaylist from "./doPlaylist";
import searchArtists from "./searchArtists";
import getPlaylist from "./getPlaylist";

export default {
  name: "Home",
  components: { getPlaylist, doPlaylist, searchArtists },
  data() {
    return {
      responseData: null,
    };
  },

  created() {
    this.setAccessToken();
  },
  computed: {
    chosen_artist_count() {
      return this.$store.getters.get_chosen_artists_count;
    },
    related_artists_count() {
      return this.$store.getters.get_chosen_artists_count;
    },
    topTracks_count() {
      return this.$store.getters.get_topTracks_count;
    },
  },
  
  methods: {
    setAccessToken: function () {
      var hash = window.location.hash.substring(1);
      var accessString = hash.indexOf("&");
      /* 13 because that bypasses 'access_token' string */
      var token = hash.substring(13, accessString);
      this.$store.commit("assign_access_token", token);
    },
   
  },
};
</script>
<style scoped>
h1 {
  color: black;
  text-align: left;
  font-size: 50px;
}
span {
  color: black;
}
h2 {
  text-align: left;
  color: black;
  font-size: 40px;
}
h3 {
  color: black;
}
#body {
  position: relative;
  z-index: 1;
}
.home-page {
  margin: 25px;
}
</style>
