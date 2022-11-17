
import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login";
import MoviesPage from "./pages/movies";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
      <Route path="/" element={ <LoginPage/> } />
      <Route path="login" element={ <LoginPage/> } />
      <Route path="movies" element={ <MoviesPage/> } />
    </Routes>
  </div>
  </BrowserRouter>
  );
}

const Notfound = () => {
  return (
    <div>Route not found</div>
  )
}

export default App;
