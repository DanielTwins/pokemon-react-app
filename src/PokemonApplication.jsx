import React, { useState, useEffect } from "react";
import Pokemon from "./Pokemon"; // component to display the Pokemon details


function PokemonApplication() {
  const [pokemonList, setPokemonList] = useState([]); // state to hold the list of pokemon
  const [selectedPokemon, setSelectedPokemon] = useState(null); // state to hold the selected pokemon object
  const [pokemonData, setPokemonData] = useState(null); // state to hold detailed data for the selected pokemon

  // fetch the list of Pokemon when the component mounts
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then((data) => {
        console.log("data response results:", data.results);
        setPokemonList(data.results); // store pokemon list in state
      })
      .catch((error) => console.error("Error fetching Pokemon lists: ", error));
  }, []); // empty array, runs only once, when the component is mounted

  // this can be used without the button with the trigger onClick
  /* useEffect(() => {
    // check first if there is a selected option
    if (selectedPokemon) {
      fetch(selectedPokemon.url) // url is as an object property
        .then((response) => response.json())
        .then((data) => setPokemonData(data))
        .catch((error) =>
          console.error("Error fetching Pokemon data: ", error)
        );
    }
  }, [selectedPokemon]); // as a dependency - runs only when selectedPokemon changes 
  */

  // fetch datailed data for the selected pokemon option
  const fetchPokemonData = () => {
    // check first if there is no selectedPokemon, then just return
    if (!selectedPokemon) {
      console.log("No Pokemon selected");
      return;
    }

    fetch(selectedPokemon.url)
      .then((response) => response.json())
      .then((data) => {
        console.log("selected pokemon data: ", data);
        setPokemonData(data);
      })
      .catch((error) => console.error("Error fetching Pokemon data: ", error));
  };

  // handle pokemon selection from the dropdown
  const handleSelectedPokemon = (e) => {
    const selectedOption = pokemonList.find(
      (pokemon) => pokemon.name === e.target.value
    );
    setSelectedPokemon(selectedOption);
  };

  return (
    <div className="container">
      <h1>Pokemon Application</h1>
      {pokemonList.length > 0 && (
        <div>
          <select
            onChange={handleSelectedPokemon}
            value={
              selectedPokemon?.name || ""
            } /* ensure placeholder (Select Pokemon) is shown by default */
          >
            <option value="" disabled>
              Select Pokemon
            </option>

            {/*  map through the pokemon list and populate the pokemons in a dropdown */}
            {pokemonList.map((pokemon, index) => (
              <option key={index} value={pokemon.name}>
                {pokemon.name}
              </option>
            ))}
          </select>
          <button onClick={fetchPokemonData}>Pokemon Details</button>
        </div>
      )}
      {/* check first if there is pokemonData, then pass it throuhg to Pokemon comp **/}
      {pokemonData && <Pokemon data={pokemonData} />}
    </div>
  );
}

export default PokemonApplication;
