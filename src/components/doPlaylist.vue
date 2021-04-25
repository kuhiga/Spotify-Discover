<template>
  <div v-if="this.finalTracks.length != 0" id="track-list">
    <div v-if="this.clicked == 0">
      <button type="submit" class="load-more-btn" @click="savePlaylist()">
        <p>Save "{{ this.playlistName }}"" to Spotify</p>
      </button>
    </div>
    <div v-if="this.clicked == 1">
      <button type="submit" class="loaded-more-btn" disabled>
        <p>Playlist saved.</p>
      </button>
    </div>
    <tr>
      <th></th>
      <th></th>
      <th>TITLE</th>
      <th>ARTIST</th>
      <th>ALBUM</th>
    </tr>
    <tr class="song" v-for="(song, index) in this.finalTracks" :key="index">
      <th>
        <a
          class="play-button"
          target="_blank"
          :href="song.external_urls.spotify"
          >&#9658;</a
        >
      </th>
      <th>
        <img :src="song.album.images[2].url" width="64" height="64" />
      </th>
      <th>
        {{ song.name }}
      </th>
      <th>
        {{ song.album.artists[0].name }}
      </th>
      <th>
        {{ song.album.name }}
      </th>
    </tr>
  </div>
</template>
<script>
import Vue from "vue";

export default {
  props: [],
  name: "doPlaylist",
  components: {},
  created() {},
  data() {
    return {
      condensedTopTrack: [],
      finalTracks: [],
      finalTracksId: [],
      clicked: 0,
      playlistName: "",

      // names: [],
    };
  },
  watch: {
    doPlaylist: {
      immediate: true,
      handler() {
        if (this.doPlaylist == 1) {
          for (
            var i = this.condensedTopTrack.length;
            i < this.topTracks.length;
            i++
          ) {
            this.cutTopTracksForEachArtist(i);


          }
          this.playlistName = "Flute Salad Mix: " + this.chosen_artists[0].name;

          this.makePlaylist();
          this.$store.commit("disable_doPlaylist");
        }

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
    topTracks() {
      return this.$store.getters.get_topTracks;
    },
    topTracks_count() {
      return this.$store.getters.get_topTracks_count;
    },
    doPlaylist() {
      return this.$store.getters.get_doPlaylist;
    },
  },
  methods: {
    savePlaylist: function () {
      this.clicked = 1;
      var userId;
      Vue.axios
        .get(`https://api.spotify.com/v1/me`, {
          headers: {
            Authorization: "Bearer " + this.accessToken,
          },
        })
        .then((response) => {
          userId = response.data.id;
          const data = {
            name: this.playlistName,
            description: "Playlist created with Flute Salad.",
          };
          // set the headers
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.accessToken,
            },
          };
          Vue.axios
            .post(
              `https://api.spotify.com/v1/users/${userId}/playlists`,
              JSON.stringify(data),
              config
            )
            .then((response) => {
              var playlistId = response.data.id;
              // console.log("creating playlist", playlistId);
              // console.log("new playlist songs", this.finalTracksId);

              Vue.axios
                .post(
                  `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                  this.finalTracksId,
                  config
                )
                .then((response) => {
                  console.log("added to playlist", response);
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    makePlaylist() {
      var count = 0;
      while (count < 50) {
        for (var i = 0; i < this.condensedTopTrack.length; i++) {
          // console.log("making playlist ", this.condensedTopTrack[i]);
          if (this.condensedTopTrack[i].length != 0) {
            var songID = this.condensedTopTrack[i].shift();
            // console.log(songID);
            this.finalTracksId.push("spotify:track:" + songID);

            Vue.axios
              .get(`https://api.spotify.com/v1/tracks/${songID}`, {
                headers: {
                  Authorization: "Bearer " + this.accessToken,
                },
              })
              .then((response) => {
                // console.log("adding tracks");
                this.finalTracks.push(response.data);
              })
              .catch((error) => {
                console.log(error);
              });
            count++;
          } else if (
            this.condensedTopTrack[i].every((val, i, arr) => val === arr[0])
          ) {
            // console.log("exiting");
            count = 50;
            break;
          }
        }
      }

      // Vue.axios
      //   .get(`https://api.spotify.com/v1/tracks/${this.finalTracks}`, {
      //     headers: {
      //       Authorization: "Bearer " + this.accessToken,
      //     },
      //   })
      //   .then((response) => {
      //     console.log("adding tracks");
      //     this.names.push(response.data.name);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    },
    cutTopTracksForEachArtist(index) {

  

      this.condensedTopTrack[index] = [];
      var condition = true;
      while (this.condensedTopTrack[index].length < 50 && condition) {
        for (var i = 0; i < this.topTracks[index].length; i++) {
          if (this.condensedTopTrack[index].length > 50 || !condition) {

            break;
          } else {
            // this.condensedTopTrack[index][i] = [];
            for (var j = 0; j < 3; j++) {
              if (
                this.topTracks[index][i].length == 0 ||
                this.condensedTopTrack[index].length > 50
              ) {
                condition = false;
                break;
              } else {
                this.condensedTopTrack[index].push(
                  this.topTracks[index][i].shift()
                );
              }
            }
          }
        }
      }


    },
  },
};
</script>
<style scoped>
h1 {
  color: black;
}
div {
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
img {
  vertical-align: middle;
}
.loaded-more-btn,
.load-more-btn {
  vertical-align: top;
  float: right;
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
  border: 1px solid #228b22;
  color: white;
  background-color: #228b22 !important;
  font-size: 15px;
  border-radius: 20px;
}
.load-more-btn:hover {
  background-color: #228c39 !important;
  transform: scale(1.05);
}
.loaded-more-btn {
  border: 1px solid #256132 !important;

  background-color: #256132 !important;
}
.load-more-btn:hover {
  background-color: #228c39 !important;
}
</style>
