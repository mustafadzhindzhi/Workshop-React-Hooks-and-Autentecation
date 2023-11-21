import { Routes, Route } from "react-router-dom"

import Header from "./components/Header/Header.jsx"
import Home from "./components/home/Home.jsx"
import GameList from "./components/game-list/GameList.jsx"
import GameCreate from "./components/game-create/GameCreate.jsx"
import Login from "./components/login/Login.jsx"
import Register from "./components/register/Register.jsx"
import GameDetails from "./components/game-details/GameDetails.jsx"

function App() {

  return (
    <div id="box">
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/games" element={<GameList/>} />
        <Route path="/games/create" element={<GameCreate/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/games/:gameId" element={<GameDetails/>} />
      </Routes>
    </div>
  )
}

export default App
