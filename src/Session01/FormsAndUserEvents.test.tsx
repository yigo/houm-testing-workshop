/* eslint-disable testing-library/no-debugging-utils */
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./FormsAndUserEvents";

test("Should show sum of  two values", () => {
  // prepare las variables del test o el escenario
  const valueA = 2;
  const valueB = 3;
  const expected = 5;
  // ejecutar el componente
  const { debug } = render(<App />);
  // encontrar los input en el codigo 
  const inputA = screen.getByLabelText("valueA");
  const inputB = screen.getByLabelText("valueB");


  // simular escribir valores en los inputs
  fireEvent.change(inputA, { target: { value: valueA }})
  fireEvent.change(inputB, { target: { value: valueB }})

  //console.log(debug());

  // encontrar el buton calcular 
  const button = screen.getByText("click mi");

  // presioanr el boton 
  fireEvent.click(button);  
  //console.log(debug());
  // hacer las aseveraciones
  // buscar resultado esperado en el componente  
  expect(screen.getByText(`Result: ${expected}`)).toBeInTheDocument()
});

test("Should not input value A when user types a NaN value", () => {
  // prepare las variables del test o el escenario
  const valueA = "a";
  
  // ejecutar el componente
  const { debug } = render(<App />);
  // encontrar los input en el codigo 
  const inputA = screen.getByLabelText("valueA");

  // simular escribir valores en los inputs
  fireEvent.change(inputA, { target: { value: valueA }})

  //console.log(debug());
  // hacer las aseveracione∂s
  // buscar resultado esperado en el componente  
  expect(screen.queryByDisplayValue("a")).not.toBeInTheDocument();
  //expect(inputA).toHaveAttribute("value", expectedValue);
});

test("Should not input value B when user types a NaN value", () => {
  // prepare las variables del test o el escenario
  const valueB = "b";
  
  // ejecutar el componente
  const { debug } = render(<App />);
  // encontrar los input en el codigo 
  const inputB = screen.getByLabelText("valueB");

  // simular escribir valores en los inputs
  fireEvent.change(inputB, { target: { value: valueB }})

  //console.log(debug());
  // hacer las aseveracione∂s
  // buscar resultado esperado en el componente  
  expect(screen.queryByDisplayValue("b")).not.toBeInTheDocument();
  //expect(inputA).toHaveAttribute("value", expectedValue);
});