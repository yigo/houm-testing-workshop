import { renderHook, waitFor } from "@testing-library/react";
import nock from "nock";
import {usePokemonList} from "./FetchingHook";


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



describe("usePokemonList hook", () => {
  it("hook should handle succesfull request", async () => {
    nock("https://pokeapi.co/api/v2")
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true' 
    })  
  .get("/pokemon")
  .query({ offset: 0, limit: 10 }).reply(200, response);
     
     const { result } = renderHook(() => usePokemonList());
     
     expect(result.current.loading).toBeTruthy();
     await waitFor(() => expect(result.current.pokemon.length).toEqual(response.results.length));
     expect(result.current.loading).toBeFalsy();
   });
 });