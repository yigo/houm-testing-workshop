/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import { Context, PokemonListContext } from "./Context";
import { usePokemonList, usePokemonListResponse } from "./FetchingHook";
 
// hacemos mock de FetchingHook
jest.mock("./FetchingHook", () => ({
  // convertimos usePokemonList en una funcion de jest
  usePokemonList: jest.fn()
}))

const pokemon = [
  {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/"
  },
  {
    "name": "pikachu",
    "url": "https://pokeapi.co/api/v2/pokemon/23/"
}
]

describe("PokemonListContext", () => {
  fit("should provide loading, error and pokemon list", ()=> {
    // le decimos a tupescript que typo de funcion mock es usePokemonList
    const mockusePokemonList = usePokemonList as jest.Mock<usePokemonListResponse>;
    // creamos una implementcion para usePokemonList , el mock respondera solo una vez con esta respuesta
    mockusePokemonList.mockImplementationOnce(() => ({
      loading: false,
      error: false,
      pokemon
    }))

    const MyComponent = () => {
      // cuando se ocupoe usePokemonList en el context se ocupara la implementacion de la linea anterior
      const { pokemon } = useContext(Context);
      return(
        <ul>
          {pokemon.map(({ name }) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      )
    }
    render(
      <PokemonListContext>
        <MyComponent />
      </PokemonListContext>
    )

    pokemon.map(({ name }) => expect(screen.getByText(name)).toBeInTheDocument())
    
  });
})

