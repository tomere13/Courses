import React, { useState, memo } from 'react'

function ChapterList({ chapters, setVideoUrl, headline }) {
  const [selectedChapter, setSelectedChapter] = useState(null)

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter)
    setVideoUrl(chapter.asset.resource.stream.url)
  }
  var locals = JSON.parse(localStorage.getItem('watchedChapters')) || []
  return (
    <div className="chapter-list">
      <h4>Chapters</h4>
      <ol>
        {chapters.map((chapter, index) => (
          <li
            onClick={() => handleChapterClick(chapter)}
            key={index}
            className={selectedChapter === chapter ? 'selected' : ''}>
            {/* Add a checkmark icon if the chapter is checked */}
            {locals.includes(chapter.id + headline) ? (
              <span>&#10003; </span>
            ) : null}
            {chapter.title}
            {`${Math.floor(chapter.asset.resource.duration / 60)}:${Math.round(
              chapter.asset.resource.duration % 60
            )
              .toString()
              .padStart(2, '0')}`}
          </li>
        ))}
      </ol>
    </div>
  )
}
export default memo(ChapterList)
