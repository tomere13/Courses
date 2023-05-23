import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import ChapterList from './ChaptersList'
import ReactPlayer from 'react-player'
import './App.css'
import { RiAwardLine } from 'react-icons/ri'
import logo from './images/logo.png'

function Courses() {
  // Setting up the necessary state variables and useRef hook

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

  return (
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
    </>
  )
}
export default Courses
