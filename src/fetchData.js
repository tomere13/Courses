const API_KEY = 'AIzaSyB4XKXUPP0q9f_eF0dDaLIUcjDexy5eHaE'
const CHANNEL_ID = 'UCUyDOdBWhC1MCxEjC46d-zw'

const fetchData = async (setData) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${CHANNEL_ID}&key=${API_KEY}`
    )
    const data = await response.json()
    setData(data.items)
  } catch (error) {
    console.error('Error fetching playlists:', error)
  }
}

export default fetchData
