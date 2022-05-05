/* Challenge :
** Fech a list and render a list of pokemons using a card.
** at least 10 elements
** the component should handle success state rending the elements
** the component should handle loading state
** the component should handle error state when request fails
*/
/** 
 * loading state 
 * <span>Cargando</span> 
 *
 * success state
 * <h1>Pokemon list</h1>
 * <ul>
 *   <li >
 * </ul>
 * 
 * error state 
 * <span>Ups, tenemos un error</span>
 */



import { useEffect, useState, FC } from "react"
const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10"

const Test2Container = () => {
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
  }, [])
  return (
    <Test2Presenter loading={loading} pokemon={pokemon} error={error} />
  )
}

interface Props {
  pokemon: any;
  loading: boolean;
  error: boolean
}

export const Test2Presenter: FC<Props> = ({ loading, pokemon, error }) => {
  if (loading) return <span>Cargando</span>
  if(!loading && error) return <span>Ups, tenemos un error</span>
  return (
    <>
      <h1>Pokemon list</h1>
      <ul>
        {pokemon.map((item: any) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
    </>
  )
}

export default Test2Container;
