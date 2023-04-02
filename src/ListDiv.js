import React, { useEffect, useState } from 'react'
import './list.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faVideo,
  faCheck,
  faCircleChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import fetchData from './fetchData'
import './ListDiv.css'

function ListDiv({
  id,
  headline,
  description,
  summary,
  setShowCourse,
  img,
  color,
}) {
  const [chapterData, setChapterData] = useState([])
  const [data, setData] = useState({})
  const lengthCourse = 0

  useEffect(() => {
    fetchData(setData, setChapterData)
  }, [])
  const listClassName = `listPoints${color}`

  const handleButtonClick = () => {
    setShowCourse({
      id,
      headline,
      description,
      summary,
    })
  }

  var newState = { chapters: [] }
  if (chapterData) {
    const foundChapterData = chapterData.find((obj) => obj.id === id)
    newState = foundChapterData ? foundChapterData : newState
  }

  return (
    <div className="list-div">
      <>
        <h3>
          <span className={color}>{headline + ' '}</span>
          {localStorage.getItem(`${newState.headline}1`) && (
            <FontAwesomeIcon icon={faCheck} />
          )}
        </h3>
        <div className="infoBox">
          <img className="listDiv" src={img}></img>
          <section className="rectangle">
            <FontAwesomeIcon icon={faVideo} className="faVideo" />
            <span className="videos">
              {newState.chapters ? newState.chapters.length : 0} videos
            </span>
          </section>
          <div className="description">{description}</div>
          <div className="listPointsDiv">
            <ul className={listClassName}>
              {summary.map((text, index) => (
                <li key={index}>{text}</li>
              ))}
            </ul>
            <FontAwesomeIcon
              className="nextBtn"
              icon={faCircleChevronRight}
              onClick={handleButtonClick}
            />
          </div>
        </div>
      </>
    </div>
  )
}

export default ListDiv
