import React, { useState, memo, useEffect } from 'react'
import { RiCheckLine } from 'react-icons/ri'
import { AiOutlinePlayCircle } from 'react-icons/ai'
import parseISO8601Duration from './parseISO8601Duration'

function ChapterList({
  chapters,
  setVideoUrl,
  headline,
  videoUrl,
  setFinishedVideos,
}) {
  const [selectedChapter, setSelectedChapter] = useState(null)

  // This is a function that handles the click event when a chapter is clicked
  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter)
    localStorage.setItem(chapter?.title, chapter?.resourceId?.videoId)
    // This sets the 'videoUrl' using the URL from the clicked chapter's resource
    setVideoUrl(chapter?.resourceId?.videoId)
  }

  // This retrieves watched chapters from local storage, or returns an empty array
  const watchedChapters =
    JSON.parse(localStorage.getItem('watchedChapters')) || []

  useEffect(() => {
    let count = 0 // Initialize count variable
    localStorage.setItem(chapters[0]?.title, videoUrl) // which video to play in course

    Array.isArray(chapters) &&
      chapters.forEach((chapter) => {
        if (
          watchedChapters.includes(
            chapter?.title + chapter?.resourceId?.videoId
          )
        ) {
          count++
        }
      })

    setFinishedVideos(count) // Update the value of finishedVideos
  }, [chapters, watchedChapters])

  return (
    <>
      <div className="chapter-box">
        {Array.isArray(chapters) &&
          chapters.map((chapter, index) => {
            let durationString
            try {
              const durationInSeconds = parseISO8601Duration(chapter?.duration)
              const minutes = Math.floor(durationInSeconds / 60)
              const seconds = Math.round(durationInSeconds % 60)
              durationString = `${minutes}:${seconds
                .toString()
                .padStart(2, '0')}`
            } catch (error) {
              durationString = 'N/A'
            }

            return (
              <div
                onClick={() => handleChapterClick(chapter)}
                key={index}
                className={`line ${
                  selectedChapter === chapter ? 'selected' : ''
                }`}>
                <div>
                  <span
                    className="check-icon"
                    style={{ position: 'relative', marginRight: '8px' }}>
                    {watchedChapters.includes(
                      chapter?.title + chapter?.resourceId?.videoId
                    ) ? (
                      <RiCheckLine
                        style={{ fontSize: '18px', color: 'green' }}
                      />
                    ) : (
                      <AiOutlinePlayCircle style={{ fontSize: '18px' }} />
                    )}
                  </span>
                  <span className="hover-txt">
                    {index + 1}. {chapter.title}
                  </span>
                </div>
                <span>{durationString}</span>
              </div>
            )
          })}
      </div>
    </>
  )
}

export default memo(ChapterList)
