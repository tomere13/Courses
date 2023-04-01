const express = require('express')
const cors = require('cors')

const app = express()
const port = 3001

app.use(cors())

app.get('/api/data', async (req, res) => {
  try {
    const fetch = await import('node-fetch')
    const response = await fetch.default(
      'https://interviews.bigvu.tv/course/list',
      {
        headers: {
          Authorization:
            'Basic ' + Buffer.from('bigvu:interview').toString('base64'),
        },
      }
    )
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error fetching data')
  }
})

app.get('/api/course/:id', async (req, res) => {
  try {
    const fetch = await import('node-fetch')
    const response = await fetch.default(
      `https://interviews.bigvu.tv/course/${req.params.id}`,
      {
        headers: {
          Authorization:
            'Basic ' + Buffer.from('bigvu:interview').toString('base64'),
        },
      }
    )
    const courseData = await response.json()
    res.json(courseData)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error fetching data')
  }
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
