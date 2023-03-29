import './App.css'
import data from './data.json'
import ListDiv from './ListDiv'
import React, { useState, useEffect, useRef } from 'react'
import chapterData from './chapterData.json'
// Function to find an object by its ID in an array
function getObjectById(array, id) {
  var topo = array.find((obj) => obj.id === id)
  return topo
}

function App() {
  // State variables using useState hook
  const [showCourse, setShowCourse] = useState(null)
  const [state, setState] = useState({ chapters: [] })
  const videoRef = useRef(null)
  const [videoUrl, setVideoUrl] = useState('')

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }
  function ChapterList({ chapters }) {
    return (
      <div className="chapter-list">
        <h4>Chapters</h4>
        <ul>
          {chapters.map((chapter, index) => (
            <li
              onClick={() => setVideoUrl(chapter.asset.resource.stream.url)}
              key={index}>
              {chapter.title}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  // Effect hook to update state when showCourse changes
  useEffect(() => {
    if (showCourse !== null) {
      // Find the selected course in the chapterData array
      const selectedCourse = getObjectById(chapterData, showCourse.id)
      // Update the state with the selected course's data
      setState(selectedCourse)
    }
  }, [showCourse])

  useEffect(() => {
    if (state && state.chapters[0]?.asset?.resource?.stream?.url) {
      setVideoUrl(state.chapters[0].asset.resource.stream.url)
    }
  }, [state])

  // Function to handle clicking on the video container

  // Render the App component
  return (
    <div className="outDivList">
      {/* If no course is selected, show a list of courses */}
      {showCourse === null ? (
        <>
          {data.result.map((per, index) => (
            <div key={index}>
              <ListDiv setShowCourse={setShowCourse} index={index} {...per} />
            </div>
          ))}
        </>
      ) : (
        // If a course is selected, show the video and chapter list for that course
        <>
          <div className="video-container" onClick={handleVideoClick}>
            <video ref={videoRef} src={videoUrl} controls />
          </div>
          <div>
            <h2>{state.headline}</h2>
            <ChapterList chapters={state.chapters} />
          </div>
        </>
      )}
    </div>
  )
}

export default App
