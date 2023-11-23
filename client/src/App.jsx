import { Routes, Route } from "react-router-dom";

import {AuthProvider} from "./contexts/authContext.jsx";
import Path from "./paths.js";

import Header from "./components/Header/Header.jsx";
import Home from "./components/home/Home.jsx";
import GameList from "./components/game-list/GameList.jsx";
import GameCreate from "./components/game-create/GameCreate.jsx";
import Login from "./components/login/Login.jsx";
import Logout from "./components/logout/Logout.jsx";
import Register from "./components/register/Register.jsx";
import GameDetails from "./components/game-details/GameDetails.jsx";
import GameEdit from "./components/game-edit/GameEdit.jsx";

function App() {

  return (
    <AuthProvider>
      <div id="box">
        <Header />
        <Routes>
          <Route path={Path.Home} element={<Home />} />
          <Route path="/games" element={<GameList />} />
          <Route path="/games/create" element={<GameCreate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/games/:gameId" element={<GameDetails />} />
          <Route path={Path.GameEdit} element={<GameEdit />} />
          <Route path={Path.Logout} element={<Logout />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
