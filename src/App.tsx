import React, {useState} from "react"
function App() {
  const [result, setResult] = useState(0)
  const [valueA, setValueA] = useState(0)
  const [valueB, setValueB] = useState(0)
  
  const handleChangeValue = (value: string, setter: (x: number) => void) => {
    if (!isNaN( Number(value)) ) setter(Number(value))
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault(); 
    setResult(valueA + valueB);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" aria-label="valueA" value={valueA} onChange={(e) => handleChangeValue(e.target.value, setValueA)}/>
        <input type="text" aria-label="valueB" value={valueB} onChange={(e) => handleChangeValue(e.target.value, setValueB)}/>
        <button type="submit">click mi</button>
      </form>
      <span>Result: {result}</span>
    </>
  );
}

export default App;
