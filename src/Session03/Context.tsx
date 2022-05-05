// hooks y context
import { FC, ReactNode, createContext, useContext } from "react"
import {usePokemonList, usePokemonListResponse} from "./FetchingHook";

export const Context = createContext<usePokemonListResponse>({error: false, loading: false, pokemon: []});

interface Props {
  children?: ReactNode;
}

export const PokemonListContext:FC<Props> = ({ children }) => {
  const context = usePokemonList();
  return (
    <Context.Provider value={context}>{children}</Context.Provider>
  )
};
 
const PokenonListRender:FC = () => {
  const { loading, error, pokemon } = useContext(Context);
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
)}

const Test3 = () => {
  <PokemonListContext>
    <PokenonListRender />
  </PokemonListContext>
 }
  
 export default Test3;