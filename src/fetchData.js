const fetchData = async (setData, setchapterData) => {
  try {
    const response = await fetch('http://localhost:3001/api/data')
    const fetchedData = await response.json()
    setData(fetchedData)
    if (!fetchedData.result) {
      throw new Error('Fetched data is missing the result array')
    }

    // Fetch course data for each course ID
    const courseDataPromises = fetchedData.result.map(async (course) => {
      const courseResponse = await fetch(
        `http://localhost:3001/api/course/${course.id}`
      )
      const courseData = await courseResponse.json()
      return courseData
    })
    const courseData = await Promise.all(courseDataPromises)
    setchapterData(courseData)
  } catch (error) {
    console.error(error)
  }
}

export default fetchData
