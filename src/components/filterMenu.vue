<template>
  <div id="filter-menu">
    <span>Max size of playlist</span>
    <form>
      <select>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="25" selected>25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </form>
    <br />
    <span>Genre</span>
    <form v-if="this.genres.length != 0">
      <select>
        <option
          v-for="(genre, index) in this.genres"
          :key="index"
          :value="genre"
        >
          {{ genre }}
        </option>
      </select>
    </form>
  </div>
</template>
<script>
import Vue from "vue";

export default {
  props: ["allTracks"],
  name: "filterMenu",
  components: {},
  created() {
    if (this.allTracks.length != 0 && this.accessToken != null) {
      this.createGenreList();
    } else {
      console.log("ooooof");
    }
  },
  data() {
    return {
      tracks: [],
      genres: [],
      offset: 0,
    };
  },
  computed: {
    chosen_artists() {
      return this.$store.getters.get_chosen_artists;
    },
    accessToken() {
      return this.$store.getters.get_access_token;
    },
  },
  methods: {
    loadMore: function() {
      this.offset += 50;
      this.displaySongs();
    },
    createGenreList: function() {
      var self = this;
      var songCount = self.allTracks.length;
      for (var i = 0; i < songCount; i++) {
        Vue.axios
          .get(
            `https://api.spotify.com/v1/artists/${self.allTracks[i].artists[0].id}`,
            {
              headers: {
                Authorization: "Bearer " + self.accessToken,
              },
            }
          )
          .then((response) => {
            self.genres = self.genres.concat(response.data.genres);
            let uniqueGenre = [...new Set(self.genres)];
            self.genres = uniqueGenre;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
<style scoped>
#filter-menu {
  float: right !important;
  color: black;
}
</style>
