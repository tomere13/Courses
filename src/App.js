import React, { useState, useEffect, useRef } from 'react'
import data from './data.json'
import ListDiv from './ListDiv'
import chapterData from './chapterData.json'
import ChapterList from './ChaptersList'
import ReactPlayer from 'react-player'
import './App.css'

function App() {
  // Setting up the necessary state variables and useRef hook

  const [showCourse, setShowCourse] = useState(null)
  const [state, setState] = useState({ chapters: [] })
  const [videoUrl, setVideoUrl] = useState('')
  const [finishedVideos, setFinishedVideos] = useState(0)
  const playerRef = useRef(null)

  // A function to handle the end of the video

  const handleVideoProgress = () => {
    const index = state.chapters.findIndex(
      (chapter) => chapter.asset.resource.stream.url === videoUrl
    )

    if (index !== -1) {
      const currentTime = playerRef.current.getCurrentTime()
      const watchedAtLeast10Seconds = currentTime >= 10

      if (watchedAtLeast10Seconds) {
        const chapterId = state.chapters[index].id
        const chapterIsChecked = state.chapters[index].checked

        if (!chapterIsChecked) {
          setFinishedVideos((prev) => prev + 1)
        }

        const updatedChapters = [...state.chapters]
        updatedChapters[index] = {
          ...updatedChapters[index],
          checked: true,
        }
        setState({ ...state, chapters: updatedChapters })

        const watchedChapters =
          JSON.parse(localStorage.getItem('watchedChapters')) || []
        if (!watchedChapters.includes(chapterId)) {
          watchedChapters.push(chapterId)
          localStorage.setItem(
            'watchedChapters',
            JSON.stringify(watchedChapters)
          )
        }
      }
    }
  }

  // Setting up two useEffect hooks to update the state variables based on changes

  useEffect(() => {
    // This useEffect hook updates the state variables when a course is selected

    if (showCourse !== null) {
      const selectedCourse = chapterData.find((obj) => obj.id === showCourse.id)
      setState(selectedCourse)
      setFinishedVideos(0)
    }
  }, [showCourse])

  useEffect(() => {
    // This useEffect hook updates the video URL when the state changes

    if (state && state.chapters[0]?.asset?.resource?.stream?.url) {
      if (videoUrl === '') {
        setVideoUrl(state.chapters[0].asset.resource.stream.url)
      }
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
          <div className="video-container">
            <ReactPlayer
              url={videoUrl}
              onProgress={handleVideoProgress}
              controls={true}
              ref={playerRef}
              width="100%"
              height="100%"
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
