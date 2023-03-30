import chapterData from './chapterData.json'
import React, { useState, useEffect } from 'react'
import './list.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faCamera, faCheck } from '@fortawesome/free-solid-svg-icons'

function ListDiv({ id, headline, description, summary, setShowCourse }) {
  const [state, setState] = useState({ chapters: [] })

  useEffect(() => {
    const newState = chapterData.find((obj) => obj.id === id)
    setState(newState)
  }, [])

  const handleButtonClick = () => {
    setShowCourse({
      id,
      headline,
      description,
      summary,
    })
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
              {state.chapters.length} videos
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
