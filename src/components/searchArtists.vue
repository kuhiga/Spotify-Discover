<!-- This component is responsible for the searching for artist functionality -->

<template>
  <div id="search-menu">
    <input
      v-if="this.chosen_artists.length < 1"
      v-model="input_content"
      v-on:keyup="searchArtists"
      placeholder="Search by Artist"
    />
    <input v-else placeholder="Maximum amount of Artists" disabled />
    <div v-if="this.input_content != ''" class="search-suggestions">
      <ul>
        <li
          v-on:click="addArtist(name)"
          v-for="name in search_suggestions"
          :key="name.id"
        >
          <span>{{ name.name }}</span>
        </li>
      </ul>
    </div>

    <div v-if="chosen_artists.length > 0" id="current_artists">
      <ul>
        <li v-for="(artist, index) in chosen_artists" :key="index">
          {{ artist.name }}
          <span class="remove-artist" v-on:click="removeArtist(index)" style=""
            >&#10005;</span
          >
        </li>
      </ul>
    </div>
    <br />
  </div>
</template>
<script>
import Vue from "vue";
export default {
  props: [""],
  name: "searchArtists",
  components: {},
  created() {},
  computed: {
    chosen_artists() {
      return this.$store.getters.get_chosen_artists;
    },
    accessToken() {
      return this.$store.getters.get_access_token;
    },
  },
  data() {
    return {
      input_content: "",
      search_suggestions: [],
    };
  },
  methods: {
    searchArtists: function () {
      var self = this;
      if (self.input_content != "") {
        Vue.axios
          .get(
            `https://api.spotify.com/v1/search?q=${self.input_content}&type=artist`,
            {
              headers: {
                Authorization: "Bearer " + self.accessToken,
              },
            }
          )
          .then((response) => {
            self.search_suggestions = response.data.artists.items;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    addArtist: function (name) {
      var self = this;
      var found = false;
      for (var i = 0; i < self.chosen_artists.length; i++) {
        if (self.chosen_artists[i].name == name.name) {
          found = true;
          break;
        }
      }
      if (self.chosen_artists.length < 5) {
        if (!found) {
          // self.chosen_artists.push(name);
          this.$store.commit("add_artist", name);

          self.input_content = "";
        } else {
          self.input_content = "";

          console.log("no duplicates");
        }
      }
    },
    removeArtist: function (idx) {
      this.$store.commit("remove_artist", idx);
      this.$store.commit("remove_related_artists", idx);
      this.$store.commit("remove_topTracks", idx);
    },
  },
};
</script>
<style scoped>
#search-menu {
  float: left;
  width: 100%;
}
input {
  width: 100%;
  height: 30px;
  font-size: 20px;
  font-size: 20px;
  line-height: 40px;
  -ms-flex: 1;
  flex: 1;
  background: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 0 none;
  color: green;
  outline: 0 none;
  min-width: 0;
  margin: 0;
  padding: 0 10px 0 0;
  border-bottom: 2px solid green;
}
.search-suggestions {
  position: absolute;
  z-index: 2;
  width: 100%;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  transition: background-color 0.2s;
}
.search-suggestions li {
  list-style-type: none;
  width: 100%;
  height: 20px;
  text-align: left;
}
.search-suggestions li:hover {
  background-color: lightgray;
}
.search-suggestions ul {
  float: left;
  width: 100%;
  height: 100px;
  overflow: hidden;
  overflow-y: scroll;
}
#current_artists li {
  list-style-type: none;
  float: left;
  margin-right: 10px;
  border: 1px green solid;
  background-color: forestgreen;
  color: white;
  padding: 5px;
}
div {
  color: black;
}
.remove-artist {
  cursor: pointer;
}
</style>
