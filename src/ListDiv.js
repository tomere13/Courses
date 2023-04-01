import React, { useEffect, useState } from 'react'
import './list.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faCamera, faCheck } from '@fortawesome/free-solid-svg-icons'
import fetchData from './fetchData'

function ListDiv({ id, headline, description, summary, setShowCourse, state }) {
  const [chapterData, setChapterData] = useState([])
  const [data, setData] = useState({})

  useEffect(() => {
    fetchData(setData, setChapterData)
  }, [])

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
        <h3>{headline}</h3>
        {localStorage.getItem(`${state.headline}1`) && (
          <FontAwesomeIcon icon={faCheck} />
        )}

        <div className="infoBox">
          <section className="rectangle">
            <p>
              <FontAwesomeIcon icon={faCamera} />
              {newState.chapters ? newState.chapters.length : 0} videos
            </p>
          </section>
          <section>
            <h4>{description}</h4>
            <ul>
              {summary.map((text, index) => (
                <li key={index}>{text}</li>
              ))}
            </ul>
            <button className="btn" onClick={handleButtonClick}>
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </section>
        </div>
      </>
    </div>
  )
}

export default ListDiv
