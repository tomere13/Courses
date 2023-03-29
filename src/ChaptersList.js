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

export default ChapterList
