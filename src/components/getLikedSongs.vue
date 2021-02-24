<template>
  <div id="track-list">
    <h1></h1>
    <div id="filter" v-if="this.tracks.length != 0">
      <filterMenu :allTracks="this.tracks" />
    </div>
    <tr>
      <th></th>
      <th>TITLE</th>
      <th>ARTIST</th>
      <th>ALBUM</th>
    </tr>
    <tr class="song" v-for="(song, index) in this.tracks" :key="index">
      <a target="_blank" :href="song.external_urls.spotify"
        ><td class="play-button">&#9658;</td></a
      >

      <td>
        {{ song.name }}
      </td>
      <td>
        {{ song.album.name }}
      </td>
      <td>
        {{ song.artists[0].name }}
      </td>
    </tr>
    <button type="submit" class="load-more-btn" @click="loadMore()">
      <p>Load more songs</p>
    </button>
    <br /><br /><br /><br />
  </div>
</template>
<script>
import Vue from "vue";
import filterMenu from "./filterMenu";

export default {
  props: [""],
  name: "getLikedSongs",
  components: { filterMenu },
  created() {
    if (this.accessToken != null) {
      this.displaySongs();
    } else {
      console.log(".");
    }
  },
  data() {
    return {
      tracks: [],
      offset: 0,
    };
  },
  computed: {
    accessToken() {
      return this.$store.getters.get_access_token;
    },
  },
  methods: {
 
    loadMore: function() {
      this.offset += 50;
      this.displaySongs();
    },
    displaySongs: function() {
      var self = this;

      Vue.axios
        .get(
          `https://api.spotify.com/v1/me/tracks?limit=50&offset=${self.offset}`,
          {
            headers: {
              Authorization: "Bearer " + self.accessToken,
            },
          }
        )
        .then((response) => {
          var songCount = response.data.items.length;
          for (var i = 0; i < songCount; i++) {
            self.tracks.push(response.data.items[i].track);
          }
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
