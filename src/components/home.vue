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
    <div id="bottom">
      <footerSection />
    </div>
  </div>
</template>
<script>
// import Vue from "vue";
import doPlaylist from "./doPlaylist";
import searchArtists from "./searchArtists";
import getPlaylist from "./getPlaylist";
import footerSection from "./footerSection";

export default {
  name: "Home",
  components: { getPlaylist, doPlaylist, searchArtists, footerSection },
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
  // mounted() {
  //   let self = this;
  //   Vue.axios
  //     .get("https://api.spotify.com/v1/me/tracks", {
  //       headers: {
  //         Authorization: "Bearer " + self.access_token,
  //       },
  //     })
  //     .then((response) => {
  //       self.responseData = response;
  //       // console.log(self.responseData.display_name);
  //       // console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // },
  methods: {
    setAccessToken: function() {
      // let self = this;
      var hash = window.location.hash.substring(1);
      var accessString = hash.indexOf("&");
      /* 13 because that bypasses 'access_token' string */
      var token = hash.substring(13, accessString);
      this.$store.commit("assign_access_token", token);
    },
    // getAllPlaylists: function () {
    //   let self = this;
    //   var playlists = [];
    //   Vue.axios
    //     .get("https://api.spotify.com/v1/me/playlists?limit=50", {
    //       headers: {
    //         Authorization: "Bearer " + self.access_token,
    //       },
    //     })
    //     .then((response) => {
    //       var playListCount = response.data.items.length;
    //       console.log("playlist count is ", playListCount);
    //       for (var i = 0; i < playListCount; i++) {
    //         playlists.push(response.data.items[i]);
    //       }

    //       self.playlists = playlists;
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
    // getAlbumArt: function () {
    //   let self = this;
    //   var trackID = self.getUserTopTrack();
    //   Vue.axios
    //     .get(
    //       "https://api.spotify.com/v1/albums?ids=" +
    //         encodeURIComponent(trackID),
    //       {
    //         headers: {
    //           Authorization: "Bearer " + self.access_token,
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       console.log(response);
    //       console.log(trackID);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
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
