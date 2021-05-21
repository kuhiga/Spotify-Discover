import Vue from "vue";
import Vuex from "vuex";
// import App from "../App.vue";
// import start from "../components/start.vue";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    chosen_artists: [], //array of chosen artists
    related_artists: [], //each element containing an array of related artists correspond to the chosen artist
    related_artists_length: 0,
    topTracks: [],
    topTracksLength: 0,
    accessToken: "",
    doPlaylist: 0,
  },
  mutations: {
    // put sychronous functions for changing state e.g. add, edit, delete
    enable_doPlaylist(state) {
      state.doPlaylist = 1;
    },
    disable_doPlaylist(state) {
      state.doPlaylist = 0;
    },
    add_artist(state, artist) {
      state.chosen_artists.push(artist);
    },
    remove_artist(state, idx) {
      // state.chosen_artists = state.chosen_artists.filter(function(obj) {
      //   return obj.id !== id;
      // });
      state.chosen_artists.splice(idx, 1);
    },
    add_related_artists(state, load) {
      var index = load[0];
      var artists = load[1];

      state.related_artists.splice(index, 1, artists);
      state.related_artists_length = state.related_artists.length;
    },
    remove_related_artists(state, idx) {
 
      state.related_artists.splice(idx, 1);
      state.related_artists_length = state.related_artists.length;
    },
    add_topTracks(state, load) {
      var index = load[0];
      var tracks = load[1];

      state.topTracks.splice(index, 1, tracks);
      state.topTracksLength = state.topTracks.length;
    },
    remove_topTracks(state, idx) {
      state.topTracks.splice(idx, 1);
      state.topTracksLength = state.topTracks.length;
    },
    assign_access_token(state, token) {
      state.accessToken = token;
    },
    reset_related_artists(state) {
      state.related_artists = [];
    },
  },
  getters: {
    get_doPlaylist: (state) => {
      return state.doPlaylist;
    },
    get_chosen_artists: (state) => {
      return state.chosen_artists;
    },
    get_chosen_artists_count: (state) => {
      return state.chosen_artists.length;
    },
    get_related_artists: (state) => {
      return state.related_artists;
    },
    get_related_artists_count: (state) => {
      return state.related_artists_length;
    },
    get_topTracks: (state) => {
      return state.topTracks;
    },
    get_topTracks_count: (state) => {
      return state.topTracksLength;
    },
    get_access_token: (state) => {
      return state.accessToken;
    },
  },
  actions: {
    // put asynchronous functions that can call one or more mutation functions
  },
  modules: {},
});
