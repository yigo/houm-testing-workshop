/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "@testing-library/react";
import nock from "nock";
import Test2 from "./Test2";
 
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

describe("Test2", () => {
  it("should render a list of pokemon on a successfull request", async () => {
    // prepare test
    nock("https://pokeapi.co/api/v2")
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true' 
      })  
    .get("/pokemon")
      .query({ offset: 0, limit: 10 })
      .reply(200, response);

    const { debug } =render(<Test2 />);
    // asserting for waiting state
    expect(screen.getByText("Cargando")).toBeInTheDocument();

    // asserting for end state === success
    await screen.findByText("Pokemon list");
    const elements = screen.getAllByRole("listitem");
    expect(elements).toHaveLength(response.results.length);
  });
  it("should render an error message on a failed request", async () => {
    nock("https://pokeapi.co/api/v2")
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true' 
    })  
    .get("/pokemon")
      .query({ offset: 0, limit: 10 })
      .reply(400, "service error");
  
    const { debug } =render(<Test2 />);
    // asserting for waiting state
    expect(screen.getByText("Cargando")).toBeInTheDocument();
    // asserting for end state === error
    await screen.findByText("Ups, tenemos un error");
  });
});