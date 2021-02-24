<template>
  <div id="track-list"><br /><br /><br /><br /></div>
</template>
<script>
import Vue from "vue";

export default {
  props: [],
  name: "getPlaylist",
  components: {},
  created() {
    if (this.accessToken != null) {
      // this.displaySongs();
    } else {
      console.log("ooooof");
    }
  },
  data() {
    return {
      fileredTopTracksForRelated: [],
      offset: 0,
    };
  },
  watch: {
    chosen_artists: {
      immediate: true,
      deep: true,
      handler() {
        var self = this;
        // updates every time artist selection changes
        var x = self.related_artists.length;

        for (var i = x; i < self.chosen_artists.length; i++) {
          self.getRelatedArtists(i);
        }
      },
    },
    related_artists_length: {
      // immediate: true,
      deep: true,
      handler() {
        var self = this;

        for (var j = 0; j < self.related_artists.length; j++) {
          this.fileredTopTracksForRelated[j] = [];
          for (var k = 0; k < self.related_artists[j].length; k++) {
            this.fileredTopTracksForRelated[j][k] = [];
            self.getTopTracks(j, k);
          }
        }

        // this.$store.commit("enable_doPlaylist");
      },
    },
  },
  computed: {
    chosen_artists() {
      return this.$store.getters.get_chosen_artists;
    },
    accessToken() {
      return this.$store.getters.get_access_token;
    },
    related_artists() {
      return this.$store.getters.get_related_artists;
    },
    related_artists_length() {
      return this.$store.getters.get_related_artists_count;
    },
    topTracks() {
      return this.$store.getters.get_topTracks;
    },
  },
  methods: {
    loadMore: function () {
      this.offset += 50;
      this.displaySongs();
    },
    getTopTracks: function (j, k) {
      var self = this;
      var artistID = this.related_artists[j][k];
      Vue.axios
        .get(
          `https://api.spotify.com/v1/artists/${artistID}/top-tracks?country=US`,
          {
            headers: {
              Authorization: "Bearer " + self.accessToken,
            },
          }
        )
        .then((response) => {
          var individualTracks = [];
          for (const song in response.data.tracks) {
            individualTracks.push(response.data.tracks[song].id);
          }
          this.fileredTopTracksForRelated[j][k] = individualTracks;
          // console.log(
          //   "here it is: ",
          //   j,
          //   " : ",
          //   this.fileredTopTracksForRelated
          // );
          this.$store.commit("add_topTracks", [
            j,
            this.fileredTopTracksForRelated[j],
          ]);
          if (k == self.related_artists[j].length - 1) {
            this.$store.commit("enable_doPlaylist");
          }
        })
        .catch((error) => {
          console.log(j, ",", k, ":   ", error);
        });
    },
    getRelatedArtists: function (artistIndex) {
      var self = this;
      var artistID = self.chosen_artists[artistIndex].id;
      Vue.axios
        .get(`https://api.spotify.com/v1/artists/${artistID}/related-artists`, {
          headers: {
            Authorization: "Bearer " + self.accessToken,
          },
        })
        .then((response) => {
          var relatedArtistsArr = [];
          for (const artist in response.data.artists) {
            relatedArtistsArr.push(response.data.artists[artist].id);
          }
          this.$store.commit("add_related_artists", [
            artistIndex,
            relatedArtistsArr,
          ]);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
h1 {
  color: black;
}

tr {
  list-style-type: none;
  color: Black;
}

td {
  padding-bottom: 5px;
  text-align: left;
}
th {
  text-align: left;
}
table,
th,
td {
  border-bottom: 1px solid black;
  padding: 15px;
}

.load-more-btn {
  float: left;
  margin-top: 10px;
  margin-bottom: 20px;
  border: 1px solid #228b22;
  color: white;
  background-color: #228b22 !important;
  font-size: 15px;
  border-radius: 60px;
}
.load-more-btn:hover {
  background-color: #228c39 !important;
  transform: scale(1.05);
}
a {
  color: black;
  text-decoration: none;
  outline: 0;
}
a:visited {
  text-decoration: none;
  outline: 0;
}
.play-button:hover {
  color: #228b22;
}
/* .track-list {
  position: absolute;
  z-index: -1;
} */
</style>
