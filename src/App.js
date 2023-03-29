import './App.css'
import data from './data.json'
import ListDiv from './ListDiv'
import React, { useState } from 'react'

function App() {
  const [selectedCourseId, setSelectedCourseId] = useState(null)

  const handleCourseSelect = (id) => {
    setSelectedCourseId(id)
  }

  return (
    <div>
      {data.result.map((per, index) => {
        return (
          <div key={index}>
            <ListDiv
              id={per.id}
              headline={per.headline}
              description={per.description}
              summary={per.summary}
              chapters={per.chapters}
              selectedCourseId={selectedCourseId}
              handleCourseSelect={handleCourseSelect}
            />
          </div>
        )
      })}
    </div>
  )
}

export default App
