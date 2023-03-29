import './App.css'
import data from './data.json'
import ListDiv from './ListDiv'
import React, { useState, useEffect, useRef } from 'react'
import chapterData from './chapterData.json'
import ChapterList from './ChaptersList'

function App() {
  // Setting up the necessary state variables and useRef hook
  const [showCourse, setShowCourse] = useState(null)
  const [state, setState] = useState({ chapters: [] })
  const [videoUrl, setVideoUrl] = useState('')
  const [finishedVideos, setFinishedVideos] = useState(0)
  const videoRef = useRef(null)

  // A function to find an object in an array based on its ID
  function getObjectById(array, id) {
    return array.find((obj) => obj.id === id)
  }

  // A function to handle clicking on the video
  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }

  // A function to handle the end of the video
  const handleVideoEnd = () => {
    // Find the index of the current chapter in the chapters array
    const index = state.chapters.findIndex(
      (chapter) => chapter.asset.resource.stream.url === videoUrl
    )
    if (index !== -1) {
      // Update the checked property of the current chapter to true
      const updatedChapters = [...state.chapters]
      updatedChapters[index] = { ...updatedChapters[index], checked: true }
      setState({ ...state, chapters: updatedChapters })
    }
    setFinishedVideos(finishedVideos + 1)
  }

  // Setting up two useEffect hooks to update the state variables based on changes
  useEffect(() => {
    // This useEffect hook updates the state variables when a course is selected
    if (showCourse !== null) {
      const selectedCourse = getObjectById(chapterData, showCourse.id)
      setState(selectedCourse)
      setFinishedVideos(0)
    }
  }, [showCourse])

  useEffect(() => {
    // This useEffect hook updates the video URL when the state changes
    if (state && state.chapters[0]?.asset?.resource?.stream?.url) {
      setVideoUrl(state.chapters[0].asset.resource.stream.url)
    }
  }, [state])

  // Rendering the main div that contains the course list or the video player
  return (
    <div className="outDivList">
      {showCourse === null ? (
        <>
          {data.result.map((per, index) => (
            <div key={index}>
              <ListDiv setShowCourse={setShowCourse} index={index} {...per} />
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="video-container" onClick={handleVideoClick}>
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              onEnded={handleVideoEnd}
            />
          </div>
          <div>
            <h2>{state.headline}</h2>
            <ChapterList chapters={state.chapters} setVideoUrl={setVideoUrl} />
            <p>Finished videos: {finishedVideos}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default App
