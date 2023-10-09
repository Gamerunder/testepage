import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [allPokemons, setAllPokemons] = useState([])

  useEffect(()=> {
    listAllPokemons()
  },[])

  function listAllPokemons() {
    let arrayPokemons = [], herePromises = []
    axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1281')
      .then(response=> {

        response.data.results.forEach(pokemon=> {
          herePromises.push(axios.get(pokemon.url).then(eachOne=> {
              const {base_experience,sprites} = eachOne.data
              arrayPokemons.push({...pokemon, base_experience, image:sprites.front_default})
            }))
        })

        Promise.all(herePromises)
          .then(()=>{
              arrayPokemons.sort((a,b)=>a.name>b.name ? 1: b.name>a.name ? -1:0)
              setAllPokemons(arrayPokemons)
          })
      })
  }

  return (
    <>
      <div className='containerPokemon'>
        {allPokemons.map((pokemon, index)=> (
        <div className='boxPokemon' key={index}>
          <div className="imagePokemon">
            <img src={pokemon.image} alt="" />
          </div>
          <div className="namePokemon">
            {pokemon.name}
          </div>
          <div className="expPokemon">
            {pokemon.base_experience}
          </div>
        </div>        
        )
        )}
      </div>
    </>
  )
}

export default App
