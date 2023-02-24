// Import the necessary packages
const SpotifyWebApi = require('spotify-web-api-node');
const fs = require('fs');

// Create a new instance of the Spotify Web API with your client ID and client secret
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

// Authenticate with the Spotify API and retrieve an access token
spotifyApi.clientCredentialsGrant()
  .then(data => {
    // console.log('The access token is ' + data.body['access_token']);

    // Set the access token on the Spotify Web API object
    spotifyApi.setAccessToken(data.body['access_token']);

    // Get the playlist ID from the command line arguments
    const playlistId = process.env.PLAYLIST_ID;

    spotifyApi.getPlaylist(playlistId, { fields: 'tracks(total)' }).then((data) => {
        const totalTracks = data.body.tracks.total;

        // Print the track names by batches of 100
        for (let i = 0; i < totalTracks; i += 100) {

          spotifyApi.getPlaylistTracks(playlistId, { offset: i, limit: 100 }).then(data => {

            const dataP = JSON.parse(JSON.stringify(data.body, null, 2));

            const items = dataP.items; // get the array of items

            items.forEach(item => {
            const artist = item.track.artists[0].name;
            const trackName = item.track.name;

            console.log(`${artist} - ${trackName}`);
            });
            // console.log('Playlist data saved to playlist.json');
          })
          .catch(err => {
            console.error('Error getting playlist data:', err);
          });
        }
      });
  })
  .catch(error => {
    console.error('Error authenticating with Spotify API:', error);
  });