import chapterData from './chapterData.json'
import React, { useState, useEffect, useRef } from 'react'
import './list.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

function getObjectById(array, id) {
  var topo = array.find((obj) => obj.id === id)
  return topo
}

function ChapterList({ chapters }) {
  return (
    <div className="chapter-list">
      <h4>Chapters</h4>
      <ul>
        {chapters.map((chapter, index) => (
          <li key={index}>{chapter.title}</li>
        ))}
      </ul>
    </div>
  )
}

function ListDiv({ id, headline, description, summary }) {
  const [state, setState] = useState({ chapters: [] })
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    var newState = getObjectById(chapterData, id)
    setState(newState)
  }, [])

  const handleButtonClick = () => {
    setPlaying(!playing)
  }

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }

  const videoUrl = state.chapters[0]?.asset?.resource?.stream?.url

  return (
    <div className="list-div">
      <h3>{headline}</h3>
      <section className="rectangle">
        <p>{state.chapters.length} videos</p>
      </section>
      <section>
        <h4>{description}</h4>

        <ul>
          {summary.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
        </ul>
      </section>

      <button className="btn" onClick={handleButtonClick}>
        <FontAwesomeIcon icon={faAngleRight} />
      </button>

      {playing && (
        <div className="video-container" onClick={handleVideoClick}>
          <video ref={videoRef} src={videoUrl} controls autoPlay />
        </div>
      )}

      {!playing && <ChapterList chapters={state.chapters.slice(1)} />}
    </div>
  )
}

export default ListDiv
