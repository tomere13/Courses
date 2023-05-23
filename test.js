import React, { useEffect, useState } from 'react'

import ReactPlayer from 'react-player'

const YouTubeAPIExample = () => {
  const API_KEY = 'AIzaSyB4XKXUPP0q9f_eF0dDaLIUcjDexy5eHaE'
  const CHANNEL_ID = 'UC8S4rDRZn6Z_StJ-hh7ph8g'
  const [playlists, setPlaylists] = useState([])
  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetchPlaylists()
  }, [])

  const fetchPlaylists = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${CHANNEL_ID}&key=${API_KEY}`
      )
      const data = await response.json()
      setPlaylists(data.items)
    } catch (error) {
      console.error('Error fetching playlists:', error)
    }
  }

  const fetchPlaylistVideos = async (playlistId) => {
    try {
      const playlistVideos = []
      let nextPageToken = null
      do {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${API_KEY}&maxResults=50${
            nextPageToken ? `&pageToken=${nextPageToken}` : ''
          }`
        )
        const data = await response.json()
        playlistVideos.push(...data.items)
        nextPageToken = data.nextPageToken
      } while (nextPageToken)

      setVideos(playlistVideos)
    } catch (error) {
      console.error('Error fetching playlist videos:', error)
    }
  }

  return (
    <div>
      <h2>YouTube Playlists</h2>
      {playlists.map((playlist) => (
        <div key={playlist.id}>
          <h3>{playlist.snippet.title}</h3>
          <button onClick={() => fetchPlaylistVideos(playlist.id)}>
            Load Videos
          </button>
        </div>
      ))}

      <h2>Videos</h2>
      {videos.map((video) => (
        <div key={video.id}>
          <h3>{video.snippet.title}</h3>
          <p>{video.snippet.description}</p>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
            controls={true}
            width="100%"
            height="auto"
          />
        </div>
      ))}
    </div>
  )
}

export default YouTubeAPIExample
