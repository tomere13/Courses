const API_KEY = 'AIzaSyB4XKXUPP0q9f_eF0dDaLIUcjDexy5eHaE'

const fetchVideos = async (playlistId, setchapterData) => {
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

      const videoIds = data.items.map((item) => item.snippet.resourceId.videoId)

      // Fetch video details to retrieve duration
      const videoDetailsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds.join(
          ','
        )}&key=${API_KEY}`
      )
      const videoDetailsData = await videoDetailsResponse.json()

      const videosWithDurations = data.items.map((item) => {
        const video = item.snippet
        const videoDetail = videoDetailsData.items.find(
          (detail) => detail.id === item.snippet.resourceId.videoId
        )
        const duration = videoDetail
          ? videoDetail.contentDetails.duration
          : null
        return { ...video, duration }
      })

      playlistVideos.push(...videosWithDurations)
      nextPageToken = data.nextPageToken
    } while (nextPageToken)

    setchapterData(playlistVideos)
  } catch (error) {
    console.error('Error fetching playlist videos:', error)
  }
}

export default fetchVideos
