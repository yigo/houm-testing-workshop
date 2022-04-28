import { Suspense  } from "react"
import MyComponent from "./MyComponent"

const App = () => (
  <Suspense fallback="loading">
    <MyComponent />
  </Suspense>
);

export default App;