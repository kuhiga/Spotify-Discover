# flute-salad Spotify Discover App

<b>Project</b>: Spotify Discover 

 This is a web application that uses the Spotify API to allow users to create a savable playlist that includes brand new music based
on their favorite artists.

<b>Technology used:</b> Vue, Vuex for state management, Spotify RESTful api

<b>How it works:</b>
The app allows the user to input their favorite artist as a search string. Using the spotify api, the app looks up that artist on Spotify and displays a list of artists that contain that string. Then it finds artists that make similar music. Then the app displays a playlist with popular songs from the related artists. Users are given the option to save that playlist to their spotify account. 




![Flute Salad App Demo](flute-salad-demo.gif)


Things to work on:

- a more reactive design
- allow user to add more than one artist (up to 5)
- filter out songs that are already liked by user
- create a filter menu (number of tracks, genre, mood)
- use local storage to store all playlists created with application (maybe keep 5 most recently created)
- display previews of recently created playlists, which users can click into  -> display ->option to save
