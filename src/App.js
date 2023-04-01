import React, { useState, useEffect, useRef } from 'react'
import ListDiv from './ListDiv'
import ChapterList from './ChaptersList'
import ReactPlayer from 'react-player'
import './App.css'
import fetchData from './fetchData'
import { RiAwardLine } from 'react-icons/ri'
import blueImg from './images/blue.png'
import greenImg from './images/green.png'
import orangeImg from './images/orange.png'

const coloring = [
  { color: 'blue', img: blueImg },
  { color: 'green', img: greenImg },
  { color: 'orange', img: orangeImg },
]

function App() {
  // Setting up the necessary state variables and useRef hook
  const [showCourse, setShowCourse] = useState(null)
  const [data, setData] = useState({})
  const [chapterData, setchapterData] = useState([])
  const [state, setState] = useState({ chapters: [] })
  const [videoUrl, setVideoUrl] = useState('')
  const [finishedVideos, setFinishedVideos] = useState(0)
  const playerRef = useRef(null)

  // A function to handle the end of the video
  var x = localStorage.getItem(state.headline) || null
  const handleVideoProgress = (e) => {
    const index = state.chapters.findIndex(
      (chapter) => chapter.asset.resource.stream.url === videoUrl
    )

    if (parseInt(x) === state.chapters.length) {
      localStorage.setItem(state.headline + '1', 1)
    }

    localStorage.setItem(state.headline + state.chapters[index], videoUrl)
    localStorage.setItem(
      state.chapters[index].id + state.headline,
      e.playedSeconds
    )

    var check = JSON.parse(localStorage.getItem('watchedChapters')) || []

    if (index !== -1) {
      const currentTime = playerRef.current.getCurrentTime()
      const watchedAtLeast10Seconds = currentTime >= 10

      if (watchedAtLeast10Seconds) {
        const chapterId = state.chapters[index].id

        if (!check.includes(chapterId + state.headline)) {
          setFinishedVideos(parseInt(x) || finishedVideos + 1)

          if (x) {
            localStorage.setItem(state.headline, parseInt(x) + 1)
          } else {
            localStorage.setItem(state.headline, 1)
          }
        }

        const updatedChapters = [...state.chapters]
        updatedChapters[index] = {
          ...updatedChapters[index],
          checked: true,
        }

        setState({ ...state, chapters: updatedChapters })

        const watchedChapters =
          JSON.parse(localStorage.getItem('watchedChapters')) || []

        if (!watchedChapters.includes(chapterId + state.headline)) {
          watchedChapters.push(chapterId + state.headline)
          localStorage.setItem(
            'watchedChapters',
            JSON.stringify(watchedChapters)
          )
        }
      }
    }
  }

  //loads the data
  useEffect(() => {
    fetchData(setData, setchapterData)
  }, [])

  useEffect(() => {
    // Add event listener for the onpopstate event
    window.onpopstate = function (event) {
      // Check if the event's state is null
      if (event.state === null) {
        // Reload or rerender the page
        window.location.reload()
      }
    }
  }, [])

  // This useEffect hook updates the state variables when a course is selected
  useEffect(() => {
    if (showCourse !== null) {
      const selectedCourse = chapterData.find(
        (obj) => obj.id === showCourse?.id
      )
      if (selectedCourse) {
        setState(selectedCourse)
        setFinishedVideos(0)
        window.history.pushState(
          { selectedCourse },
          '',
          `#${selectedCourse.id + selectedCourse.headline}`
        )
      } else {
        setShowCourse(null)
        alert('Sorry for the inconvenience, the course is not available.')
      }
      // Update the URL with a hash to indicate that a course has been selected
    } else {
      // If no course is selected, remove the hash from the URL
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [showCourse])

  // This useEffect hook updates the video URL when the state changes
  useEffect(() => {
    if (state && state.chapters[0]?.asset?.resource?.stream?.url) {
      setVideoUrl(
        localStorage.getItem(state.headline + state.description) ||
          state.chapters[0].asset.resource.stream.url
      )
    }
  }, [state])

  // Rendering the main div that contains the course list or the video player
  return (
    <>
      {showCourse === null ? (
        <div className="startText">
          <h1>BIGVU 101 Crush Course</h1>
          <p>
            Zero editing expirence to pro - your joureny starts here
            <br></br>
            Watch step-by-step video lessons how to make videos with impact
          </p>
        </div>
      ) : (
        ''
      )}

      <>
        {showCourse === null && chapterData !== null ? (
          <div className="outDivList">
            {data?.result?.map((per, index) => (
              <ListDiv
                key={index}
                setShowCourse={setShowCourse}
                index={index}
                {...per}
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
                  url={videoUrl}
                  onEnded={() => {
                    const index = state.chapters.findIndex(
                      (chapter) =>
                        chapter.asset.resource.stream.url === videoUrl
                    )

                    if (index < state.chapters.length - 1) {
                      setVideoUrl(
                        state.chapters[index + 1].asset.resource.stream.url
                      )
                    }
                  }}
                  onDuration={() => {
                    const index = state.chapters.findIndex(
                      (chapter) =>
                        chapter.asset.resource.stream.url === videoUrl
                    )

                    if (
                      parseInt(
                        localStorage.getItem(
                          state.chapters[index].id + state.headline
                        )
                      ) +
                        1 >
                      state.chapters[index].asset.resource.duration
                    ) {
                      playerRef.current.seekTo(0)
                    } else {
                      playerRef.current.seekTo(
                        localStorage.getItem(
                          state.chapters[index].id + state.headline
                        ) || 0
                      )
                    }
                  }}
                  onProgress={(e) => handleVideoProgress(e)}
                  progressInterval={100}
                  controls={true}
                  onReady={(e) => {
                    localStorage.setItem(
                      state.headline + state.description,
                      e.props.url
                    )
                  }}
                  ref={playerRef}
                  width="100%"
                  height="100%"
                  playing={true}
                />
              </div>
              <div className="chapter-list">
                <div className="header-list">
                  <h3>{state.headline}</h3>
                  <div className="finished-videos">
                    <RiAwardLine /> <i data-eva="github"></i>
                    {localStorage.getItem(state.headline)
                      ? localStorage.getItem(state.headline)
                      : finishedVideos}{' '}
                    / {state.chapters.length}
                  </div>
                </div>

                <ChapterList
                  chapters={state.chapters}
                  setVideoUrl={setVideoUrl}
                  headline={state.headline}
                />
              </div>
            </div>
          </>
        )}
      </>
    </>
  )
}
export default App
