import fetchVideos from './fetchVideos'

import React, { useEffect, useState } from 'react'
import './list.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faVideo,
  faCircleChevronRight,
  faPlay,
} from '@fortawesome/free-solid-svg-icons'
// import fetchData from './fetchData'
import './ListDiv.css'

function ListDiv({
  id,
  headline,
  description,
  // summary,
  setShowCourse,
  setState,
  img,
  color,
}) {
  const [chapter, setChapter] = useState([])
  // const [data, setData] = useState({})

  useEffect(() => {
    // useEffect hook to fetch data when component mounts
    fetchVideos(id, setChapter)
  }, [])

  const handleButtonClick = () => {
    fetchVideos(id, setState)

    setShowCourse({
      id,
      headline,
      // description,
      // summary,
    }) // function to set state of parent component with information of clicked course
  }

  return (
    <div className="list-div">
      <>
        <h3>
          <span className={color}>{headline + ' '}</span>
          {/* {localStorage.getItem(`${headline}`) && (
            <FontAwesomeIcon icon={faCheck} />
          )} */}
        </h3>
        <section className="rectangle">
          <FontAwesomeIcon icon={faVideo} className="faVideo" />
          <span className="videos">{chapter.length} videos</span>
        </section>
        <div className="infoBox">
          {console.log(description)}
          <div className="description">Enter "{headline}" Course</div>
          <div className="listPointsDiv">
            {/* <ul className={listClassName}>
              {summary.map((text, index) => (
                <li key={index}>{text}</li>
              ))}
            </ul> */}
            <button
              className="btn"
              icon={faPlay}
              onClick={handleButtonClick}
              style={{ paddingTop: '10px' }}>
              Select
            </button>
            {/* <FontAwesomeIcon
              className="nextBtn"
              icon={faPlay}
              onClick={handleButtonClick}
              style={{ paddingTop: '10px' }}
            /> */}
          </div>
        </div>
      </>
    </div>
  )
}

export default ListDiv // export this component to be used in other files
