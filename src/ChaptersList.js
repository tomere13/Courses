import React, { useState, useEffect, useRef } from 'react'

function ChapterList({ chapters, setVideoUrl }) {
  const [selectedChapter, setSelectedChapter] = useState(null)

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter)
    setVideoUrl(chapter.asset.resource.stream.url)
  }

  return (
    <div className="chapter-list">
      <h4>Chapters</h4>
      <ul>
        {chapters.map((chapter, index) => (
          <li
            onClick={() => handleChapterClick(chapter)}
            key={index}
            className={selectedChapter === chapter ? 'selected' : ''}>
            {/* Add a checkmark icon if the chapter is checked */}
            {chapter.checked ? <span>&#10003; </span> : null}
            {chapter.title}
            {`${Math.floor(chapter.asset.resource.duration / 60)}:${Math.round(
              chapter.asset.resource.duration % 60
            )
              .toString()
              .padStart(2, '0')}`}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default ChapterList
