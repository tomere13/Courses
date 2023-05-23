import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import ListDiv from './ListDiv'
import ChapterList from './ChaptersList'
import ReactPlayer from 'react-player'
import './App.css'
import fetchData from './fetchData'
import { RiAwardLine } from 'react-icons/ri'
import blueImg from './images/blue.png'
import greenImg from './images/green.png'
import orangeImg from './images/orange.png'
import logo from './images/logo.png'

const coloring = [
  { color: 'blue', img: blueImg },
  { color: 'green', img: greenImg },
  { color: 'orange', img: orangeImg },
]

function App() {
  // Setting up the necessary state variables and useRef hook
  const [showCourse, setShowCourse] = useState(null)
  const [data, setData] = useState({})
  const [chapterData, setChapterData] = useState([])
  const [state, setState] = useState({ chapters: [] })
  const [videoUrl, setVideoUrl] = useState('ss')
  const [finishedVideos, setFinishedVideos] = useState(0)

  const playerRef = useRef(null)

  // A function to handle the end of the video
  const handleVideoProgress = (e) => {
    const index = state.findIndex(
      (chapter) => chapter?.resourceId?.videoId === videoUrl
    )

    var check = JSON.parse(localStorage.getItem('watchedChapters')) || []

    const currentTime = playerRef.current.getCurrentTime()
    const watchedAtLeast10Seconds = currentTime >= 10

    if (watchedAtLeast10Seconds) {
      setTimeout(() => {
        const chapterId = state[index]?.id
        if (!check.includes(chapterId + state[index]?.title)) {
          const updatedChapters = [...state]

          // setState(updatedChapters)

          const watchedChapters =
            JSON.parse(localStorage.getItem('watchedChapters')) || []

          if (!watchedChapters.includes(state[index]?.title + videoUrl)) {
            watchedChapters.push(state[index]?.title + videoUrl)
            localStorage.setItem(
              'watchedChapters',
              JSON.stringify(watchedChapters)
            )
          }
        }
      }, 10000)
    } else {
      setTimeout(() => {
        handleVideoProgress(e)
      }, 10000) // Retry after 10 seconds
    }
  }

  //loads the data
  useEffect(() => {
    fetchData(setData)

    localStorage.setItem(state[0]?.description, [])
  }, [])

  // This useEffect hook updates the video URL when the state changes
  useEffect(() => {
    localStorage.setItem(state[0]?.title, state[0]?.resourceId?.videoId) // which video to play in course

    setVideoUrl(
      localStorage.getItem(state[0]?.title) || state[0]?.resourceId?.videoId
    )
  }, [state])

  // Rendering the main div that contains the course list or the video player
  return (
    <>
      <div style={{ paddingBottom: '0px', textAlign: 'center' }}>
        <img
          src={logo}
          alt="Logo"
          onClick={() => window.location.reload()}
          style={{ height: '35%', width: '35%' }}
        />
      </div>
      {showCourse === null ? (
        <div className="startText">
          {console.log(data)}
          <h1>{data[0]?.snippet?.channelTitle + ' Crush Courses'} </h1>
          <p>Enjoy watching!</p>
        </div>
      ) : (
        ''
      )}

      <>
        {showCourse === null && chapterData !== null ? (
          <div className="outDivList">
            {Array.isArray(data) &&
              data.map((per, index) => (
                <ListDiv
                  key={index}
                  id={per?.id}
                  headline={per?.snippet?.localized?.title}
                  pic={per.snippet.thumbnails.maxres.url}
                  setShowCourse={setShowCourse}
                  setState={setState}
                  index={index}
                  img={coloring[index % 3].img}
                  color={coloring[index % 3].color}
                />
              ))}
          </div>
        ) : (
          <>
            <div className="video-container">
              <div className="player-video">
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${videoUrl}`}
                  onEnded={() => {
                    const index = state.findIndex(
                      (chapter) => chapter?.resourceId?.videoId === videoUrl
                    )

                    if (index < state.length - 1) {
                      setVideoUrl(state[index + 1]?.resourceId?.videoId)
                    }
                  }}
                  onProgress={(e) => handleVideoProgress(e)}
                  progressInterval={500}
                  controls={true}
                  ref={playerRef}
                  width="100%"
                  height="100%"
                  playing={true}
                  onReady={() => {
                    playerRef.current.seekTo(0) // Seek to the desired starting time (0 seconds)
                  }}
                />
              </div>
              <div className="chapter-list">
                <div className="header-list">
                  <h3>{state[0]?.title}</h3>
                  <div className="finished-videos">
                    <RiAwardLine /> <i data-eva="github"></i>
                    {localStorage.getItem(state[0]?.description)
                      ? localStorage.getItem(state[0]?.description).length
                      : finishedVideos}{' '}
                    / {state?.length}
                  </div>
                </div>

                <ChapterList
                  setFinishedVideos={setFinishedVideos}
                  videoUrl={videoUrl}
                  chapters={state}
                  setVideoUrl={setVideoUrl}
                  headline={state[0]?.title}
                />
              </div>
            </div>
            */
          </>
        )}
      </>
    </>
  )
}
export default App
