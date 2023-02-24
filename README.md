# Spotify Playlist Downloader

This is a tool for downloading Spotify playlist data using the Spotify API.

## Prerequisites

- Docker
- Spotify API client ID and secret
- Spotify playlist ID

## Installation

1. Clone the repository: `git clone git@github.com:chas0amx/spotify-playlist-downloader.git`
2. Navigate to the project directory: `cd spotify-playlist-downloader`
3. Create a `.env` file and add your Spotify API client ID, secret, and playlist ID in the following format:

```
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
PLAYLIST_ID=your_playlist_id
```

4. Build the Docker image: `make build`

## Usage

To download the playlist data, run the following command:

`make download`


If the playlist contains more than 100 items, the tool will download the data in batches of 100 and print each batch to the console.

## Clean up

To remove the Docker image, run the following command:

`make clean`