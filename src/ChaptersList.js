import React, { useState, memo } from 'react'
import { RiCheckLine } from 'react-icons/ri'
import { AiOutlinePlayCircle } from 'react-icons/ai'

function ChapterList({ chapters, setVideoUrl, headline }) {
  const [selectedChapter, setSelectedChapter] = useState(null)

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter)
    setVideoUrl(chapter.asset.resource.stream.url)
  }

  const watchedChapters =
    JSON.parse(localStorage.getItem('watchedChapters')) || []

  return (
    <>
      <div className="chapter-box">
        <ol
          style={{ listStyleType: 'none', position: 'relative', right: '12%' }}>
          {chapters.map((chapter, index) => (
            <section className="line">
              <li
                onClick={() => handleChapterClick(chapter)}
                key={index}
                className={selectedChapter === chapter ? 'selected' : ''}
                style={{ paddingLeft: '2rem' }}>
                <span
                  className="check-icon"
                  style={{ position: 'relative', marginRight: '8px' }}>
                  {watchedChapters.includes(chapter.id + headline) ? (
                    <RiCheckLine style={{ fontSize: '18px', color: 'green' }} />
                  ) : (
                    <AiOutlinePlayCircle style={{ fontSize: '18px' }} />
                  )}
                </span>
                <span className="hover-txt">
                  {index + 1}. {chapter.title}
                </span>
                <span
                  style={{
                    position: 'absolute',
                    left: '110%',
                  }}>
                  {`${Math.floor(
                    chapter.asset.resource.duration / 60
                  )}:${Math.round(chapter.asset.resource.duration % 60)
                    .toString()
                    .padStart(2, '0')}`}
                </span>
              </li>
            </section>
          ))}
        </ol>
      </div>
    </>
  )
}

export default memo(ChapterList)
