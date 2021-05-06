<template>
  <div class="start">
    <h1>🎶flute salad 🥗</h1>
    <h2>Analyze your music taste and discover similar music.</h2>
    <button type="submit" class="login-btn" @click="sendRequest()">
      <img src="../assets/Spotify_Icon_RGB_White.png" />
      <p>Login with Spotify</p>
    </button>
  </div>
</template>
<script>
export default {
  name: "Start",
  components: {},
  data() {
    return {};
  },
  methods: {
    sendRequest() {
      // Get the hash of the url
      const hash = window.location.hash
        .substring(1)
        .split("&")
        .reduce(function (initial, item) {
          if (item) {
            var parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
          }
          return initial;
        }, {});
      window.location.hash = "";
      // Set token
      let _token = hash.access_token;

      const authEndpoint = "https://accounts.spotify.com/authorize";

      // Replace with your app's client ID, redirect URI and desired scopes
      const clientId = "75c9efa0c2154fea87c9a3ae844de53e";
      const redirectUri = "https://flute-salad.herokuapp.com/home";

      const scopes = [
        "user-library-read",
        "user-library-modify",
        "user-top-read",
        "user-read-recently-played",
        "playlist-read-private",
        "playlist-read-collaborative",
        "user-modify-playback-state",
        "user-follow-read",
        "playlist-modify-public",
        "playlist-modify-private",
      ];
      // If there is no token, redirect to Spotify authorization

      if (!_token) {
        window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
          "%20"
        )}&response_type=token`;
      }
    },
  },
};
</script>
<style scoped>
h1 {
  font-size: 60px;
  margin-top: 180px;
  color: #228b22;
}
h2 {
  color: grey;
}
.login-btn {
  vertical-align: middle;
  display: inline-block;
  margin-top: 50px;
  width: 220px;
  height: 80px;
  border-radius: 25px 25px 25px 25px;
  border: none;
  color: white;
  background-color: #228b22;
  font-weight: bold;
  font-size: 15px;
  text-align: center;
  padding: 5px;
}
.login-btn img {
  width: 45px;
  height: 45px;
  vertical-align: center;
  float: left;
  margin-left: 8%;
}
</style>
