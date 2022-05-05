/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import nock from "nock";
import { Context, PokemonListContext } from "./Context";
 
const response = {
  "count": 1126,
  "next": "https://pokeapi.co/api/v2/pokemon?offset=10&limit=10",
  "previous": null,
  "results": [
    {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/"
    }
  ]
}

describe("PokemonListContext", () => {
  it("should provide loading, error and pokemon list", async ()=> {

  nock("https://pokeapi.co/api/v2")
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true' 
    })  
  .get("/pokemon")
  .query({ offset: 0, limit: 10 }).reply(200, response);

  const MyComponent = () => {
    const { pokemon } = useContext(Context);
    return(
      <p>pokemon length: {pokemon.length}</p>
    )
  }
  render(
    <PokemonListContext>
      <MyComponent />
    </PokemonListContext>
  )

  await screen.findByText(`pokemon length: ${response.results.length}`);
  });
})

