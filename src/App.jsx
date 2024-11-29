import React, {useState} from 'react'
import PokemonApplication from './PokemonApplication'
import './app.css';


function App() {
  const [startApp, setStartApp] = useState(false)

  return (
    <div>
      {!startApp && (
        <button onClick={() => setStartApp(true)}>
          Start Pokemon App
        </button>
      )}
      {startApp && <PokemonApplication />}
    </div>
  )
}

export default App

