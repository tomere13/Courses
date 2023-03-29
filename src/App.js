import './App.css'
import data from './data.json'
import ListDiv from './ListDiv'

function App() {
  console.log(data.result)
  return (
    <div>
      {data.result.map((per) => {
        return (
          <div key={per.id}>
            <ListDiv
              id={per.id}
              headline={per.headline}
              description={per.description}
              summary={per.summary}
            />
          </div>
        )
      })}
    </div>
  )
}

export default App
