import { useEffect, useState } from "react"

const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10"
 

export interface usePokemonListResponse {loading: boolean, error: boolean, pokemon: any[]}
export const usePokemonList = (): usePokemonListResponse => {
  const[pokemon, setPokemon] = useState([]);
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(false)
   
   const getPokemons = async () => {
     const response = await fetch(url)
     try {
       setError(false)
       const data = await response.json()
       setPokemon(data.results)
       setLoading(false)
     } catch (err) {
       setLoading(false)
       setError(true)
     }
   }
 
   useEffect(() => {  
       getPokemons();    
   }, []);
   return { loading, error, pokemon };
}